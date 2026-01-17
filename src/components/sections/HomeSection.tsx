"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import StaggeredText from "@/utils/StaggeredTextAnimation";
import StaggeredPTag from "@/utils/StaggeredPTag";
import { motion } from "motion/react";
import DynamicIsland from "../DynamicIsland";

type SectionProps = {
  id?: string;
};

// predefined setting to help with adjusting the staggers in the animations
const subheadStagger = 0.2;
const arrowStagger = 2;

export default function HomeSection({ id = "home" }: SectionProps) {
  const heroRef = useRef<HTMLElement | null>(null);
  const [introComplete, setIntroComplete] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    if (!introComplete) {
      setIsSticky(false);
      return;
    }

    const handleScroll = () => {
      const threshold = heroRef.current?.offsetHeight ?? 0;
      setIsSticky(window.scrollY > threshold);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [introComplete]);

  return (
    <section
      ref={heroRef}
      className="relative h-screen w-full bg-theme-beige text-theme-dark overflow-hidden font-clash selection:bg-theme-olive selection:text-white"
    >
      {/* 1. GRAIN OVERLAY (Optional)
         This adds that subtle texture seen in your reference.
      */}
      {/* <div className="absolute inset-0 opacity-[0.30] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" /> */}

      {/* 2. TOP DECORATION
       */}
      <div className="absolute top-0 left-0 w-full p-6 md:p-10 flex justify-between items-start z-20">
        {/* Olive Accent Bar */}
        <StaggeredPTag
          className="text-xl font-bold"
          text="BASED IN: LAUDERHILL, FL"
          delay={subheadStagger}
        />
        <div className="w-24 h-1.5 bg-theme-olive" />

        {/* Top Right Action */}
        <button className="flex items-center md:text-xl gap-2 font-bold hover:opacity-60 transition-opacity sm:text-sm">
          {/* <span>→</span> */}
          {/* <StaggeredPTag delay={arrowStagger} text="→" /> */}
          <StaggeredPTag delay={subheadStagger} text="REACH OUT" />
          {/* add in an on click that renders out the other nav items and plays the */}
          {/* animations */}
        </button>
      </div>

      {/* 3. MAIN CENTERPIECE 
         Flex container to center the massive text exactly.
      */}
      <div className="flex flex-col items-center justify-center h-full text-center px-4">
        {/* CLASH DISPLAY TEXT 
           - leading-[0.8]: Brings the 'Kyle' and 'Francis' closer together
           - text-[14vw]: Scales perfectly with screen size
        */}
        <StaggeredText
          className="relative block whitespace-nowrap overflow-hidden font-display font-black uppercase text-[6.5vw] md:text-[12vw] lg:text-[14vw] leading-[0.70] sm:text-[12vw] "
          text="Creatively"
        />
        <StaggeredText
          className="relative block whitespace-nowrap overflow-hidden font-display font-black uppercase text-[6.5vw] md:text-[12vw] lg:text-[14vw] leading-[0.70] sm:text-[12vw] "
          text="building."
        />

        <StaggeredText
          text="using one block of code at a time."
          className="mt-0 md:mt-0 font-bold text-[3.7vw] md:text-[3.15vw] lg:text-[3.65vw] uppercase sm:text-[3.1vw]"
        />

        {/* Pine Tree Icon (Simple SVG version) */}
        <motion.div
          className=" mt-0"
          initial={{ scale: 0, opacity: 0, y: 40, rotate: 5 }}
          animate={{ scale: 1, opacity: 1, y: 0, x: 0, rotate: 0 }}
          transition={{
            duration: 0.95,
            // y: { visualDuration: 5 },
            opacity: { delay: 0.2 },
            y: {
              type: "spring",
              visualDuration: 9,
              stiffness: 100,
              bounce: 0.4,
            },
          }}
        >
          <Image
            height={60}
            src={"/Portfolio Logo.svg"}
            alt="tree"
            width={60}
          />
        </motion.div>
      </div>

      {/* 4. BOTTOM STATUS BAR
       */}
      <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 flex flex-col items-center gap-2 text-center md:flex-row md:justify-between md:items-end z-20 font-satoshi font-bold xl md:text-xs tracking-widest uppercase">
        <div className="flex justify-between items-center w-full gap-4">
          <div className="flex items-center justify-center">
            <StaggeredPTag
              delay={subheadStagger}
              text="GO AHEAD AND SCROLL"
              className="text-sm cursor-default"
            />
            <StaggeredPTag
              delay={arrowStagger}
              text="↓"
              className="text-base px-1"
            />
          </div>

          <div className="flex-1 flex items-center justify-center min-h-28">
            <div
              className={`transition-all duration-300 ${
                isSticky
                  ? "fixed top-4 left-1/2 z-40 -translate-x-1/2"
                  : "relative"
              }`}
            >
              <div className="w-fit">
                <DynamicIsland
                  onAnimationComplete={() => setIntroComplete(true)}
                />
              </div>
            </div>
          </div>

          <StaggeredPTag
            text="INTERNSHIP STATUS: SEEKING"
            className="hidden md:block sm:hidden text-lg"
            delay={subheadStagger}
          />
        </div>
      </div>
    </section>
  );
}
