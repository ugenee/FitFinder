import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { MapPin, Phone, Star, Globe, Image as ImageIcon, ChevronLeft, ChevronRight, Edit, Check, X } from "lucide-react"
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"

interface Place {
  displayName: string
  formattedAddress: string
  rating: number
  userRatingCount: number
  googleMapsUri: string
  websiteUri?: string
  nationalPhoneNumber?: string
  photos?: string[]
  walk_in: boolean
  id?: string
}

interface NearbyGymsProps {
  places: Place[]
  isAdmin?: boolean
}

// API call to update walk-in status with debugging
const updateWalkInStatus = async (placeId: string, walkIn: boolean) => {
  console.log("Making API call to update walk-in:", { placeId, walkIn });
  
  const response = await fetch(`https://fitfinder-backend-l8ma.onrender.com/places/gyms/${placeId}/walk-in`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ walk_in: walkIn })
  });
  
  console.log("API response status:", response.status);
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error("API error:", errorText);
    throw new Error(`Failed to update walk-in status: ${response.status} ${errorText}`);
  }
  
  const result = await response.json();
  console.log("API success:", result);
  return result;
};

// Admin toggle component
const AdminWalkInToggle = ({ place, onUpdate }: { place: Place; onUpdate: (walkIn: boolean) => void }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempWalkIn, setTempWalkIn] = useState(place.walk_in);
  
  console.log("AdminWalkInToggle rendering for:", place.displayName, "isEditing:", isEditing, "places_id:", place.id);
  
  const handleSave = () => {
    console.log("Saving walk-in status:", tempWalkIn, "for:", place.displayName, "places_id:", place.id);
    onUpdate(tempWalkIn);
    setIsEditing(false);
  };
  
  const handleCancel = () => {
    console.log("Canceling edit for:", place.displayName);
    setTempWalkIn(place.walk_in);
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <div className="flex items-center justify-between">
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${
            place.walk_in
              ? "bg-green-500/20 text-green-400 border border-green-400/30"
              : "bg-red-500/20 text-red-400 border border-red-400/30"
          }`}
        >
          {place.walk_in ? "Walk-in Available" : "Walk-in Not Available"}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsEditing(true)}
          className="p-1 h-6 w-6 text-gray-400 hover:text-blue-400"
        >
          <Edit className="w-3 h-3" />
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <select
        value={tempWalkIn.toString()}
        onChange={(e) => setTempWalkIn(e.target.value === 'true')}
        className="w-full bg-black/30 border border-white/20 rounded-md px-2 py-1 text-white text-sm"
      >
        <option value="true">Walk-in Available</option>
        <option value="false">Walk-in Not Available</option>
      </select>
      <div className="flex gap-2">
        <Button
          size="sm"
          onClick={handleSave}
          className="bg-green-600 hover:bg-green-700 text-white p-1 h-6 flex-1"
        >
          <Check className="w-3 h-3" />
        </Button>
        <Button
          size="sm"
          onClick={handleCancel}
          className="bg-red-600 hover:bg-red-700 text-white p-1 h-6 flex-1"
        >
          <X className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
};

// Fallback image component
const FallbackImage = ({ gymName }: { gymName: string }) => (
  <div className="w-full h-48 bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center">
    <div className="text-center">
      <ImageIcon className="w-12 h-12 text-white/50 mx-auto mb-2" />
      <p className="text-white/70 text-sm font-medium">{gymName}</p>
      <p className="text-white/50 text-xs">No image available</p>
    </div>
  </div>
)

// Image carousel component for multiple images
const ImageCarousel = ({ images, gymName }: { images: string[], gymName: string }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [imageErrors, setImageErrors] = useState<boolean[]>(new Array(images.length).fill(false))

  const nextImage = () => {
    setCurrentImageIndex((prev) => {
      const nextIndex = (prev + 1) % images.length
      return nextIndex
    })
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => {
      const prevIndex = (prev - 1 + images.length) % images.length
      return prevIndex
    })
  }

  const handleImageError = (index: number) => {
    setImageErrors(prev => {
      const newErrors = [...prev]
      newErrors[index] = true
      return newErrors
    })
  }

  // If current image has error, try to find next available image
  if (imageErrors[currentImageIndex]) {
    const nextAvailableIndex = images.findIndex((_, index) => !imageErrors[index])
    if (nextAvailableIndex !== -1 && nextAvailableIndex !== currentImageIndex) {
      setCurrentImageIndex(nextAvailableIndex)
    }
  }

  // If all images have errors, show fallback
  if (imageErrors.every(error => error) || images.length === 0) {
    return <FallbackImage gymName={gymName} />
  }

  const currentImage = images[currentImageIndex]

  return (
    <div className="relative h-48 w-full group">
      <img
        src={currentImage}
        alt={`${gymName} - Image ${currentImageIndex + 1}`}
        className="w-full h-full object-cover"
        onError={() => handleImageError(currentImageIndex)}
      />
      
      {/* Navigation arrows - only show if multiple images */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              prevImage()
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full opacity-100 group-hover:opacity-100 transition-opacity z-10"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              nextImage()
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full opacity-100 group-hover:opacity-100 transition-opacity z-10"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </>
      )}
      
      {/* Image counter */}
      {images.length > 1 && (
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full z-10">
          {currentImageIndex + 1} / {images.length}
        </div>
      )}
      
      {/* Image navigation dots */}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setCurrentImageIndex(index)
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentImageIndex 
                  ? 'bg-white' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      )}
      
      <div className="absolute inset-0 liquid-glass-header" />
    </div>
  )
}

// Fallback components for different fields
const PhoneFallback = () => (
  <div className="flex items-center text-gray-500">
    <Phone className="w-4 h-4 mr-1" />
    <span className="text-sm">No phone number</span>
  </div>
)

const WebsiteFallback = () => (
  <div className="flex items-center text-gray-500">
    <Globe className="w-4 h-4 mr-1" />
    <span className="text-sm">No website</span>
  </div>
)

const RatingFallback = () => (
  <div className="flex items-center text-gray-500">
    <Star className="w-4 h-4 mr-1" />
    <span className="text-sm">No ratings yet</span>
  </div>
)

export default function NearbyGyms({ places, isAdmin = false }: NearbyGymsProps) {
  const queryClient = useQueryClient();
  const updateMutation = useMutation({
    mutationFn: ({ placeId, walkIn }: { placeId: string; walkIn: boolean }) => 
      updateWalkInStatus(placeId, walkIn),
    onSuccess: (data) => {
      console.log("Mutation successful:", data);
      // Invalidate and refetch gyms data
      queryClient.invalidateQueries({ queryKey: ['nearbyGyms'] });
    },
    onError: (error) => {
      console.error("Mutation error:", error);
      alert('Failed to update walk-in status: ' + error.message);
    },
    onMutate: (variables) => {
      console.log("Mutation started:", variables);
    }
  });

  const handleWalkInUpdate = (placeId: string, walkIn: boolean) => {
    console.log("handleWalkInUpdate called:", { 
      placeId, 
      walkIn, 
      hasPlacesId: !!placeId,
      allPlaces: places.map(p => ({ name: p.displayName, id: p.id }))
    });
    
    // Make sure we have a valid placeId
    if (!placeId) {
      console.error("No placeId provided");
      alert("Cannot update: Missing gym identifier");
      return;
    }
    
    updateMutation.mutate({ placeId, walkIn });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
      {places.map((place, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card
            className="relative rounded-2xl overflow-hidden 
                       backdrop-blur-lg bg-black/25
                       border border-white/10 shadow-lg shadow-black/40
                       hover:shadow-xl hover:shadow-black/60 transition-all duration-300"
          >
            {/* Image section with fallback and carousel */}
            {place.photos && place.photos.length > 0 ? (
              <ImageCarousel images={place.photos} gymName={place.displayName} />
            ) : (
              <FallbackImage gymName={place.displayName} />
            )}

            <CardHeader className="bg-black/30 backdrop-blur-md border-b border-white/10 p-4">
              <CardTitle className="text-lg font-semibold text-white">
                {place.displayName}
              </CardTitle>
              <div className="flex items-start text-sm text-gray-400 mt-1">
                <MapPin className="w-4 h-4 mr-1 text-gray-500 mt-0.5 flex-shrink-0" />
                <span className="break-words leading-tight">
                  {place.formattedAddress || "Address not available"}
                </span>
              </div>
            </CardHeader>

            <CardContent className="p-4 space-y-3 text-sm text-gray-300">
              {/* Rating with fallback */}
              {place.rating > 0 ? (
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-1 text-yellow-400" />
                  {place.rating} ({place.userRatingCount} reviews)
                </div>
              ) : (
                <RatingFallback />
              )}

              {/* Phone number with fallback */}
              {place.nationalPhoneNumber ? (
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-1 text-gray-400" />
                  {place.nationalPhoneNumber}
                </div>
              ) : (
                <PhoneFallback />
              )}

              {/* Website with fallback */}
              {place.websiteUri ? (
                <div className="flex items-center">
                  <Globe className="w-4 h-4 mr-1 text-gray-400" />
                  <a
                    href={place.websiteUri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 hover:underline break-all"
                  >
                    Visit Website
                  </a>
                </div>
              ) : (
                <WebsiteFallback />
              )}

              {/* Walk-in availability with admin controls */}
              
              <div>
                {isAdmin ? (
                  <AdminWalkInToggle 
                    place={place} 
                    onUpdate={(walkIn) => {
                      console.log("onUpdate called for:", place.displayName, "with walkIn:", walkIn);
                      // Use places_id if available, otherwise fallback to displayName
                      const idToUse = place.id || place.displayName;
                      console.log("Using ID:", idToUse);
                      handleWalkInUpdate(idToUse, walkIn);
                    }}
                  />
                ) : (
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      place.walk_in
                        ? "bg-green-500/20 text-green-400 border border-green-400/30"
                        : "bg-red-500/20 text-red-400 border border-red-400/30"
                    }`}
                  >
                    {place.walk_in ? "Walk-in Available" : "Walk-in Not Available"}
                  </span>
                )}
              </div>

              {/* Google Maps link */}
              <div className="pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(place.googleMapsUri, "_blank")}
                  className="w-full border-white/20 text-white bg-white/10 hover:bg-white/20"
                >
                  View on Google Maps
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}