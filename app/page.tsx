"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Intro from "../components/Intro";
import BioCard from "../components/BioCard";

export default function Home() {
  const [entered, setEntered] = useState(false);

  return (
    <main className="flex items-center justify-center min-h-screen bg-black text-white">
      <AnimatePresence>
        {!entered && (
          <motion.div
            key="intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Intro onEnter={() => setEntered(true)} />
          </motion.div>
        )}
      </AnimatePresence>

      {entered && (
        <motion.div
          key="card"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <BioCard />
        </motion.div>
      )}
    </main>
  );
}