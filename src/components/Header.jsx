import React from 'react'
import { Search, LogOut, UserPen } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  
} from "@/components/ui/dropdown-menu";
import {useDispatch} from "react-redux";
import { logout } from "@/features/authSlice";
import {logOut} from "../services/auth"

const Header = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
   await logOut();
    dispatch(logout());
  };
  return (
 <>
 <div className="w-full  bg-slate-950/95 backdrop-blur-sm sticky top-0 z-10 pt-5">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Search Bar */}
            <div className="flex-1 max-w-2xl relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search projects, collections, and more..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-12 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
                />
              </div>
            </div>

            {/* Profile Dropdown */}
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-600 transition">
                    <span className="text-sm font-medium text-white">HS</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-48 bg-slate-900 border border-slate-700 text-white"
                >
                  <DropdownMenuLabel className="text-xs uppercase tracking-wide text-slate-400">
                    My Account
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-slate-700" />
                  <DropdownMenuItem className="flex items-center justify-between hover:bg-slate-800 cursor-pointer">
                    Profile <UserPen className="w-4 h-4 text-slate-400" />
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center justify-between hover:bg-slate-800 cursor-pointer"
                   onClick={() => handleLogout()}
                   >
                
                    Logout <LogOut className="w-4 h-4 text-red-400" />
                  
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
 </>
  )
}

export default Header
