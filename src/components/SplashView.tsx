import React, { useEffect } from "react";
import { motion } from "motion/react";
import { ShieldCheck, Calculator } from "lucide-react";

interface SplashViewProps {
  onProceed: () => void;
}

export default function SplashView({ onProceed }: SplashViewProps) {
  // Let the splash screen linger for 2.5 seconds, then transition to login
  useEffect(() => {
    const timer = setTimeout(() => {
      onProceed();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onProceed]);

  return (
    <div
      onClick={onProceed}
      className="relative flex flex-col items-center justify-between min-h-screen w-full bg-gradient-to-b from-[#eaf6f4] via-[#f8fcfb] to-white p-8 cursor-pointer select-none"
    >
      {/* Decorative ambient blobs */}
      <div className="absolute top-[-10%] left-[-20%] w-[80vw] h-[80vw] rounded-full bg-radial from-[#80d5cb]/20 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-20%] w-[80vw] h-[80vw] rounded-full bg-radial from-[#9cf2e8]/20 to-transparent blur-3xl pointer-events-none" />

      {/* Top Spacer */}
      <div />

      {/* Centered Brand Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center text-center space-y-6"
      >
        {/* Brand Icon Matching Screen 1 */}
        <div className="p-5 bg-white/80 rounded-2xl shadow-xl backdrop-blur-md border border-white/40 mb-2">
          <div className="w-16 h-16 rounded-xl bg-[#0F766E] flex items-center justify-center shadow-inner">
            <Calculator className="w-9 h-9 text-white" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-extrabold tracking-wider text-[#0F766E]">
          SUKAHITUNG
        </h1>

        {/* Subtitle */}
        <p className="text-[#3e4947] font-medium text-base md:text-lg">
          Solusi Cerdas Keuangan UMKM
        </p>

        {/* Brand Horizontal Line Matching Screen 1 */}
        <div className="w-40 h-1 bg-[#0F766E] rounded-full mt-4" />
      </motion.div>

      {/* Bottom Footer Details */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="flex items-center space-x-2 text-[#6e7977] text-sm font-medium border border-gray-100 bg-white/60 px-4 py-2 rounded-full shadow-sm backdrop-blur-sm"
      >
        <ShieldCheck className="w-4 h-4 text-[#0F766E]" />
        <span>Precision In Every Calculation</span>
      </motion.div>
    </div>
  );
}
