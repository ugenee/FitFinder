import { MapPin, Navigation, Search } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export function SearchSection(){
    const [selectedLocation, setSelectedLocation] = useState("");
    const [searchRadius, setSearchRadius] = useState("5");
    const [isSearching, setIsSearching] = useState(false);

    const handleLocationSearch = () => {
    setIsSearching(true);
    // Simulate API call
    setTimeout(() => setIsSearching(false), 1500);
    };
    
    const getCurrentLocation = () => {
        if (navigator.geolocation) {
        setIsSearching(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
            setSelectedLocation(`${position.coords.latitude}, ${position.coords.longitude}`);
            setIsSearching(false);
            },
            () => {
            alert("Location access denied. Please enter manually.");
            setIsSearching(false);
            }
        );
        }
    };

    return (
        <div>
        {/* Location Search Section */}
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
              {/* Location Input */}
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="location" className="text-gray-300">
                  Enter your location
                </Label>
                <div className="relative">
                  <Input
                    id="location"
                    type="text"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    label="Enter city, address, or coordinates..."
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
                </div>
              </div>

              {/* Search Radius */}
              <div className="space-y-2">
                <Label htmlFor="radius" className="text-gray-300">
                  Search radius
                </Label>
                <Select value={searchRadius} onValueChange={setSearchRadius}>
                  <SelectTrigger className="bg-zinc-900/80 border-zinc-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-600">
                    <SelectItem value="1">1 km</SelectItem>
                    <SelectItem value="5">5 km</SelectItem>
                    <SelectItem value="10">10 km</SelectItem>
                    <SelectItem value="25">25 km</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Search Button */}
            <Button
              onClick={handleLocationSearch}
              disabled={!selectedLocation || isSearching}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600"
            >
              {isSearching ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                  Searching...
                </>
              ) : (
                <>
                  <Search size={18} className="mr-2" />
                  Find Gyms
                </>
              )}
            </Button>
          </CardContent>
        </Card>
    </div>

    )
}