import React from "react";
import { ChevronRight } from "lucide-react";
import { motion } from "motion/react";

interface WelcomeScreenProps {
  onNext: () => void;
}

export default function WelcomeScreen({ onNext }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen px-6 py-12 text-center bg-transparent select-none">
      {/* Spacer top */}
      <div />

      {/* Main Logo & Identity */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center"
      >
        {/* Dynamic Dual Arc SVG Logo resembling the original precisely */}
        <div className="relative w-36 h-24 mb-4 flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 150 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Top Primary Green Arc */}
            <path 
              d="M15,55 C15,20 135,20 135,55" 
              stroke="rgba(255, 255, 255, 0.8)" 
              strokeWidth="4" 
              strokeLinecap="round" 
              fill="none" 
            />
            {/* Bottom Translucent Overlapping Light Arc */}
            <path 
              d="M15,65 C15,85 135,85 135,65" 
              stroke="rgba(255, 255, 255, 0.25)" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              fill="none" 
              opacity="0.8"
            />
          </svg>
          <span className="font-display font-bold text-3xl text-white tracking-tight relative top-4 z-10">
            SkillGap
          </span>
        </div>

        <div className="text-xs uppercase tracking-widest text-slate-300 font-display font-semibold mt-1">
          Professional Growth
        </div>
      </motion.div>

      {/* Quote & Roadmap Capsule */}
      <div className="w-full max-w-md my-8 flex flex-col items-center gap-8">
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="italic text-base text-slate-200 font-serif"
        >
          "Bridge the gap to your future"
        </motion.p>

        {/* Steps Capsule layout */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex items-center justify-around w-full px-5 py-6 bg-white/[0.05] backdrop-blur-md rounded-full border border-white/10 text-sm gap-2 shadow-inner"
        >
          <div className="flex flex-col items-center">
            <span className="font-semibold text-white">Scan</span>
            <span className="text-xs text-slate-300">skills</span>
          </div>
          <span className="text-white/30">→</span>
          <div className="flex flex-col items-center">
            <span className="font-semibold text-white">Find</span>
            <span className="text-xs text-slate-300">gaps</span>
          </div>
          <span className="text-white/30">→</span>
          <div className="flex flex-col items-center">
            <span className="font-semibold text-white">Build</span>
            <span className="text-xs text-slate-300">roadmap</span>
          </div>
        </motion.div>
      </div>

      {/* Button & Footer */}
      <div className="w-full max-w-sm flex flex-col items-center gap-6">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNext}
          className="flex items-center justify-center gap-2 w-full py-4 bg-white hover:bg-slate-100 text-slate-950 font-semibold rounded-2xl shadow-xl transition-all cursor-pointer text-sm"
        >
          Get Started
          <ChevronRight size={18} />
        </motion.button>

        <span className="text-xs text-slate-400/80 tracking-wide font-light">
          © 2024 SkillGap Education Group
        </span>
      </div>
    </div>
  );
}
