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
      <SidebarHeader className="px-6 py-4 border-b border-slate-800">
        <div className="py-5 flex items-center">
          <Link to="/home" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Code className="w-5 h-5 text-white"  />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">
            CodeCraft
          </span>
          </Link>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.url}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-all duration-200 group"
                    >
                      <item.icon className="w-5 h-5 group-hover:text-blue-400 transition-colors" />
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