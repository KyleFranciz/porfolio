// component to have the dynamic island navbar
"use client";

import Image from "next/image";
import { motion } from "motion/react";
import SimpleTextStagger from "@/utils/SimpleTextStagger";

interface DynamicIslandProps {
  onAnimationComplete?: () => void;
}

export default function DynamicIsland({
  onAnimationComplete,
}: DynamicIslandProps) {
  return (
    <motion.div
      initial={{ width: 100 }}
      animate={{ width: 500 }}
      transition={{
        delay: 1.5,
        duration: 2.2,
        type: "spring",
        bounce: 0.2,
        ease: "easeInOut",
      }}
      // add on click that make the width smaller
      onAnimationComplete={onAnimationComplete}
      className=" flex justify-start p-1 items-center bg-foreground md:w-125 h-25 rounded-full"
    >
      <div className="w-22.5 min-w-22.5">
        <Image
          className=" block shrink-0"
          src={"/photo logo.png"}
          width={90}
          height={90}
          alt="my-logo"
        />
      </div>
      <div className="w-80 flex overflow-hidden flex-col items-start ml-4 gap-0">
        <SimpleTextStagger
          delay={2.5}
          duration={0.2}
          text="kyle  francis"
          className="uppercase text-background text-2xl"
        />
        <div className="shadow-inner">
          <SimpleTextStagger
            delay={2.5}
            duration={0.1}
            infiniteShowcase={true}
            text="Frontend, Backend, Full-Stack, "
            className="uppercase text-neutral-400 m-0 text-lg -mt-1.5 font-satoshi font-medium"
          />
        </div>
      </div>
    </motion.div>
  );
}
