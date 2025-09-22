import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./appsidebar";
import { Outlet } from "react-router-dom";
import { CubeBackground } from "./cubebackground";

export default function Layout() {
  return (
    <>
      {/* Background - outside sidebar provider to ensure it covers everything */}
      <CubeBackground className="z-0" />
      
      <SidebarProvider>
        <div className="flex relative min-h-screen z-10">
          {/* Left sidebar */}
          <AppSidebar />

          {/* Main content */}
          <main className="flex-1 p-4 relative z-20 bg-transparent">
            <SidebarTrigger className="text-white"/>
            <Outlet />
          </main>
        </div>
      </SidebarProvider>
    </>
  )
}