import React from "react";
import { Facebook, Instagram, Linkedin, Twitter, Github } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <Facebook size={20} />, href: "#", label: "Facebook" },
    { icon: <Instagram size={20} />, href: "#", label: "Instagram" },
    { icon: <Linkedin size={20} />, href: "#", label: "LinkedIn" },
    { icon: <Twitter size={20} />, href: "#", label: "Twitter" },
    { icon: <Github size={20} />, href: "#", label: "GitHub" },
  ];

  const navLinks = ["Home", "Features", "Testimonials", "Contact"];

  return (
    <footer className="mt-[120px] w-full border-t border-slate-100">
      {/* Gradient Decoration */}
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-green-400/30 to-transparent" />
      
      <div className="bg-white flex flex-col items-center justify-center w-full py-16 px-6">
        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4 mb-10">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="font-semibold text-slate-500 hover:text-green-500 transition-colors duration-300"
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Social Icons */}
        <div className="flex items-center gap-6 text-slate-400">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.href}
              aria-label={social.label}
              className="hover:text-green-500 hover:-translate-y-1 transition-all duration-300 ease-out"
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="w-24 h-px bg-slate-100 my-10" />

        {/* Copyright Section */}
        <div className="text-center text-slate-400 font-medium">
          <p>
            Copyright © {currentYear}{" "}
            <a 
              className="text-slate-900 hover:text-green-500 transition-colors font-bold" 
              href="https://prebuiltui.com"
            >
              RESUMAI.
            </a>{" "}
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;