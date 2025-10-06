from pydantic import BaseModel, Field
from typing import Optional

# Request Schemas
class NearbyGymsRequest(BaseModel):
    latitude: float = Field(..., ge=-90, le=90, description="Latitude coordinate")
    longitude: float = Field(..., ge=-180, le=180, description="Longitude coordinate")
    radius: int = Field(default=1500, ge=100, le=50000, description="Search radius in meters")

class UpdateWalkInRequest(BaseModel):
    walk_in: bool = Field(..., description="Whether the gym allows walk-ins")

# Response Schemas
class PlaceLocationResponse(BaseModel):
    latitude: float
    longitude: float

class PlaceResponse(BaseModel):
    id: str = Field(..., description="Google Place ID")
    displayName: Optional[str] = None
    formattedAddress: Optional[str] = None
    location: Optional[PlaceLocationResponse] = None
    rating: Optional[float] = None
    userRatingCount: Optional[int] = None
    googleMapsUri: Optional[str] = None
    websiteUri: Optional[str] = None
    nationalPhoneNumber: Optional[str] = None
    walk_in: bool = Field(default=True, description="Walk-in availability (from database)")

class NearbyGymsResponse(BaseModel):
    places: list[PlaceResponse]

# Database Schemas
class PlaceCreate(BaseModel):
    places_id: str
    walk_in: bool = True

class PlaceUpdate(BaseModel):
    walk_in: bool

class PlaceInDB(BaseModel):
    id: int
    places_id: str
    walk_in: bool

    class Config:
        from_attributes = True