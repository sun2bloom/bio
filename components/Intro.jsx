"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Intro({ onEnter }) {
  const [visible, setVisible] = useState(true);

  const handleClick = () => {
    setVisible(false);
    setTimeout(() => onEnter(), 800);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 flex items-center justify-center bg-neutral-950 z-50"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(255,255,255,0.6)" }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClick}
            className="fixed inset-0 w-full h-full flex items-center justify-center
             text-4xl font-bold tracking-wide text-white
             bg-transparent backdrop-blur-sm
             transition-all duration-300"
          >
            enter...
          </motion.button>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
