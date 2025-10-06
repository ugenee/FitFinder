import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { MapPin, Phone, Star, Globe } from "lucide-react"

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
            {place.photos && place.photos.length > 0 && (
              <div className="relative h-48 w-full">
                <img
                  src={place.photos[0]}
                  alt={place.displayName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 liquid-glass-header" />
              </div>
            )}

            <CardHeader className="bg-black/30 backdrop-blur-md border-b border-white/10 p-4">
              <CardTitle className="text-lg font-semibold text-white">
                {place.displayName}
              </CardTitle>
              <div className="flex items-center text-sm text-gray-400 mt-1">
                <MapPin className="w-4 h-4 mr-1 text-gray-500" />
                {place.formattedAddress}
              </div>
            </CardHeader>

            <CardContent className="p-4 space-y-3 text-sm text-gray-300">
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-1 text-yellow-400" />
                {place.rating > 0
                  ? `${place.rating} (${place.userRatingCount} reviews)`
                  : "No ratings yet"}
              </div>

              {place.nationalPhoneNumber && (
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-1 text-gray-400" />
                  {place.nationalPhoneNumber}
                </div>
              )}

              {place.websiteUri && (
                <div className="flex items-center">
                  <Globe className="w-4 h-4 mr-1 text-gray-400" />
                  <a
                    href={place.websiteUri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 hover:underline"
                  >
                    Visit Website
                  </a>
                </div>
              )}

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