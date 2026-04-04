import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../app/features/authSlice";
import {Zap} from 'lucide-react'

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutUser = () => {
    navigate("/");
    dispatch(logout());
  };

  return (
    // Fixed wrapper to ensure it stays on top during scroll
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
      <nav className="max-w-7xl mx-auto flex items-center justify-between bg-white/80 backdrop-blur-md border border-slate-200/50 px-6 py-3 rounded-2xl shadow-sm">
        {/* Logo Section */}
        <Link
          to="/"
           className="flex items-center gap-2 group"
        >
          <div className="bg-green-500 p-2 rounded-lg group-hover:rotate-6 transition-transform">
            <Zap size={20} className="text-white fill-white" />
          </div>
          <span className="text-xl font-black tracking-tighter text-slate-900 uppercase">
            Resumai
          </span>
        </Link>

        {/* User Actions */}
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end max-sm:hidden">
            <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
              Account
            </span>
            <p className="text-sm font-semibold text-slate-700">{user?.name}</p>
          </div>

          <button
            onClick={logoutUser}
            className="group relative inline-flex items-center justify-center px-6 py-2 text-sm font-bold text-white transition-all duration-200 bg-slate-900 rounded-xl hover:bg-slate-800 active:scale-95 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
          >
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
