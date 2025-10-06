import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export function HeroSection() {
  const handleScroll = () => {
    const element = document.getElementById("search-section");
    if (element) {
        const yOffset = -120;
        const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({ top: y, behavior: "smooth" });
    }
    };
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center text-left px-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl">
          Fitness <span className="text-blue-400">Made Simple</span> With FitFinder
        </h1>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-lg text-gray-300 max-w-2xl font-semibold">
            Discover gyms near you, explore workout plans, and start your journey with
            AI powered Features.
          </p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 whitespace-nowrap" onClick={handleScroll}>
            <Search className="mr-2 h-5 w-5" /> Find Gyms
          </Button>
        </div>
      </div>
    </section>
  )
}
