import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg"; // ✅ fix

const Navbar = () => {
  const navigate = useNavigate(); // ❗ missing before
  const user = { name: "Gourav Suman" };

  const logoutUser = () => {
    navigate("/");
  };

  return (
    <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 py-3.5 text-slate-800">
      <Link to="/">
        <img src={logo} alt="logo" className="h-11 w-auto" />
      </Link>

      <div className="flex items-center gap-4 text-sm">
        <p className="mr-2 max-sm:hidden">Hi, {user?.name}</p>

        <button
          onClick={logoutUser}
          className="bg-white hover:bg-slate-50 border border-gray-300 px-7 py-1.5 rounded-full active:scale-95 transition-all"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;