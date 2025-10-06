import { useState } from "react"
import { Button } from "@/components/ui/button"
import { HeroSection } from "./hero"
import { SearchSection } from "./search-section"
import NearbyGyms from "./gym-cards"


// Mock data following your latest API response shape
const mockPlaces = [
  {
    displayName: "PowerHouse Fitness",
    formattedAddress: "123 Fitness Street, Kuala Lumpur",
    rating: 4.5,
    userRatingCount: 342,
    googleMapsUri: "https://maps.google.com/?q=PowerHouse+Fitness",
    websiteUri: "https://powerhousefitness.my",
    nationalPhoneNumber: "+60-12-345-6789",
    photos: ["https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop"],
    walk_in: true,
  },
  {
    displayName: "Elite Gym & Spa",
    formattedAddress: "456 Health Avenue, Kuala Lumpur",
    rating: 4.2,
    userRatingCount: 198,
    googleMapsUri: "https://maps.google.com/?q=Elite+Gym+Spa",
    websiteUri: "https://elitegymspa.my",
    nationalPhoneNumber: "+60-12-987-6543",
    photos: ["https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=250&fit=crop"],
    walk_in: false,
  },
  {
    displayName: "FitZone 24/7",
    formattedAddress: "789 Workout Plaza, Kuala Lumpur",
    rating: 4.7,
    userRatingCount: 521,
    googleMapsUri: "https://maps.google.com/?q=FitZone+24%2F7",
    websiteUri: "https://fitzone247.my",
    nationalPhoneNumber: "+60-12-555-0123",
    photos: ["https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=400&h=250&fit=crop"],
    walk_in: true,
  },
]

export default function HomePage() {
  const [places, setPlaces] = useState(mockPlaces)

  return (
    <div className="min-h-screen w-full bg-cover bg-center flex items-center justify-center p-4 transition-all">
      <div className="w-full max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="mb-30">
          <HeroSection />
        </div>

        {/* Header */}
        <div className="mb-8 text-center" id="search-section">
          <h1 className="text-4xl font-bold text-white mb-2">Find Your Perfect Gym</h1>
          <p className="text-gray-300 text-lg">
            Discover nearby fitness centers and start your journey
          </p>
        </div>

        <SearchSection />

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">
            Found {places.length} gyms near you
          </h2>
        </div>

        {/* Nearby Gyms Grid */}
        <NearbyGyms places={places} />

        <div className="text-center mt-8">
          <Button
            variant="outline"
            className="bg-zinc-700/60 hover:bg-zinc-600/60 border-zinc-600 text-white"
          >
            Load More Results
          </Button>
        </div>
      </div>
    </div>
  )
}
