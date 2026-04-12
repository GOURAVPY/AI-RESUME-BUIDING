import React from "react";
import { motion } from "motion/react";
import { Facebook, Instagram, Linkedin, Twitter, Github } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <Facebook size={18} />, href: "#", label: "Facebook" },
    { icon: <Instagram size={18} />, href: "#", label: "Instagram" },
    { icon: <Linkedin size={18} />, href: "#", label: "LinkedIn" },
    { icon: <Twitter size={18} />, href: "#", label: "Twitter" },
    { icon: <Github size={18} />, href: "#", label: "GitHub" },
  ];

  const navLinks = ["Home", "Features", "Testimonials", "Contact"];

  // Animation variants
  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.footer 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={footerVariants}
      className="mt-[150px] w-full relative overflow-hidden"
    >
      {/* Premium Top Border Decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-slate-100" />
      <motion.div 
        initial={{ width: 0, left: "50%" }}
        whileInView={{ width: "60%", left: "20%" }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="absolute top-0 h-px bg-gradient-to-r from-transparent via-green-400 to-transparent" 
      />
      
      <div className="bg-white flex flex-col items-center justify-center w-full py-24 px-6">
        
        {/* Navigation - Minimalist & Spaced */}
        <motion.nav 
          variants={itemVariants}
          className="flex flex-wrap justify-center items-center gap-x-12 gap-y-4 mb-12"
        >
          {navLinks.map((link) => (
            <motion.a
              key={link}
              href={`#${link.toLowerCase()}`}
              whileHover={{ y: -2 }}
              className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-green-600 transition-colors duration-300"
            >
              {link}
            </motion.a>
          ))}
        </motion.nav>

        {/* Brand Logo / Identity */}
        <motion.div variants={itemVariants} className="mb-12">
           <div className="text-2xl font-black tracking-tighter text-slate-900">
             RESUM<span className="text-green-500 italic font-serif">AI</span>
           </div>
        </motion.div>

        {/* Social Icons with Magnetic Feel */}
        <motion.div variants={itemVariants} className="flex items-center gap-8 mb-16">
          {socialLinks.map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
              aria-label={social.label}
              whileHover={{ scale: 1.2, rotate: 5, color: "#16a34a" }}
              whileTap={{ scale: 0.9 }}
              className="text-slate-300 transition-colors"
            >
              {social.icon}
            </motion.a>
          ))}
        </motion.div>

        {/* Subtle Separator */}
        <div className="w-12 h-px bg-slate-100 mb-12" />

        {/* Copyright Section */}
        <motion.div 
          variants={itemVariants}
          className="text-center text-slate-400 text-[13px] font-medium tracking-tight"
        >
          <p>
            &copy; {currentYear}{" "}
            <motion.a 
              whileHover={{ color: "#16a34a" }}
              className="text-slate-900 font-bold decoration-green-500/30 underline-offset-4 hover:underline" 
              href="https://github.com/GOURAVPY"
            >
              GOURAVPY
            </motion.a>{" "}
            &mdash; Crafting the future of hiring.
          </p>
        </motion.div>
      </div>

      {/* Decorative Blur in Footer Corner */}
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-green-50 rounded-full blur-[100px] -z-10 opacity-60" />
    </motion.footer>
  );
};

export default Footer;