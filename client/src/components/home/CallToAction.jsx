import React from "react";
import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";

const CallToAction = () => {
  // Animation Variants for cleaner code
  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1], // Custom "Expo" ease
        staggerChildren: 0.1 
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="relative mb-[150px] mt-[150px] px-6 overflow-visible">
      {/* Dynamic Background Glow */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2] 
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-80 bg-green-300/30 blur-[140px] -z-10 rounded-full" 
      />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-5xl mx-auto relative group"
      >
        {/* Main Card */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="relative overflow-hidden bg-white border border-slate-100 rounded-[3rem] p-8 md:p-20 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.06)]"
        >
          {/* Animated Grid Overlay */}
          <motion.div 
            animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"
          />

          <div className="relative flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1 text-center md:text-left">
              {/* Floating Badge */}
              <motion.div 
                variants={itemVariants}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-50 border border-green-100 text-green-700 text-[10px] font-bold uppercase tracking-[0.15em] mb-8"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles size={14} className="text-green-500" />
                </motion.div>
                <span>Boost your career</span>
              </motion.div>

              <motion.h2 
                variants={itemVariants}
                className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.05] mb-8 tracking-tight"
              >
                Build a resume <br className="hidden lg:block" /> 
                <span className="text-green-600 italic">that gets hired.</span>
              </motion.h2>
              
              <motion.p 
                variants={itemVariants}
                className="text-lg text-slate-500 max-w-md font-medium leading-relaxed"
              >
                Stand out from the crowd with a polished, ATS-friendly resume designed by industry experts.
              </motion.p>
            </div>

            <motion.div 
              variants={itemVariants}
              className="shrink-0 flex flex-col items-center"
            >
              {/* Magnetic-style Button */}
              <motion.a
                href="https://github.com/GOURAVPY"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="group/btn relative flex items-center gap-4 rounded-full py-6 px-12 bg-slate-900 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
              >
                {/* Shimmer Effect */}
                <motion.div 
                  animate={{ x: ["-150%", "150%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
                  className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
                />
                
                <span className="relative text-white font-bold text-xl tracking-tight">Get Started Now</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="text-white" size={24} />
                </motion.div>
              </motion.a>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-slate-400 text-sm mt-6 font-semibold uppercase tracking-widest"
              >
                No credit card required
              </motion.p>
            </motion.div>
          </div>
        </motion.div>

        {/* Floating Decorative Accents */}
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-6 -right-6 w-24 h-24 border-t-2 border-r-2 border-green-500/10 rounded-tr-[4rem] -z-10" 
        />
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-6 -left-6 w-24 h-24 border-b-2 border-l-2 border-green-500/10 rounded-bl-[4rem] -z-10" 
        />
      </motion.div>
    </div>
  );
};

export default CallToAction;