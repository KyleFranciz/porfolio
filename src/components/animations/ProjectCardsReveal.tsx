"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactNode, RefObject } from "react";

interface ProjectCardsRevealProps {
  containerRef: RefObject<HTMLDivElement | null>;
  className: string;
  children: ReactNode;
}

gsap.registerPlugin(ScrollTrigger);

export default function ProjectCardsReveal({
  containerRef,
  className,
  children,
}: ProjectCardsRevealProps) {
  useGSAP(() => {
    if (!containerRef.current) {
      return;
    }

    const cards = Array.from(containerRef.current.children) as HTMLElement[];

    if (!cards.length) {
      return;
    }

    gsap.set(cards, {
      opacity: 0,
      y: (index) => (index % 2 === 0 ? -80 : 80),
      scale: 0.95,
    });

    const animation = gsap.to(cards, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      delay: 0.65,
      scale: 1,
      ease: "power2.inOut",
      stagger: 0.15,
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
