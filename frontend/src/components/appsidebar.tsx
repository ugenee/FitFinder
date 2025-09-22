import { Home, HelpCircle, User2, ChevronUp } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link } from "react-router-dom"

// Menu items
const items = [
  { title: "Home", url: "/home", icon: Home },
  { title: "About", url: "/about", icon: HelpCircle },
]

export function AppSidebar() {
  return (
    <Sidebar collapsible="offcanvas" variant="inset" className="bg-zinc-900/95 backdrop-blur-sm border-r border-zinc-800">
      {/* Main menu */}
      <SidebarContent className="bg-zinc-900">
        <SidebarGroup className="bg-transparent">
          <SidebarGroupLabel className="text-2xl font-bold mb-2 text-gray-100">FitFinder</SidebarGroupLabel>
          <SidebarGroupContent className="bg-transparent">
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    className="h-12 bg-zinc-800/50 text-gray-200 hover:bg-zinc-700/80 border border-zinc-700/50 transition-all duration-200"
                  >
                    <Link to={item.url} className="flex items-center gap-2 text-gray-200">
                      <item.icon className="text-gray-300"/>
                      <span className="text-gray-200">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer with user dropdown */}
      <SidebarFooter className="bg-zinc-900 border-t border-zinc-800/50">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="h-12 bg-zinc-800/60 text-gray-200 hover:bg-zinc-700/80 border border-zinc-700/50 transition-all duration-200">
                  <User2 className="text-gray-300"/>
                  <span className="text-gray-200">Username</span>
                  <ChevronUp className="ml-auto text-gray-300" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[var(--radix-popper-anchor-width)] bg-zinc-800/95 backdrop-blur-sm border border-zinc-700/50 text-gray-200"
              >
                <DropdownMenuItem className="text-gray-200 hover:bg-zinc-700/60 focus:bg-zinc-700/60 transition-colors">
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-gray-200 hover:bg-zinc-700/60 focus:bg-zinc-700/60 transition-colors">
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}