import { useState } from "react";
import { Menu, X, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()
  async function logoutPost(){
    const response = await fetch("http://localhost:8000/auth/logout", {
      method: "POST",
      credentials: "include"
    });
    if (!response.ok) {
      throw new Error("Logout Failed")
    }

    return response.json();

  }
  const {mutate, isPending} = useMutation({
    mutationFn: logoutPost,
    onSuccess: () => {
      navigate("/login");
    },
    onError: () => {
      console.log("Logout Failed")
    }
  })

  const handleLogout = () => {
    mutate();
  };

  const handleProfile = () => {
    console.log("Profile clicked");
    // Add your profile navigation logic here
  };

  const handleScrollHero = () => {
    const element = document.getElementById("hero-section");
    if (element) {
        const yOffset = -100;
        const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({ top: y, behavior: "smooth" });
    }
    };

    const handleScrollAbout = () => {
    const element = document.getElementById("about-section");
    if (element) {
      const yOffset = -80; // Reduced for mobile
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Top Navbar */}
      <header className="sticky top-4 z-50 flex items-center justify-between px-8 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full max-w-6xl w-full mx-auto shadow-lg shadow-black/10">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-400 font-bold text-sm">
            FF
          </div>
          <span className="font-semibold text-white">FitFinder</span>
        </div>

        <nav className="hidden md:flex gap-8 text-sm font-medium text-white/70">
          <a className="hover:text-white transition-colors cursor-pointer" onClick={handleScrollHero}>
            Home
          </a>
          <a className="hover:text-white transition-colors cursor-pointer" onClick={handleScrollAbout}>
            About
          </a>
        </nav>

        {/* Right: Profile and Sign Out Buttons (Desktop only) */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={handleProfile}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm px-4 py-2 rounded-full transition-colors border border-white/20"
          >
            <User size={16} />
            Profile
          </button>
          
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-red-200 font-semibold text-sm px-4 py-2 rounded-full transition-colors border border-red-500/30"
          >
            <LogOut size={16} />
            <span>{isPending ? "Logging out..." : "Sign out"}</span>
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setIsOpen(true)}
        >
          <Menu size={24} />
        </button>
      </header>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-50 flex transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        ></div>

        {/* Sidebar panel with animation */}
        <div
          className={`relative w-64 h-full bg-zinc-900/80 backdrop-blur-md border-r border-white/10 shadow-xl flex flex-col transform transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 text-white"
            onClick={() => setIsOpen(false)}
          >
            <X size={24} />
          </button>

          {/* Sidebar links */}
          <nav className="mt-16 flex flex-col gap-6 text-white/80 text-lg px-6">
            <a
              className="hover:text-white transition-colors"
              onClick={() => {
                setIsOpen(false);
                handleScrollHero();
              }}
            >
              Home
            </a>
            <a
              className="hover:text-white transition-colors"
              onClick={() => {
                setIsOpen(false);
                handleScrollAbout();
              }}
            >
              About
            </a>
            
            {/* Mobile Account Section */}
            <div className="pt-4 border-t border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400 font-bold">
                  FF
                </div>
                <div>
                  <p className="text-white font-medium">Account</p>
                  <p className="text-white/60 text-sm">user@example.com</p>
                </div>
              </div>
              
              <button
                onClick={() => {
                  handleProfile();
                  setIsOpen(false);
                }}
                className="flex items-center gap-2 w-full text-left hover:text-white transition-colors py-2"
              >
                <User size={18} />
                Profile
              </button>
              
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="flex items-center gap-2 w-full text-left text-red-400 hover:text-red-500 transition-colors py-2"
              >
                <LogOut size={18} />
                Sign Out
              </button>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;