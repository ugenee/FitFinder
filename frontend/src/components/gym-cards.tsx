import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { MapPin, Phone, Star, Globe, Image as ImageIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

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
}

interface NearbyGymsProps {
  places: Place[]
}

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

export default function NearbyGyms({ places }: NearbyGymsProps) {
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

              {/* Walk-in availability */}
              <div>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    place.walk_in
                      ? "bg-green-500/20 text-green-400 border border-green-400/30"
                      : "bg-red-500/20 text-red-400 border border-red-400/30"
                  }`}
                >
                  {place.walk_in ? "Walk-in Available" : "Appointment Only"}
                </span>
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