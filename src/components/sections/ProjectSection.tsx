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
      const scrollAmount = scrollRef.current.clientWidth * 0.8;
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
        {/* Header Section */}
        <div className="flex flex-wrap items-end justify-between mb-2">
          <div className="flex flex-wrap items-end gap-x-6 gap-y-2">
            {/* TITLE OF PAGE */}
            <ScrollTriggerTitle
              text="projects"
              className="text-7xl md:text-[10rem] font-satoshi font-bold uppercase leading-[0.8] tracking-tight text-foreground"
            />
            <AnimatedLink
              text="Github"
              href="https://github.com/KyleFranciz"
              target="_blank"
              className="text-3xl md:text-5xl font-satoshi font-medium text-foreground hover:opacity-80 transition-opacity mb-2"
            />
          </div>

          {/* Navigation Arrows */}
          <ProjectArrowReveal
            containerRef={arrowRef}
            className="flex gap-4 mb-4 md:mb-2"
          >
            <button
              onClick={() => scroll("left")}
              className="p-3 rounded-full border border-mouse/30 text-mouse hover:bg-mouse hover:text-background transition-all duration-300 group"
              aria-label="Scroll left"
            >
              <ChevronLeft
                size={24}
                className="group-active:scale-90 transition-transform"
              />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-3 rounded-full border border-mouse/30 text-mouse hover:bg-mouse hover:text-background transition-all duration-300 group"
              aria-label="Scroll right"
            >
              <ChevronRight
                size={24}
                className="group-active:scale-90 transition-transform"
              />
            </button>
          </ProjectArrowReveal>
        </div>

        {/* Separator Line */}
        <ScrollSeperatorLine className="w-full h-1.25 bg-mouse mb-10" />

        {/* Scrollable Project Container */}
        <ProjectCardsReveal
          containerRef={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 md:gap-6 lg:gap-8 no-scrollbar pb-10 scroll-px-6"
        >
          {projects.map((project, index) => (
            <Link
              key={index}
              href={project.link}
              className="group relative block flex-none shrink-0 w-[85vw] sm:w-[60vw] md:w-[47%] lg:w-[47%] xl:w-[48%] aspect-square overflow-hidden rounded-2xl snap-start rouded"
            >
              {/* Image Placeholder/Container */}
              <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${project.image})`,
                  }}
                />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 z-10" />
              </div>

              {/* Check it out button */}
              <div className="absolute top-6 right-6 z-20">
                <div className="bg-[#1e1e1e] text-white px-6 py-3.5 rounded-full text-sm font-medium transition-all duration-300 border border-white/5 group-hover:bg-black">
                  Check it out
                </div>
              </div>

              {/* Project Info */}
              <div className="absolute bottom-10 left-10 z-20">
                <h3 className="text-4xl font-satoshi font-medium text-mouse mb-1">
                  {project.title}
                </h3>
                <p className="text-lg font-satoshi text-mouse/90 font-medium">
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
