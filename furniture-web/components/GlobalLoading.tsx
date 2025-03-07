"use client"; 
import { motion } from 'framer-motion';
import { Loader2 } from "lucide-react";

const GlobalLoading = () => {
  return (
    <main className="fixed min-h-screen w-full left-0 top-0 flex items-center justify-center bg-white">
      <div className="flex flex-col gap-1 items-center">
        <div className="text-3xl">Avion</div>
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex items-center gap-2 text-green-700"
        >
          <Loader2 className="animate-spin" />{" "}
          <span className="text-lg font-semibold tracking-wide">
            Avion is Loading...
          </span>
        </motion.div>
      </div>
    </main>
  );
};

export default GlobalLoading;
