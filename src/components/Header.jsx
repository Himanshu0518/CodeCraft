import React from "react";
import { Search, LogOut, UserPen } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/features/authSlice";
import { logOut } from "../services/auth";
import { motion } from "framer-motion";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.userData);

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
            <div className="flex-1 max-full relative ">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search projects, collections, and more..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-12 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
                />
              </div>
            </div>

            <motion.button
              className="px-4 py-2 rounded-xl bg-blue-400 hover:bg-blue-600 
             text-white text-sm font-medium shadow-sm 
             transition-colors duration-200"
            >
              Create
            </motion.button>

            {/* Profile Dropdown */}
            <motion.div whileHover={{ scale: 1.1 }}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-600 transition">
                    {user.photoURL ? (
                      <motion.img
                        src={user.photoURL}
                        alt={user.photoURL}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <motion.span
                        className="text-sm font-medium text-white"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        {user.email
                          ? user.email.slice(0, 2).toUpperCase()
                          : user.displayName.slice(0, 2).toUpperCase()}
                      </motion.span>
                    )}
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
                  <DropdownMenuItem
                    className="flex items-center justify-between hover:bg-slate-800 cursor-pointer"
                    onClick={() => handleLogout()}
                  >
                    Logout <LogOut className="w-4 h-4 text-red-400" />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
