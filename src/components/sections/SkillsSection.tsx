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
} from "react-icons/si";
import { FaJava } from "react-icons/fa6";
import ScrollTriggerTitle from "../animations/scrollTriggerTitle";

type SectionProps = {
  id?: string;
};

const languageSkills: { name: string; link: string; Icon: IconType }[] = [
  {
    name: "Python",
    link: "https://www.python.org/",
    Icon: SiPython,
  },
  {
    name: "Java",
    link: "https://www.java.com/",
    Icon: FaJava,
  },
  {
    name: "React",
    link: "https://react.dev/",
    Icon: SiReact,
  },
  {
    name: "Next.js",
    link: "https://nextjs.org/",
    Icon: SiNextdotjs,
  },
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

const toolSkills: { name: string; link: string; Icon: IconType }[] = [
  {
    name: "Supabase",
    link: "https://supabase.com/",
    Icon: SiSupabase,
  },
  {
    name: "Figma",
    link: "https://figma.com/",
    Icon: SiFigma,
  },
  {
    name: "Tailwind",
    link: "https://tailwindcss.com/",
    Icon: SiTailwindcss,
  },
];

const renderSkillCard = ({
  name,
  link,
  Icon,
}: {
  name: string;
  link: string;
  Icon: IconType;
}) => (
  <Link
    key={name}
    href={link}
    target="_blank"
    rel="noreferrer"
    aria-label={`Visit ${name}`}
    className="group flex aspect-square flex-col items-center justify-center gap-4 rounded-3xl border border-white/20 bg-white/20 p-6 text-center transition-all duration-300 hover:bg-mouse/40 hover:text-foreground"
  >
    <Icon
      size={48}
      className="text-mouse transition-colors duration-300 group-hover:text-foreground"
    />
    <span className="text-lg font-semibold uppercase tracking-wide">
      {name}
    </span>
  </Link>
);

export default function SkillsSection({ id = "skills" }: SectionProps) {
  return (
    <section
      id={id}
      className="min-h-screen snap-start px-6 py-20 flex justify-center font-satoshi"
    >
      <div className="w-full max-w-6xl">
        <div className="flex flex-col items-center text-center gap-2">
          <ScrollTriggerTitle
            text="skills"
            className="text-7xl md:text-[10rem] font-satoshi font-bold uppercase leading-[0.8] tracking-tight text-foreground"
          />
        </div>
        <div className="my-8 h-1.25 w-full bg-mouse" />

        <div className="grid grid-cols-[repeat(6,minmax(0,1fr))] gap-6">
          {languageSkills.map(renderSkillCard)}
        </div>
        <div className="mt-6 grid grid-cols-3 gap-6">
          {toolSkills.map(renderSkillCard)}
        </div>
      </div>
    </section>
  );
}
