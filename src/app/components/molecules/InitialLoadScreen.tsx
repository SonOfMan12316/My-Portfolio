"use client";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

export default function InitialLoadScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisited");
    
    if (hasVisited) {
      setIsLoading(false);
      return;
    }

    const hideTimeout = setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem("hasVisited", "true");
    }, 2000);

    if (document.readyState === "complete") {
      setTimeout(() => {
        setIsLoading(false);
        sessionStorage.setItem("hasVisited", "true");
      }, 2000);
    } else {
      window.addEventListener("load", () => {
        setTimeout(() => {
          setIsLoading(false);
          sessionStorage.setItem("hasVisited", "true");
        }, 2000);
      });
    }

    return () => {
      clearTimeout(hideTimeout);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 flex items-center justify-center z-[9999] bg-black/90 backdrop-blur-md"
    >
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
    </motion.div>
  );
}

