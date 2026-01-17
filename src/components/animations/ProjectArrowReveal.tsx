"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactNode, RefObject } from "react";

interface ProjectArrowRevealProps {
  containerRef: RefObject<HTMLDivElement | null>;
  className: string;
  children: ReactNode;
}

gsap.registerPlugin(ScrollTrigger);

export default function ProjectArrowReveal({
  containerRef,
  className,
  children,
}: ProjectArrowRevealProps) {
  useGSAP(() => {
    if (!containerRef.current) {
      return;
    }

    const buttons = Array.from(containerRef.current.children) as HTMLElement[];

    if (!buttons.length) {
      return;
    }

    gsap.set(buttons, {
      opacity: 0,
      x: (index) => (index % 2 === 0 ? -40 : 40),
    });

    const animation = gsap.to(buttons, {
      opacity: 1,
      x: 0,
      duration: 0.4,
      delay: 0.8,
      ease: "power2.inOut",
      stagger: 0.12,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        markers: true,
        toggleActions: "play none none reverse",
      },
    });

    return () => {
      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
