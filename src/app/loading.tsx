"use client";
import { motion } from "motion/react";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/80 backdrop-blur-md">
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-3 h-3 bg-[#ffae23] rounded-full"
            initial={{
              scale: 1,
              opacity: 0.5,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.15,
              times: [0, 0.5, 1],
            }}
          />
        ))}
      </div>
    </div>
  );
}
