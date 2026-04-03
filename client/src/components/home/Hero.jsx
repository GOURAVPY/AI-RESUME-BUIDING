import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Zap, Star, ArrowRight, Play } from "lucide-react";
import { Globe, Cpu, Layers, Layout } from "lucide-react"; // Import more icons
const HeroSection = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  const companiesLogo = [
    {
      name: "Google",
      logo: (
        <div className="flex items-center gap-2">
          <Globe size={24} className="text-blue-500" />
          <span className="font-bold text-2xl tracking-tighter">Google</span>
        </div>
      ),
    },
    {
      name: "Meta",
      logo: (
        <div className="flex items-center gap-2">
          <Cpu size={24} className="text-indigo-600" />
          <span className="font-bold text-2xl tracking-tighter">Meta</span>
        </div>
      ),
    },
    {
      name: "Netflix",
      logo: (
        <div className="flex items-center gap-1">
          <Layers size={24} className="text-red-600" />
          <span className="font-bold text-2xl tracking-tighter">Netflix</span>
        </div>
      ),
    },
    {
      name: "Amazon",
      logo: (
        <div className="flex items-center gap-2">
          <Layout size={24} className="text-orange-500" />
          <span className="font-bold text-2xl tracking-tighter">Amazon</span>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 left-0 z-50 flex items-center justify-between w-full py-5 px-6 md:px-16 lg:px-24 xl:px-40 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <a href="/" className="flex items-center gap-2 group">
          <div className="bg-green-500 p-2 rounded-lg group-hover:rotate-6 transition-transform">
            <Zap size={20} className="text-white fill-white" />
          </div>
          <span className="text-xl font-black tracking-tighter text-slate-900 uppercase">
            Resumai
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8 font-medium text-slate-600">
          {["Home", "Features", "Testimonials", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="hover:text-green-600 transition"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {!user ? (
            <>
              <Link
                to="/app"
                className="hidden md:block px-6 py-2 border border-slate-200 hover:bg-slate-50 transition-all rounded-full text-slate-700 font-semibold"
              >
                Login
              </Link>
              <Link
                to="/app?state=register"
                className="hidden md:block px-6 py-2 bg-green-500 hover:bg-green-600 shadow-lg shadow-green-100 active:scale-95 transition-all rounded-full text-white font-semibold"
              >
                Get started
              </Link>
            </>
          ) : (
            <Link
              to="/app"
              className="hidden md:block px-8 py-2 bg-slate-900 hover:bg-black active:scale-95 transition-all rounded-full text-white font-semibold"
            >
              Dashboard
            </Link>
          )}

          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden p-2 text-slate-900 active:scale-90 transition"
          >
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* --- MOBILE MENU OVERLAY --- */}
      <div
        className={`fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 transition-all duration-500 ${menuOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}`}
      >
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-6 right-6 p-2 text-white border border-white/20 rounded-full"
        >
          <X size={30} />
        </button>
        <div className="flex flex-col items-center gap-6 text-2xl font-bold text-white">
          {["Home", "Features", "Testimonials"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <Link
            to="/app?state=Login"
            onClick={() => setMenuOpen(false)}
            className="mt-4 px-10 py-3 bg-green-500 rounded-full text-xl shadow-lg"
          >
            {user ? "Go to Dashboard" : "Get Started"}
          </Link>
        </div>
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-44 pb-20 flex flex-col items-center text-center px-6">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 -z-10 size-[500px] bg-indigo-100 blur-[120px] opacity-50 rounded-full"></div>

        {/* Social Proof */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map((i) => (
              <img
                key={i}
                src={`https://i.pravatar.cc/150?u=${i + 10}`}
                alt="user"
                className="size-10 rounded-full border-2 border-white object-cover"
              />
            ))}
          </div>
          <div className="text-left leading-tight">
            <div className="flex text-green-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill="currentColor" />
              ))}
            </div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter">
              10k+ Users Hired
            </p>
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-slate-900 max-w-4xl tracking-tight leading-[1.1]">
          Build Your Dream Resume. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-400">
            Stand Out. Get Hired.
          </span>
        </h1>

        <p className="mt-8 text-lg md:text-xl text-slate-500 max-w-2xl font-medium">
          The only AI resume builder that actually bypasses ATS filters. Use our
          library of
          <span className="text-slate-900 font-bold">
            {" "}
            320+ pro components{" "}
          </span>
          to land interviews faster.
        </p>

        {/* Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row items-center gap-4">
          <Link
            to="/app"
            className="group flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-lg font-bold rounded-full px-10 py-4 shadow-xl shadow-green-100 transition-all hover:-translate-y-1"
          >
            Create Resume Now
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
          <button className="flex items-center gap-2 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 text-lg font-bold rounded-full px-10 py-4 transition-all">
            <Play size={20} className="fill-slate-700" />
            Watch Tutorial
          </button>
        </div>

        {/* Logos */}
        <div className="mt-28 w-full max-w-5xl">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-10">
            Trusted by candidates at
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-20 opacity-40 grayscale hover:grayscale-0 transition-all duration-500 cursor-default">
            {companiesLogo.map((company, index) => (
              <div key={index} className="hover:scale-110 transition-transform">
                {company.logo}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
