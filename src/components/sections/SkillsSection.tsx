"use client";

// imports
import { useState, useRef } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import type { IconType } from "react-icons";
import {
  SiPython,
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiSupabase,
  SiFigma,
  SiTailwindcss,
  SiDocker,
  SiFastapi,
  SiLangchain,
} from "react-icons/si";
import { FaJava } from "react-icons/fa6";

// props type
type SectionProps = {
  id?: string;
};

// type for the skills section
type Skill = { name: string; link: string; Icon: IconType };

// different skills
const languageSkills: Skill[] = [
  { name: "React", link: "https://react.dev/", Icon: SiReact },
  { name: "Next.js", link: "https://nextjs.org/", Icon: SiNextdotjs },
  {
    name: "TypeScript",
    link: "https://www.typescriptlang.org/",
    Icon: SiTypescript,
  },
  {
    name: "JavaScript",
    link: "https://www.javascript.com/",
    Icon: SiJavascript,
  },
  { name: "Python", link: "https://www.python.org/", Icon: SiPython },
  { name: "Java", link: "https://www.java.com/", Icon: FaJava },
];

const librarySkills: Skill[] = [
  { name: "FastAPI", link: "https://fastapi.tiangolo.com/", Icon: SiFastapi },
  { name: "LangChain", link: "https://www.langchain.com/", Icon: SiLangchain },
];

const toolSkills: Skill[] = [
  { name: "Tailwind", link: "https://tailwindcss.com/", Icon: SiTailwindcss },
  { name: "Supabase", link: "https://supabase.com/", Icon: SiSupabase },
  { name: "Docker", link: "https://www.docker.com/", Icon: SiDocker },
  { name: "Figma", link: "https://figma.com/", Icon: SiFigma },
];

// state for the hover box
type BoxState = {
  x: number;
  y: number;
  width: number;
  height: number;
  visible: boolean;
};

// animation for the skill section hover
export default function SkillsSection({ id = "skills" }: SectionProps) {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [box, setBox] = useState<BoxState>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    visible: false,
  });
  // ref for the container for better controll
  const containerRef = useRef<HTMLDivElement>(null);

  // handle the mouse entering
  function handleEnter(
    e: React.MouseEvent<HTMLAnchorElement>,
    skillName: string,
  ) {
    // set hovered skill state
    setHoveredSkill(skillName);

    // if there is no current container exit func
    if (!containerRef.current) return;
    // get the current position
    const cell = e.currentTarget.getBoundingClientRect();
    // get position of the container
    const container = containerRef.current.getBoundingClientRect();
    // set the box positioning
    setBox({
      x: cell.left - container.left,
      y: cell.top - container.top,
      width: cell.width,
      height: cell.height,
      visible: true,
    });
    document.documentElement.style.setProperty("--cursor-color", "white");
  }

  // handle when mouse leaves
  function handleLeave() {
    setHoveredSkill(null);
    setBox((prev) => ({ ...prev, visible: false }));
    document.documentElement.style.setProperty("--cursor-color", "#98975f");
  }

  // render out the rows
  function renderRow(skills: Skill[]) {
    return skills.map((skill) => {
      const isHovered = hoveredSkill === skill.name;
      return (
        <Link
          key={skill.name}
          href={skill.link}
          target="_blank"
          rel="noreferrer"
          onMouseEnter={(e) => handleEnter(e, skill.name)}
          onMouseLeave={handleLeave}
          className="relative z-10 flex-1 flex items-center justify-center py-28 h-full border-r border-foreground/15 last:border-r-0"
          aria-label={skill.name}
        >
          <skill.Icon
            size={45}
            className={`transition-colors duration-150 ${
              isHovered ? "text-background" : "text-foreground/40"
            }`}
          />
        </Link>
      );
    });
  }

  return (
    <section
      id={id}
      className="min-h-screen snap-start flex flex-col justify-center px-10 py-16 font-satoshi"
    >
      <p className="text-xl font-bold uppercase tracking-[0.25em] text-foreground/40 mb-8">
        Skilled At
      </p>

      <div ref={containerRef} className="relative flex flex-col">
        {/* Moving dark box */}
        <motion.div
          className="absolute bg-foreground pointer-events-none z-0 rounded-sm"
          animate={{
            x: box.x,
            y: box.y,
            width: box.width,
            height: box.height,
            opacity: box.visible ? 1 : 0,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 40 }}
        />

        {/* Row 1: Languages */}
        <div className="flex flex-col gap-2 py-20">
          <span className="text-[15px] uppercase tracking-widest text-foreground/40">
            Languages & Frameworks
          </span>
          <div className="flex">{renderRow(languageSkills)}</div>
        </div>

        <div className="border-t border-foreground/15" />

        {/* Row 2: Libraries */}
        <div className="flex flex-col gap-2 py-20">
          <span className="text-[15px] uppercase tracking-widest text-foreground/40">
            Libraries
          </span>
          <div className="flex">{renderRow(librarySkills)}</div>
        </div>

        <div className="border-t border-foreground/15" />

        {/* Row 3: Tools */}
        <div className="flex flex-col gap-2 py-20">
          <span className="text-[15px] uppercase tracking-widest text-foreground/40">
            Tools
          </span>
          <div className="flex">{renderRow(toolSkills)}</div>
        </div>
      </div>
    </section>
  );
}
