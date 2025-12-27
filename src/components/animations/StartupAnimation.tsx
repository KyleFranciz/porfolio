"use client"; // helps to import useLibrary

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";
import PercentageCounter from "./PercentageCounter";

export default function StartupAnimation({
  children,
}: {
  children: React.ReactNode;
}) {
  // bool state to track start the animation on start up
  const [showSplash, setShowSplash] = useState(true);

  // make sure the animation plays once on rerenders
  useEffect(() => {
    // timer for the animation
    const t = setTimeout(() => setShowSplash(false), 2500); // affects the animation length
    return () => clearTimeout(t); // stop the timer cancels the timeout
  }, []);

  // animation starts the first time
  if (showSplash) {
    return (
      <>
        <AnimatePresence>
          <div className="min-h-screen grid place-items-center">
            {/* Simple “show-off” splash animation */}
            <div className="flex flex-col items-center gap-4">
              <motion.div
                initial={{ opacity: 0, scale: 1, y: -40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  y: { type: "spring", bounce: 0.2, stiffness: 100 },
                }}
              >
                <Image
                  height={50}
                  src={"/Portfolio Logo.svg"}
                  alt="tree"
                  width={50}
                />
              </motion.div>

              <motion.div className="text-2xl font-semibold">
                <PercentageCounter />
              </motion.div>
            </div>
          </div>
        </AnimatePresence>
      </>
    );
  }

  // show the regular app
  return <>{children}</>;
}
