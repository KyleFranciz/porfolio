"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
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

type SectionProps = {
  id?: string;
};

type Skill = { name: string; link: string; Icon: IconType };

const allSkills: Skill[] = [
  { name: "React", link: "https://react.dev/", Icon: SiReact },
  { name: "Next.js", link: "https://nextjs.org/", Icon: SiNextdotjs },
  { name: "TypeScript", link: "https://www.typescriptlang.org/", Icon: SiTypescript },
  { name: "JavaScript", link: "https://www.javascript.com/", Icon: SiJavascript },
  { name: "Python", link: "https://www.python.org/", Icon: SiPython },
  { name: "Java", link: "https://www.java.com/", Icon: FaJava },
  { name: "FastAPI", link: "https://fastapi.tiangolo.com/", Icon: SiFastapi },
  { name: "LangChain", link: "https://www.langchain.com/", Icon: SiLangchain },
  { name: "Tailwind", link: "https://tailwindcss.com/", Icon: SiTailwindcss },
  { name: "Supabase", link: "https://supabase.com/", Icon: SiSupabase },
  { name: "Docker", link: "https://www.docker.com/", Icon: SiDocker },
  { name: "Figma", link: "https://figma.com/", Icon: SiFigma },
];

export default function SkillsSection({ id = "skills" }: SectionProps) {
  const [featuredIdx, setFeaturedIdx] = useState(1); // Next.js as default

  const n = allSkills.length;
  const prevSkill = allSkills[(featuredIdx - 1 + n) % n];
  const currentSkill = allSkills[featuredIdx];
  const nextSkill = allSkills[(featuredIdx + 1) % n];

  return (
    <section
      id={id}
      className="min-h-screen snap-start flex flex-col justify-center px-10 py-16 font-satoshi"
    >
      {/* Small label */}
      <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-foreground/40 mb-10">
        Skilled At
      </p>

      {/* Featured row: prev neighbor | featured card | next neighbor */}
      <div className="grid grid-cols-[1fr_4fr_1fr] items-center">
        {/* Prev skill */}
        <button
          onClick={() => setFeaturedIdx((featuredIdx - 1 + n) % n)}
          className="flex items-center justify-center opacity-25 hover:opacity-60 transition-opacity duration-300"
          aria-label={`Select ${prevSkill.name}`}
        >
          <prevSkill.Icon size={48} className="text-foreground" />
        </button>

        {/* Featured card */}
        <Link
          href={currentSkill.link}
          target="_blank"
          rel="noreferrer"
          className="w-full aspect-video bg-foreground flex items-center justify-center overflow-hidden"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={featuredIdx}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="flex flex-col items-center justify-center gap-5"
            >
              <currentSkill.Icon size={80} className="text-background" />
              <span className="text-background text-xs font-semibold uppercase tracking-[0.3em] opacity-60">
                {currentSkill.name}
              </span>
            </motion.div>
          </AnimatePresence>
        </Link>

        {/* Next skill */}
        <button
          onClick={() => setFeaturedIdx((featuredIdx + 1) % n)}
          className="flex items-center justify-center opacity-25 hover:opacity-60 transition-opacity duration-300"
          aria-label={`Select ${nextSkill.name}`}
        >
          <nextSkill.Icon size={48} className="text-foreground" />
        </button>
      </div>

      {/* Horizontal divider */}
      <div className="w-full border-t border-foreground/15 mt-6" />

      {/* All skills bottom row */}
      <div className="flex w-full">
        {allSkills.map((skill, i) => {
          const isActive = i === featuredIdx;
          return (
            <button
              key={skill.name}
              onMouseEnter={() => setFeaturedIdx(i)}
              onClick={() => setFeaturedIdx(i)}
              className={`flex-1 flex items-center justify-center py-10 border-r border-foreground/15 last:border-r-0 transition-opacity duration-300 ${
                isActive ? "opacity-100" : "opacity-20 hover:opacity-55"
              }`}
              aria-label={`Feature ${skill.name}`}
            >
              <skill.Icon size={28} className="text-foreground" />
            </button>
          );
        })}
      </div>
    </section>
  );
}
