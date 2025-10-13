import { MapPin, Navigation, Search, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";

interface Place {
  displayName: string;
  formattedAddress: string;
  rating: number;
  userRatingCount: number;
  googleMapsUri: string;
  websiteUri?: string;
  nationalPhoneNumber?: string;
  photos?: string[];
  walk_in: boolean;
}

interface NearbyGymsResponse {
  places: Place[];
}

interface GeocodeResult {
  lat: number;
  lng: number;
  formatted_address?: string;
}

interface GeocodeSuggestion {
  place_id: string;
  description: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
}

const BASE_URL = "https://fitfinder-backend-l8ma.onrender.com";

const fetchNearbyGyms = async (
  lat: number,
  lng: number,
  radius: number = 1500
): Promise<NearbyGymsResponse> => {
  const url = new URL("/places/nearby-gyms", BASE_URL);
  url.searchParams.append("lat", lat.toString());
  url.searchParams.append("lng", lng.toString());
  url.searchParams.append("radius", radius.toString());

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Failed to fetch gyms: ${response.statusText}`);
  }

  return response.json();
};

const fetchLocationSuggestions = async (query: string): Promise<GeocodeSuggestion[]> => {
  if (!query.trim() || query.length <= 2) return [];
  
  const url = new URL("/places/autocomplete", BASE_URL);
  url.searchParams.append("input", query);

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error("Failed to fetch suggestions");
  }
  
  const data = await response.json();
  return data.predictions || [];
};

const geocodeLocation = async (location: string): Promise<GeocodeResult> => {
  const url = new URL("/places/geocode", BASE_URL);
  url.searchParams.append("address", location);

  const response = await fetch(url.toString());
  if (!response.ok) throw new Error("Failed to get coordinates");
  return response.json();
};

interface SearchSectionProps {
  onGymsFetched: (gyms: Place[]) => void;
}

export function SearchSection({ onGymsFetched }: SearchSectionProps) {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // React Query: fetch location suggestions with debouncing via staleTime
  const { data: suggestions = [] } = useQuery({
    queryKey: ["locationSuggestions", searchQuery],
    queryFn: () => fetchLocationSuggestions(searchQuery),
    enabled: searchQuery.length > 2 && showSuggestions,
    staleTime: 300, // Debounce effect
  });

  // React Query: fetch gyms
  const {
    isLoading: isSearching,
    error,
    refetch,
  } = useQuery({
    queryKey: ["nearbyGyms", coordinates],
    queryFn: async () => {
      if (!coordinates) throw new Error("No coordinates");
      const data = await fetchNearbyGyms(coordinates.lat, coordinates.lng);
      onGymsFetched(data.places);
      return data;
    },
    enabled: false,
    retry: 1,
  });

  const [isGeocoding, setIsGeocoding] = useState(false);

  const handleSuggestionSelect = async (suggestion: GeocodeSuggestion) => {
    setSelectedLocation(suggestion.description);
    setShowSuggestions(false);
    setSearchQuery("");
    
    setIsGeocoding(true);
    try {
      const coords = await geocodeLocation(suggestion.description);
      setCoordinates(coords);
      setTimeout(() => refetch(), 100);
    } catch (error) {
      alert("Failed to get coordinates for selected location.");
    } finally {
      setIsGeocoding(false);
    }
  };

  const handleLocationSearch = async () => {
    try {
      let coords = coordinates;

      if (!coords && selectedLocation.trim()) {
        setIsGeocoding(true);
        const geoData = await geocodeLocation(selectedLocation);
        coords = { lat: geoData.lat, lng: geoData.lng };
        setCoordinates(coords);
        setIsGeocoding(false);
      }

      if (coords) {
        await refetch();
      } else {
        alert("Please enter a valid location or use current location.");
      }
    } catch (err: any) {
      alert(err.message || "Failed to get coordinates.");
      setIsGeocoding(false);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCoordinates(coords);
          setSelectedLocation(
            `Current Location (${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)})`
          );
          setShowSuggestions(false);
          setTimeout(() => refetch(), 200);
        },
        (error) => {
          alert("Location access denied. Please enter manually.");
          console.error("Geolocation error:", error);
        }
      );
    } else {
      alert("Geolocation not supported on this browser.");
    }
  };

  const popularLocations = [
    { name: "Kuala Lumpur City Center", coords: { lat: 3.1573, lng: 101.7116 } },
    { name: "Petaling Jaya", coords: { lat: 3.1064, lng: 101.6063 } },
    { name: "Subang Jaya", coords: { lat: 3.0497, lng: 101.5845 } },
    { name: "Cheras, Kuala Lumpur", coords: { lat: 3.0833, lng: 101.7333 } },
  ];

  const handlePopularLocationSelect = (location: typeof popularLocations[0]) => {
    setSelectedLocation(location.name);
    setCoordinates(location.coords);
    setShowSuggestions(false);
    setSearchQuery("");
    setTimeout(() => refetch(), 100);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelectedLocation(value);
    setSearchQuery(value);
    setShowSuggestions(true);
  };

  const handleInputBlur = () => {
    // Delay to allow click on suggestion to register
    setTimeout(() => setShowSuggestions(false), 200);
  };

  return (
    <div>
      <Card className="mb-8 bg-zinc-800/60 backdrop-blur-sm border-zinc-700/50">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <MapPin className="text-blue-400" size={20} />
            Location & Search
          </CardTitle>
          <CardDescription className="text-gray-400">
            Enter your location to find nearby gyms
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="location" className="text-gray-300">
                Enter your location
              </Label>
              <div className="relative" ref={inputRef}>
                <Input
                  id="location"
                  type="text"
                  value={selectedLocation}
                  onChange={handleInputChange}
                  onFocus={() => searchQuery.length > 2 && setShowSuggestions(true)}
                  onBlur={handleInputBlur}
                  label="Enter city, address, or place name..."
                  className="bg-zinc-900/80 border-zinc-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                />
                <Button
                  onClick={getCurrentLocation}
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-blue-400 h-auto"
                  title="Use current location"
                >
                  <Navigation size={18} />
                </Button>

                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 bg-zinc-800 border border-zinc-600 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
                    {suggestions.map((suggestion) => (
                      <button
                        key={suggestion.place_id}
                        className="w-full text-left p-3 hover:bg-zinc-700 transition-colors border-b border-zinc-600 last:border-b-0"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          handleSuggestionSelect(suggestion);
                        }}
                      >
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="text-white font-medium">
                              {suggestion.structured_formatting.main_text}
                            </div>
                            <div className="text-gray-400 text-sm">
                              {suggestion.structured_formatting.secondary_text}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-gray-300 text-sm">Popular locations</Label>
            <div className="flex flex-wrap gap-2">
              {popularLocations.map((location, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handlePopularLocationSelect(location)}
                  className="bg-zinc-700/50 hover:bg-zinc-600/50 border-zinc-600 text-white text-xs"
                >
                  <Clock className="w-3 h-3 mr-1" />
                  {location.name}
                </Button>
              ))}
            </div>
          </div>

          {error && (
            <div className="text-red-400 text-sm">Error: {(error as Error).message}</div>
          )}

          <Button
            onClick={handleLocationSearch}
            disabled={!selectedLocation || isSearching || isGeocoding}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 w-full"
          >
            {(isSearching || isGeocoding) ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                {isGeocoding ? "Getting location..." : "Searching..."}
              </>
            ) : (
              <>
                <Search size={18} className="mr-2" />
                Find Gyms Nearby
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}