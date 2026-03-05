"use client";
import Link from "next/link";
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
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTriggerTitle from "../animations/scrollTriggerTitle";
import ScrollSeperatorLine from "../animations/scrollSeperatorLine";

type SectionProps = {
  id?: string;
};

type Skill = { name: string; link: string; Icon: IconType };

const EmptyIcon: IconType = () => null;

const languageSkills: Skill[] = [
  { name: "Python", link: "https://www.python.org/", Icon: SiPython },
  { name: "Java", link: "https://www.java.com/", Icon: FaJava },
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
];

const librariesSkills: Skill[] = [
  { name: "FastAPI", link: "https://fastapi.tiangolo.com/", Icon: SiFastapi },
  { name: "LangChain", link: "https://www.langchain.com/", Icon: SiLangchain },
];

const toolSkills: Skill[] = [
  { name: "Supabase", link: "https://supabase.com/", Icon: SiSupabase },
  { name: "AWS", link: "https://aws.amazon.com/", Icon: EmptyIcon },
  { name: "Docker", link: "https://www.docker.com/", Icon: SiDocker },
  { name: "Figma", link: "https://figma.com/", Icon: SiFigma },
  { name: "Tailwind", link: "https://tailwindcss.com/", Icon: SiTailwindcss },
];

// Number of copies to duplicate for seamless looping
const COPIES = 6;

function MarqueeRow({
  label,
  skills,
  direction = "left",
}: {
  label: string;
  skills: Skill[];
  direction?: "left" | "right";
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  // Duplicate items enough times to ensure seamless loop at any screen width
  const items = Array.from({ length: COPIES }, () => skills).flat();

  useGSAP(() => {
    const el = trackRef.current;
    if (!el) return;

    // Moving by -(100/COPIES)% shifts exactly one full set of items
    const movePercent = -(100 / COPIES);

    tweenRef.current = gsap.fromTo(
      el,
      { xPercent: direction === "right" ? movePercent : 0 },
      {
        xPercent: direction === "right" ? 0 : movePercent,
        duration: skills.length * 6,
        ease: "none",
        repeat: -1,
      },
    );

    return () => {
      tweenRef.current?.kill();
    };
  }, [direction, skills.length]);

  return (
    <div className="mt-15 flex flex-col gap-10">
      <h3 className="px-6 text-xs font-semibold uppercase tracking-[0.25em] text-mouse">
        {label}
      </h3>
      <div
        className="overflow-hidden border-y border-foreground/10 py-20"
        onMouseEnter={() => tweenRef.current?.pause()}
        onMouseLeave={() => tweenRef.current?.play()}
      >
        <div ref={trackRef} className="flex w-max items-center">
          {items.map((skill, i) => (
            <Link
              key={`${skill.name}-${i}`}
              href={skill.link}
              target="_blank"
              rel="noreferrer"
              aria-label={`Visit ${skill.name}`}
              className="group flex shrink-0 items-center gap-4 px-10"
            >
              <skill.Icon
                size={38}
                className="text-foreground/30 transition-colors duration-300 group-hover:text-foreground"
              />
              <span className="text-2xl font-bold uppercase tracking-tight text-foreground/30 transition-colors duration-300 group-hover:text-foreground">
                {skill.name}
              </span>
              <span className="ml-4 text-xl text-foreground/15">·</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SkillsSection({ id = "skills" }: SectionProps) {
  return (
    <section
      id={id}
      className="min-h-screen snap-start overflow-hidden py-20 font-satoshi"
    >
      <div className="px-6">
        <div className="flex flex-col items-center text-center gap-2">
          <ScrollTriggerTitle
            text="skills"
            className="text-7xl md:text-[10rem] font-satoshi font-bold uppercase leading-[0.8] tracking-tight text-foreground"
          />
        </div>
        <ScrollSeperatorLine className="my-8 h-1.25 w-full bg-mouse" />
      </div>

      <MarqueeRow label="Languages" skills={languageSkills} direction="left" />
      <MarqueeRow
        label="Libraries"
        skills={librariesSkills}
        direction="right"
      />
      <MarqueeRow label="Tools" skills={toolSkills} direction="left" />
    </section>
  );
}
