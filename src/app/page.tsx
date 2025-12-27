"use client";
import { useEffect, useState } from "react";
import AboutSection from "../components/sections/AboutSection";
import HomeSection from "../components/sections/HomeSection";
import ProjectSection from "../components/sections/ProjectSection";
import SkillsSection from "../components/sections/SkillsSection";
import { motion } from "motion/react";

export default function Home() {
  // states to hold the value of the mount for the scroll distance
  const [scrollPercentage, setScrollPercentage] = useState<number>(0);

  // function that handles scrollbar animation.
  useEffect(() => {
    // function to handle To handle scrolling.
    const handleScrollProgress = () => {
      // variables for making tracking the scroll progress
      const currentScroll = window.scrollY; // current position of the doc
      const totalPageHeight =
        document.documentElement.scrollHeight - window.innerHeight; // get the pages full height
      const safePageHeight = Math.max(totalPageHeight, 1); // never divide by zero
      const currentscrollPercentage = (currentScroll / safePageHeight) * 100;

      // set the percentage
      setScrollPercentage(currentscrollPercentage);
    };
    // add a listener for the window to take in to account when scrolling happens
    window.addEventListener("scroll", handleScrollProgress);

    // Remove Event Listener
    return () => window.removeEventListener("scroll", handleScrollProgress);
  }, []);

  // function to make account for the window scrolling
  return (
    <main className="snap-y snap-mandatory">
      <div className="">
        {/* Make a loading bar that goes at the top or right side of the page */}
        {/* <div className="fixed top-0 right-4 flex pointer-events-none items-start z-40"> */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${scrollPercentage}%` }}
          transition={{}}
          className="bg-loadingbar h-2 origin-top sticky top-0 right-0 z-40"
        ></motion.div>
        {/* </div> */}
        <div>
          {/* <div className="absolute inset-0 opacity-[0.30] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" /> */}
          <HomeSection id="home" />
          <AboutSection id="about" />
          <ProjectSection id="projects" />
          <SkillsSection id="skills" />
        </div>
      </div>
    </main>
  );
}
