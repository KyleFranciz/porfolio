"use client";
import { useGSAP } from "@gsap/react";
import gsap, { SplitText } from "gsap/all";
import { useRef } from "react";

interface SimpleTextStaggerI {
  text: string;
  infiniteShowcase?: boolean;
  delay?: number;
  duration?: number;
  className?: string;
}

export default function SimpleTextStagger({
  text,
  delay,
  duration,
  className,
  infiniteShowcase,
}: SimpleTextStaggerI) {
  // reference for the primary text line that SplitText manipulates
  const textRef = useRef<HTMLHeadingElement | null>(null);
  // track reference used only when rendering the looping marquee copy
  const trackRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    if (!textRef.current) return;

    const split = new SplitText(textRef.current, {
      type: "chars",
      smartWrap: true,
      charsClass: "char",
      mask: "chars",
    });

    // GSAP timeline to control the characters animation + optional marquee
    const timeline = gsap.timeline({ defaults: { ease: "bounce.inOut" } });

    // initial stagger animation that drops each char into view
    timeline.from(split.chars, {
      yPercent: "random([-200, 200])",
      opacity: 0,
      stagger: 0.08,
      delay: delay,
      duration: duration,
    });

    // triggers if on the condition for both infiniteShowcase and trackRef.current
    if (infiniteShowcase && trackRef.current) {
      const gapPx = 4; // gap-1 equals 0.25rem / 4px
      const loopWidth = textRef.current.offsetWidth + gapPx;

      // follow-up tween that scrolls the duplicated copy forever
      timeline.to(
        trackRef.current,
        {
          x: -loopWidth,
          duration: 10,
          ease: "linear",
          repeat: -1,
          repeatDelay: 0,
        },
        ">",
      );
    }

    // cleanup SplitText clones and timeline when component unmounts or rerenders
    return () => {
      split.revert();
      timeline.kill();
    };
  });

  if (infiniteShowcase) {
    return (
      <div className="overflow-hidden">
        <div
          ref={trackRef}
          className="flex items-center whitespace-nowrap gap-1"
        >
          {/* duplicate copy so GSAP can scroll continuously with no gaps */}
          {[0, 1].map((copy) => (
            <h1
              key={`marquee-${copy}`}
              ref={copy === 0 ? textRef : undefined}
              className={className}
              aria-hidden={copy > 0}
            >
              {text}
            </h1>
          ))}
        </div>
      </div>
    );
  }

  // fallback for the single-line animation without marquee copies
  return (
    <h1 ref={textRef} className={className}>
      {text}
    </h1>
  );
}
