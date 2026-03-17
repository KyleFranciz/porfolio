"use client";

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
  SiFramer,
  SiGreensock,
  SiReactquery,
  SiLinux,
  SiExpress,
  SiZod,
} from "react-icons/si";
import { FaJava } from "react-icons/fa6";

type SectionProps = {
  id?: string;
};

type Skill = { name: string; link: string; Icon: IconType };

// Every row uses the same column count so all cells are identical squares.
const COLS = 6;

// Strong ease-out curve per Emil's guide — more punch than the CSS default.
const STRONG_EASE_OUT = "cubic-bezier(0.23, 1, 0.32, 1)";

const languageSkills: Skill[] = [
  { name: "React", link: "https://react.dev/", Icon: SiReact },
  { name: "Next.js", link: "https://nextjs.org/", Icon: SiNextdotjs },
  { name: "TypeScript", link: "https://www.typescriptlang.org/", Icon: SiTypescript },
  { name: "JavaScript", link: "https://www.javascript.com/", Icon: SiJavascript },
  { name: "Python", link: "https://www.python.org/", Icon: SiPython },
  { name: "Java", link: "https://www.java.com/", Icon: FaJava },
];

const librarySkills: Skill[] = [
  { name: "FastAPI", link: "https://fastapi.tiangolo.com/", Icon: SiFastapi },
  { name: "LangChain", link: "https://www.langchain.com/", Icon: SiLangchain },
  { name: "Motion", link: "https://motion.dev/", Icon: SiFramer },
  { name: "GSAP", link: "https://gsap.com/", Icon: SiGreensock },
  { name: "Express", link: "https://expressjs.com/", Icon: SiExpress },
  { name: "Zod", link: "https://zod.dev/", Icon: SiZod },
];

const toolSkills: Skill[] = [
  { name: "Tailwind", link: "https://tailwindcss.com/", Icon: SiTailwindcss },
  { name: "Supabase", link: "https://supabase.com/", Icon: SiSupabase },
  { name: "Docker", link: "https://www.docker.com/", Icon: SiDocker },
  { name: "Figma", link: "https://figma.com/", Icon: SiFigma },
  { name: "TanStack", link: "https://tanstack.com/", Icon: SiReactquery },
  { name: "Linux", link: "https://www.linux.org/", Icon: SiLinux },
];

type BoxState = {
  x: number;
  y: number;
  width: number;
  height: number;
  visible: boolean;
};

export default function SkillsSection({ id = "skills" }: SectionProps) {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [box, setBox] = useState<BoxState>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    visible: false,
  });
  const containerRef = useRef<HTMLDivElement>(null);

  function handleEnter(
    e: React.MouseEvent<HTMLAnchorElement>,
    skillName: string,
  ) {
    setHoveredSkill(skillName);
    if (!containerRef.current) return;
    const cell = e.currentTarget.getBoundingClientRect();
    const container = containerRef.current.getBoundingClientRect();
    setBox({
      x: cell.left - container.left,
      y: cell.top - container.top,
      width: cell.width,
      height: cell.height,
      visible: true,
    });
    document.documentElement.style.setProperty("--cursor-color", "white");
  }

  function handleLeave() {
    setHoveredSkill(null);
    setBox((prev) => ({ ...prev, visible: false }));
    document.documentElement.style.setProperty("--cursor-color", "#98975f");
  }

  function renderRow(skills: Skill[]) {
    const cellWidth = `calc(100% / ${COLS})`;

    const skillCells = skills.map((skill) => {
      const isHovered = hoveredSkill === skill.name;
      return (
        <Link
          key={skill.name}
          href={skill.link}
          target="_blank"
          rel="noreferrer"
          onMouseEnter={(e) => handleEnter(e, skill.name)}
          onMouseLeave={handleLeave}
          style={{ width: cellWidth }}
          // border-r border-b on every cell: together with the container's
          // border-l border-t, this forms the complete grid frame with no
          // extra divider elements needed.
          className="relative z-10 aspect-square flex flex-col items-center justify-center gap-2 border-r border-b border-foreground/15 active:scale-[0.97] transition-[transform] duration-100 ease-out"
          aria-label={skill.name}
        >
          <skill.Icon
            size={32}
            style={{ transitionTimingFunction: STRONG_EASE_OUT }}
            className={`transition-[color,transform] duration-150 ${
              isHovered ? "text-background scale-110" : "text-foreground/40 scale-100"
            }`}
          />
          <span
            style={{ transitionTimingFunction: STRONG_EASE_OUT }}
            className={`text-[11px] uppercase tracking-widest font-medium transition-[opacity,filter,transform] duration-150 ${
              isHovered
                ? "opacity-100 text-background scale-100 blur-none"
                : "opacity-0 text-foreground/40 scale-95 blur-sm"
            }`}
          >
            {skill.name}
          </span>
        </Link>
      );
    });

    // Empty placeholders carry the same border treatment so the grid stays
    // visually consistent across rows with fewer than COLS items.
    const emptyCells = Array.from({ length: COLS - skills.length }, (_, i) => (
      <div
        key={`empty-${i}`}
        style={{ width: cellWidth }}
        className="aspect-square border-r border-b border-foreground/15"
      />
    ));

    return [...skillCells, ...emptyCells];
  }

  return (
    <section
      id={id}
      className="min-h-screen snap-start flex flex-col justify-center px-10 py-8 font-satoshi"
    >
      <p className="text-xl font-bold uppercase tracking-[0.25em] text-foreground/40 mb-3">
        Skilled At
      </p>

      {/*
        border-l border-t on the container + border-r border-b on every cell
        (including label bars) creates a perfectly framed grid. No extra
        divider elements needed, no border collisions.
      */}
      <div ref={containerRef} className="relative border-l border-t border-foreground/15">
        {/* highlight box — width/height are static (same size every cell),
            only transform and opacity get the spring so layout is never triggered */}
        <motion.div
          className="absolute bg-foreground pointer-events-none z-0 rounded-sm"
          style={{ width: box.width, height: box.height }}
          animate={{
            transform: `translate(${box.x}px, ${box.y}px)`,
            opacity: box.visible ? 1 : 0,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 40 }}
        />

        {/* Languages & Frameworks */}
        <div className="border-r border-b border-foreground/15 px-3 py-1.5">
          <span className="text-[11px] uppercase tracking-widest text-foreground/40">
            Languages & Frameworks
          </span>
        </div>
        <div className="flex">{renderRow(languageSkills)}</div>

        {/* Libraries */}
        <div className="border-r border-b border-foreground/15 px-3 py-1.5">
          <span className="text-[11px] uppercase tracking-widest text-foreground/40">
            Libraries
          </span>
        </div>
        <div className="flex">{renderRow(librarySkills)}</div>

        {/* Tools */}
        <div className="border-r border-b border-foreground/15 px-3 py-1.5">
          <span className="text-[11px] uppercase tracking-widest text-foreground/40">
            Tools
          </span>
        </div>
        <div className="flex">{renderRow(toolSkills)}</div>
      </div>
    </section>
  );
}
