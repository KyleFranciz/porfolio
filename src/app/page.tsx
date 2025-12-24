// import Image from "next/image";

import AboutSection from "../components/sections/AboutSection";
import HomeSection from "../components/sections/HomeSection";
import ProjectSection from "../components/sections/ProjectSection";
import SkillsSection from "../components/sections/SkillsSection";

export default function Home() {
  // set up animation to play on mount before rendering the rest of the components
  return (
    <main className="snap-y snap-mandatory">
      <HomeSection id="home" />
      <AboutSection id="about" />
      <ProjectSection id="projects" />
      <SkillsSection id="skills" />
    </main>
  );
}
