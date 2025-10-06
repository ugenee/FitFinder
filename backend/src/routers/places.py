from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
import httpx
import certifi
from core.dependencies import get_db
from db.models import Places
from core.config import settings

from schemas.places import (
    NearbyGymsRequest,
    NearbyGymsResponse,
    PlaceResponse,
    PlaceLocationResponse,
    UpdateWalkInRequest,
    PlaceInDB
)

router = APIRouter(prefix="/places", tags=["Places"])

# Selangor and KL boundaries (approximate)
SELANGOR_KL_BOUNDS = {
    "north": 3.4500,   # Northern Selangor
    "south": 2.6000,   # Southern Selangor
    "east": 102.0000,  # Eastern boundary
    "west": 101.0000   # Western boundary
}

def is_within_selangor_kl(lat: float, lng: float) -> bool:
    """Check if coordinates are within Selangor/KL region"""
    return (
        SELANGOR_KL_BOUNDS["south"] <= lat <= SELANGOR_KL_BOUNDS["north"] and
        SELANGOR_KL_BOUNDS["west"] <= lng <= SELANGOR_KL_BOUNDS["east"]
    )

async def get_place_walk_in_status(db: AsyncSession, place_id: str) -> bool:
    """Get walk-in status from database, default to True if not found"""
    result = await db.execute(
        select(Places).where(Places.places_id == place_id)
    )
    place = result.scalar_one_or_none()
    return place.walk_in if place else True

@router.post("/nearby-gyms", response_model=NearbyGymsResponse)
async def search_nearby_gyms(
    request: NearbyGymsRequest,
    db: AsyncSession = Depends(get_db)
):
    """
    Returns nearby gyms in Selangor/KL using Google Places API v1
    Filters results to only include gyms within Selangor and Kuala Lumpur
    """
    
    # Validate that search location is within Selangor/KL
    if not is_within_selangor_kl(request.latitude, request.longitude):
        raise HTTPException(
            status_code=400,
            detail="Search location must be within Selangor or Kuala Lumpur"
        )

    url = "https://places.googleapis.com/v1/places:searchNearby"

    payload = {
        "includedTypes": ["gym"],
        "maxResultCount": 20,
        "locationRestriction": {
            "circle": {
                "center": {
                    "latitude": request.latitude,
                    "longitude": request.longitude
                },
                "radius": request.radius
            }
        }
    }

    headers = {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": settings.GOOGLE_PLACES_API_KEY,
        "X-Goog-FieldMask": (
            "places.id,"
            "places.displayName,"
            "places.formattedAddress,"
            "places.location,"
            "places.rating,"
            "places.userRatingCount,"
            "places.googleMapsUri,"
            "places.websiteUri,"
            "places.photos,"
            "places.nationalPhoneNumber,"
        ),
    }

    try:
        async with httpx.AsyncClient(timeout=10, verify=certifi.where()) as client:
            response = await client.post(url, json=payload, headers=headers)
            response.raise_for_status()
    except httpx.RequestError as e:
        raise HTTPException(status_code=500, detail=f"Request error: {e}")
    except httpx.HTTPStatusError as e:
        raise HTTPException(
            status_code=e.response.status_code,
            detail=f"Google API error: {e.response.text}"
        )

    data = response.json()
    places = []

    # Filter and process results
    for place in data.get("places", []):
        location = place.get("location", {})
        lat = location.get("latitude")
        lng = location.get("longitude")
        
        # Filter: Only include gyms within Selangor/KL
        if lat and lng and is_within_selangor_kl(lat, lng):
            place_id = place.get("id")

            result = await db.execute(select(Places).where(Places.places_id == place_id))
            existing_place = result.scalar_one_or_none()

            if not existing_place:
     
                new_place = Places(
                    places_id=place_id,
                    walk_in=True  # default value
                )
                db.add(new_place)
            
            # Get walk-in status from database
            walk_in = await get_place_walk_in_status(db, place_id)
            photos = []
            for photo in place.get("photos", []):
                name = photo.get("name")  # e.g. "places/ChIJN1t_tDeuEmsRUsoyG83frY4/photos/0"
                if name:
                    photo_url = f"https://places.googleapis.com/v1/{name}/media?maxWidthPx=400&key={settings.GOOGLE_PLACES_API_KEY}"
                    photos.append(photo_url)
            
            places.append(PlaceResponse(
                id=place_id,
                displayName=place.get("displayName", {}).get("text"),
                formattedAddress=place.get("formattedAddress"),
                location=PlaceLocationResponse(latitude=lat, longitude=lng),
                rating=place.get("rating"),
                userRatingCount=place.get("userRatingCount"),
                googleMapsUri=place.get("googleMapsUri"),
                websiteUri=place.get("websiteUri"),
                nationalPhoneNumber=place.get("nationalPhoneNumber"),
                photos=photos,
                walk_in=walk_in
            ))
    await db.commit()
    return NearbyGymsResponse(places=places)


@router.get("/nearby-gyms", response_model=NearbyGymsResponse)
async def search_nearby_gyms_get(
    lat: float,
    lng: float,
    radius: int = 1500,
    db: AsyncSession = Depends(get_db)
):
    """GET version of nearby gyms search"""
    request = NearbyGymsRequest(latitude=lat, longitude=lng, radius=radius)
    return await search_nearby_gyms(request, db)


@router.patch("/gyms/{place_id}/walk-in", response_model=PlaceInDB)
async def update_gym_walk_in(
    place_id: str,
    request: UpdateWalkInRequest,
    db: AsyncSession = Depends(get_db)
):
    """
    Update walk-in availability for a specific gym
    Creates a new record if the gym doesn't exist in the database
    """
    result = await db.execute(
        select(Places).where(Places.places_id == place_id)
    )
    place = result.scalar_one_or_none()
    
    if place:
        # Update existing record
        place.walk_in = request.walk_in
    else:
        # Create new record
        place = Places(places_id=place_id, walk_in=request.walk_in)
        db.add(place)
    
    await db.commit()
    await db.refresh(place)
    
    return PlaceInDB(
        id=place.id,
        places_id=place.places_id,
        walk_in=place.walk_in
    )

