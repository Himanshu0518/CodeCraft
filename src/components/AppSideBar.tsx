import { Home, Code, Heart, Bookmark, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";

const items = [
  {
    title: "Home",
    url: "/home",
    icon: Home,
  },
  {
    title: "Following",
    url: "/home/following",
    icon: Heart,
  },
  {
    title: "Your Work",
    url: "/home/yourWork",
    icon: Code,
  },
  {
    title: "Bookmarks",
    url: "/home/bookmarks",
    icon: Bookmark,
  },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar className="bg-slate-950 border-r border-slate-800 w-64">
      {/* Brand / Logo */}
      <SidebarHeader className="px-6 py-6 border-b border-slate-800">
        <div className="flex items-center">
          <Link
            to="/home"
            className="flex items-center gap-3 hover:opacity-90 transition-opacity"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-white">CodeCraft</span>
          </Link>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4 py-6">
        {/* Start Coding Button */}
        <SidebarGroup className="mb-6 mt-2">
          <SidebarGroupContent>
            <Link
              to="/home/newProject"
              className="flex items-center justify-center px-4 py-3 rounded-lg 
                bg-gradient-to-r from-indigo-600 to-purple-600 
                text-white text-sm font-medium shadow-md
                hover:from-indigo-500 hover:to-purple-500 
                transition-colors"
            >
              Start Coding
            </Link>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-3">
              {items.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        to={item.url}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                          ${
                            isActive
                              ? "bg-slate-800 text-white"
                              : "text-slate-300 hover:bg-slate-800 hover:text-white"
                          }`}
                      >
                        <item.icon className="w-5 h-5" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-slate-800 px-4 py-4">
        <div className="text-xs text-slate-400 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-md flex items-center justify-center">
              <Code className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-slate-300">CodeCraft</span>
          </div>
          <p className="mb-1">Built for developers, by developers</p>
          <p className="text-slate-600">© 2025</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
