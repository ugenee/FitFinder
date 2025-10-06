import { useState } from 'react';
import { MapPin, Star, Phone, Clock, DollarSign, Users, Heart, ExternalLink } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HeroSection } from './hero';
import { SearchSection } from './search-section';

// Mock data - replace with actual Google Places API data
const mockGyms = [
  {
    id: 1,
    name: "PowerHouse Fitness",
    address: "123 Fitness Street, Kuala Lumpur",
    rating: 4.5,
    reviewCount: 342,
    priceLevel: 2,
    walkInAble: true,
    phoneNumber: "+60-12-345-6789",
    openNow: true,
    images: ["https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop"],
    distance: "0.8 km",
    amenities: ["Free WiFi", "Parking", "Shower", "Locker"]
  },
  {
    id: 2,
    name: "Elite Gym & Spa",
    address: "456 Health Avenue, Kuala Lumpur",
    rating: 4.2,
    reviewCount: 198,
    priceLevel: 3,
    walkInAble: false,
    phoneNumber: "+60-12-987-6543",
    openNow: true,
    images: ["https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=250&fit=crop"],
    distance: "1.2 km",
    amenities: ["Pool", "Sauna", "Personal Training", "Parking"]
  },
  {
    id: 3,
    name: "FitZone 24/7",
    address: "789 Workout Plaza, Kuala Lumpur",
    rating: 4.7,
    reviewCount: 521,
    priceLevel: 1,
    walkInAble: true,
    phoneNumber: "+60-12-555-0123",
    openNow: false,
    images: ["https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=400&h=250&fit=crop"],
    distance: "2.1 km",
    amenities: ["24/7 Access", "Free Weights", "Cardio", "Group Classes"]
  }
];

const priceLabels = ["Free", "$", "$$", "$$$", "$$$$"];

export default function HomePage() {
  const [likedGyms, setLikedGyms] = useState(new Set());


  const toggleLike = (gymId: unknown) => {
    const newLiked = new Set(likedGyms);
    if (newLiked.has(gymId)) {
      newLiked.delete(gymId);
    } else {
      newLiked.add(gymId);
    }
    setLikedGyms(newLiked);
  };

  return (
        <div
  className=
    "min-h-screen w-full bg-cover bg-center flex items-center justify-center p-4 transition-all"
  
>

      <div className="w-full max-w-6xl mx-auto">
      <div className='mb-30'>
        <HeroSection/>
      </div>
        

        {/* Header */}
        <div className="mb-8 text-center" id="search-section">
          <h1 className="text-4xl font-bold text-white mb-2">Find Your Perfect Gym</h1>
          <p className="text-gray-300 text-lg">Discover nearby fitness centers and start your journey</p>
        </div>
        <SearchSection/>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">
            Found {mockGyms.length} gyms near you
          </h2>
          <p className="text-gray-300 text-sm">
            Sorted by distance
          </p>
        </div>

        {/* Gym Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {mockGyms.map((gym) => (
            <Card 
              key={gym.id}
              className="bg-zinc-800/60 backdrop-blur-sm border-zinc-700/50 hover:border-zinc-600/50 transition-all duration-300 hover:transform hover:scale-[1.02] overflow-hidden"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={gym.images[0]}
                  alt={gym.name}
                  className="w-full h-full object-cover"
                />
                <Button
                  onClick={() => toggleLike(gym.id)}
                  variant="ghost"
                  size="sm"
                  className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm h-auto ${
                    likedGyms.has(gym.id)
                      ? 'bg-red-500/80 text-white hover:bg-red-600/80'
                      : 'bg-black/40 text-white hover:bg-red-500/80'
                  }`}
                >
                  <Heart size={18} fill={likedGyms.has(gym.id) ? 'currentColor' : 'none'} />
                </Button>
                <Badge className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-white">
                  {gym.distance}
                </Badge>
              </div>

              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-white text-xl line-clamp-1">{gym.name}</CardTitle>
                  <div className="flex items-center gap-1 text-yellow-400 flex-shrink-0">
                    <Star size={16} fill="currentColor" />
                    <span className="text-white text-sm font-medium">{gym.rating}</span>
                    <span className="text-gray-400 text-sm">({gym.reviewCount})</span>
                  </div>
                </div>
                <CardDescription className="text-gray-300 flex items-start gap-2">
                  <MapPin size={14} className="mt-0.5 flex-shrink-0" />
                  {gym.address}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Quick Info Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <DollarSign size={14} className="text-green-400" />
                    <span className="text-gray-300 text-sm">{priceLabels[gym.priceLevel]}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={14} className={gym.walkInAble ? "text-green-400" : "text-red-400"} />
                    <span className="text-gray-300 text-sm">
                      {gym.walkInAble ? "Walk-ins OK" : "Members only"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={14} className={gym.openNow ? "text-green-400" : "text-red-400"} />
                    <span className="text-gray-300 text-sm">
                      {gym.openNow ? "Open now" : "Closed"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={14} className="text-blue-400" />
                    <a
                      href={`tel:${gym.phoneNumber}`}
                      className="text-blue-400 text-sm hover:underline"
                    >
                      Call
                    </a>
                  </div>
                </div>

                {/* Amenities */}
                <div className="flex flex-wrap gap-1">
                  {gym.amenities.slice(0, 3).map((amenity) => (
                    <Badge
                      key={amenity}
                      variant="secondary"
                      className="bg-zinc-700/50 text-gray-300 hover:bg-zinc-600/50"
                    >
                      {amenity}
                    </Badge>
                  ))}
                  {gym.amenities.length > 3 && (
                    <Badge variant="secondary" className="bg-zinc-700/50 text-gray-400">
                      +{gym.amenities.length - 3} more
                    </Badge>
                  )}
                </div>
              </CardContent>

              <CardFooter className="flex gap-2">
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                  View Details
                </Button>
                <Button variant="outline" size="icon" className="border-zinc-600 hover:border-zinc-500 text-gray-300">
                  <ExternalLink size={16} />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-8">
          <Button variant="outline" className="bg-zinc-700/60 hover:bg-zinc-600/60 border-zinc-600 text-white">
            Load More Results
          </Button>
        </div>
      </div>
    </div>
  );
}