import { Outlet } from "react-router-dom";
import Navbar from "./ui/navbar";
import Plasma from "./Plasma";

export default function Layout() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Plasma background - positioned absolutely */}
      <div className="fixed inset-0 w-full h-full z-0">
        <Plasma 
          speed={0.5}
          opacity={0.6}
          scale={1.5}
          mouseInteractive={false}
          color="#A2AADB"
        />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navbar */}
        <div className="fixed top-4 left-0 w-full z-50 flex justify-center">
          <div className="w-[95%]">
            <Navbar />
          </div>
          
        </div>

        {/* Main content */}
        <main className="flex-1 p-4 mt-20">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

