"use client";

import Link from "next/link";
import { useRef } from "react";
// for Navigation between projects
import { ChevronLeft, ChevronRight } from "lucide-react";
import AnimatedLink from "../animations/animatedLink";
import ProjectArrowReveal from "../animations/ProjectArrowReveal";
import ProjectCardsReveal from "../animations/ProjectCardsReveal";
import ScrollTriggerTitle from "../animations/scrollTriggerTitle";
import ScrollSeperatorLine from "../animations/scrollSeperatorLine";

type SectionProps = {
  id?: string;
};

const projects = [
  {
    title: "Doc AI",
    description: "Local agent that helps with documentation",
    image:
      "https://images.unsplash.com/photo-1487014679447-9f8336841d58?auto=format&fit=crop&w=1600&q=80",
    link: "https://github.com/KyleFranciz/doc-ai",
  },
  {
    title: "AniLoaded",
    description: "Anime collection app with social aspects",
    image:
      "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=1600&q=80",
    link: "https://github.com/WonderCharmer26/AniLoaded",
  },
  {
    title: "FAU Network",
    description: "Campus event app that connects students to on campus events",
    image:
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1600&q=80",
    link: "https://github.com/KyleFranciz/fau-network",
  },
];

// function to handle the scrolling on the project section
export default function ProjectSection({ id = "projects" }: SectionProps) {
  // container for the scrolling section
  const scrollRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  // function for contoling the horizontal scrolling of the section
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      // scroll by one card width (50% of container + gap)
      const scrollAmount = scrollRef.current.clientWidth * 0.5 + 8;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id={id}
      className="min-h-screen px-6 py-20 flex flex-col justify-center font-satoshi"
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* Header Section — title, github link, and arrows all on same baseline */}
        <div className="flex items-end justify-between mb-2">
          <div className="flex items-end gap-x-6">
            <ScrollTriggerTitle
              text="projects"
              className="text-7xl md:text-[6rem] font-satoshi font-bold uppercase leading-[0.85] tracking-tight text-foreground"
            />
            <AnimatedLink
              text="Github"
              href="https://github.com/KyleFranciz"
              target="_blank"
              className="text-2xl md:text-[2rem] font-satoshi font-medium text-foreground hover:opacity-80 transition-opacity mb-1"
            />
          </div>

          {/* Navigation Arrows — aligned to baseline of title */}
          <ProjectArrowReveal
            containerRef={arrowRef}
            className="flex gap-4 mb-1"
          >
            <button
              onClick={() => scroll("left")}
              className="p-3 rounded-full border border-mouse/30 text-mouse hover:bg-mouse hover:text-background transition-[color,background-color,border-color,transform] duration-150 ease-out active:scale-[0.96]"
              aria-label="Scroll left"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-3 rounded-full border border-mouse/30 text-mouse hover:bg-mouse hover:text-background transition-[color,background-color,border-color,transform] duration-150 ease-out active:scale-[0.96]"
              aria-label="Scroll right"
            >
              <ChevronRight size={24} />
            </button>
          </ProjectArrowReveal>
        </div>

        {/* Separator Line */}
        <ScrollSeperatorLine className="w-full h-1.5 bg-mouse mb-8" />

        {/* Scrollable Project Container — 2 cards visible at a time */}
        <ProjectCardsReveal
          containerRef={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 no-scrollbar scroll-px-6"
        >
          {projects.map((project, index) => (
            <Link
              key={index}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block flex-none shrink-0 w-[85vw] md:w-[calc(50%-0.5rem)] aspect-[690/736] overflow-hidden rounded-1xl snap-start"
            >
              {/* Background Image */}
              <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${project.image})` }}
                />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent z-10" />
              </div>

              {/* Check it out button */}
              <div className="absolute top-5 right-5 z-20">
                <div className="bg-[#262626] text-background px-5 py-3 rounded-full text-base font-satoshi font-bold transition-all duration-300 group-hover:bg-black">
                  Check it out
                </div>
              </div>

              {/* Project Info — mix-blend-screen makes olive text glow over dark image */}
              <div className="absolute bottom-8 left-8 z-20 mix-blend-screen">
                <h3 className="text-[2rem] font-satoshi font-medium text-mouse mb-1">
                  {project.title}
                </h3>
                <p className="text-xl font-satoshi font-bold text-mouse">
                  {project.description}
                </p>
              </div>
            </Link>
          ))}
        </ProjectCardsReveal>
      </div>
    </section>
  );
}
