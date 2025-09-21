import { Home, Code, Heart, Bookmark } from "lucide-react"
import {Link} from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar"

// Menu items
const items = [
  {
    title: "Home",
    url: "home/projects",
    icon: Home,
  },
  {
    title: "Following",
    url: "#",
    icon: Heart,
  },
  {
    title: "Your Work",
    url: "#",
    icon: Code,
  },
  {
    title: "Bookmarks",
    url: "#",
    icon: Bookmark,
  },
]

export function AppSidebar() {
  return (
    <Sidebar className="bg-slate-950 border-r border-slate-800 w-64">
      {/* Header / Brand */}
      <SidebarHeader className="px-6 py-6 border-b border-slate-800">
        <div className="flex items-center">
          <Link to="/home" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-white">
              CodeCraft
            </span>
          </Link>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4 py-6">
        {/* Start Coding Button */}
        <SidebarGroup className="mb-6 mt-2">
          <SidebarGroupContent>
            <SidebarMenuButton asChild>
              <Link
                to=""
                className="flex items-center justify-center px-4 py-3 rounded-lg bg-slate-800 text-white text-sm font-medium hover:bg-slate-900 transition-colors"
              >
                Start Coding
              </Link>
            </SidebarMenuButton>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.url}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}