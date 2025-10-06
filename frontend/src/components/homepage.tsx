import { useState } from "react";
import { motion } from "framer-motion";
import { HeroSection } from "./hero";
import { SearchSection } from "./search-section";
import NearbyGyms from "./gym-cards";
import AboutSection from "./about-page";
import { useUser } from "./user-context";

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
  places_id?: string;
}

const mockPlaces: Place[] = [
  // ... your mock data
];

export default function HomePage() {
  const [places, setPlaces] = useState<Place[]>(mockPlaces);
  const { isAdmin } = useUser(); // Get admin status from context

  const handleGymsFetched = (gyms: Place[]) => {
    setPlaces(gyms);
  };

  return (
    <div className="min-h-screen w-full bg-cover bg-center flex items-center justify-center p-4 transition-all">
      <div className="w-full max-w-6xl mx-auto space-y-12">
        {/* Admin badge */}
        {isAdmin && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4"
          >
            <div className="bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 px-4 py-2 rounded-full text-sm font-medium inline-flex items-center gap-2">
              <span>🔧</span>
              Admin Mode - You can edit walk-in status
            </div>
          </motion.div>
        )}
        {/* Hero Section */}
        <motion.div
          id="hero-section"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-100"
        >
          <HeroSection />
        </motion.div>

        {/* Header */}
        <motion.div
          id="search-section"
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <h1 className="text-4xl font-bold text-white mb-2">
            Find Your Perfect Gym
          </h1>
          <p className="text-gray-300 text-lg">
            Discover nearby fitness centers and start your journey
          </p>
        </motion.div>

        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <SearchSection onGymsFetched={handleGymsFetched} />
        </motion.div>

        {/* Results Header */}
        <motion.div
          className="flex justify-between items-center mb-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-white">
            Found {places.length} gyms near you
          </h2>
        </motion.div>

        {/* Nearby Gyms Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <NearbyGyms places={places} isAdmin={isAdmin} />
        </motion.div>
        <div className="mt-100">
        <AboutSection />
        </div>
      </div>
    </div>
  );
}
