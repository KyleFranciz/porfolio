"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText);

type SectionProps = {
  id?: string;
};

export default function AboutSection({ id = "about" }: SectionProps) {
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const para1Ref = useRef<HTMLParagraphElement | null>(null);
  const para2Ref = useRef<HTMLParagraphElement | null>(null);

  useGSAP(() => {
    const targets = [
      headingRef.current,
      para1Ref.current,
      para2Ref.current,
    ].filter(Boolean) as HTMLElement[];

    const splits: SplitText[] = [];
    const animations: gsap.core.Tween[] = [];

    targets.forEach((el, i) => {
      const split = new SplitText(el, {
        type: "words",
        wordsClass: "about-word",
        mask: "words",
      });
      splits.push(split);

      gsap.set(split.words, { yPercent: 110, opacity: 0 });

      const tween = gsap.to(split.words, {
        yPercent: 0,
        opacity: 1,
        duration: 0.55,
        ease: "power2.out",
        stagger: { each: 0.07, from: "random" },
        delay: i * 0.15,
        scrollTrigger: {
          trigger: el,
          start: "bottom center",
          toggleActions: "play none none reverse",
        },
      });

      animations.push(tween);
    });

    return () => {
      animations.forEach((a) => a.kill());
      splits.forEach((s) => s.revert());
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      id={id}
      className="min-h-screen snap-start flex items-center justify-center bg-background px-6 py-16"
    >
      <div className="mx-auto max-w-3xl space-y-8 text-center">
        <div>
          <h2
            ref={headingRef}
            className="text-3xl font-semibold text-foreground [text-wrap:balance]"
          >
            Building backends that make AI useful for everyone.
          </h2>
        </div>
        <p
          ref={para1Ref}
          className="text-lg text-foreground leading-relaxed [text-wrap:pretty]"
        >
          I&apos;m a backend developer who gets excited about the intersection
          of systems and intelligence. My focus is on building tools and APIs
          that integrate seamlessly with AI — turning powerful models into
          practical, everyday utilities that anyone can pick up and run with.
        </p>
        <p
          ref={para2Ref}
          className="text-lg text-foreground leading-relaxed [text-wrap:pretty]"
        >
          I care deeply about developer experience and reducing friction. If a
          tool I build makes someone&apos;s workflow ten minutes faster or
          unlocks something they couldn&apos;t do before, that&apos;s the win.
        </p>
      </div>
    </section>
  );
}
