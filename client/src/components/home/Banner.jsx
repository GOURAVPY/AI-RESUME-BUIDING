import React from "react";
import { motion } from "motion/react";

const Babber = () => {
  return (
    <motion.div
      // Smooth entrance from the top
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full overflow-hidden py-3 font-medium text-sm text-green-900 text-center bg-gradient-to-r from-[#ABFF7E] via-[#e3ffcc] to-[#FDFEFF] border-b border-green-100"
    >
      {/* Animated subtle shimmer overlay */}
      <motion.div
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none"
      />

      <motion.div 
        className="relative z-10 flex items-center justify-center gap-2"
        whileHover={{ scale: 1.02 }}
      >
        <motion.span
          // Attention-grabbing "pop" for the badge
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          className="px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-bold text-white bg-green-600 shadow-sm"
        >
          New
        </motion.span>
        
        <p className="tracking-tight">
          AI Resume Builder 
          <motion.span 
            className="inline-block ml-1"
            animate={{ x: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            →
          </motion.span>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Babber;