import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { Outlet } from "react-router-dom"
import { SidebarTrigger } from "@/components/ui/sidebar"
import Footer from "@/components/Footer"
import Header from "../components/Header"

export default function RootLayout() {
  return (
    <SidebarProvider>
      {/* Sidebar always on the left */}
      <AppSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen bg-slate-950 m-2">
        
        {/* Top Header */}
        <header className="h-14 bg-slate-950/95 backdrop-blur-sm flex items-center 
        border-b  border-slate-950 px-4 gap-2 sticky  z-10">
          <SidebarTrigger className="text-slate-300 hover:text-white transition-colors" />
        <Header/>     
        </header>
        

        {/* Main Body */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>

        <Footer/>
      </div>
    </SidebarProvider>
  )
}
