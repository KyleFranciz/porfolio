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
  const textRef = useRef<HTMLHeadingElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  // keep a ref to the marquee tween so cleanup can kill it even though it
  // starts asynchronously inside the entrance onComplete callback
  const marqueeTweenRef = useRef<gsap.core.Tween | null>(null);

  // [] ensures this runs once on mount only — without it, every re-render
  // would kill and restart the marquee from the beginning
  useGSAP(() => {
    if (!textRef.current) return;

    const split = new SplitText(textRef.current, {
      type: "chars",
      smartWrap: true,
      charsClass: "char",
      mask: "chars",
    });

    const entranceTl = gsap.timeline({ defaults: { ease: "bounce.inOut" } });

    entranceTl.from(split.chars, {
      yPercent: "random([-200, 200])",
      opacity: 0,
      stagger: 0.08,
      delay: delay,
      duration: duration,
      onComplete: () => {
        if (!infiniteShowcase || !trackRef.current || !textRef.current) return;

        // Revert SplitText BEFORE measuring and BEFORE starting the marquee.
        // This is critical: with SplitText active, copy1 has char-mask spans
        // that make it render differently from copy2 (plain text). After the
        // GSAP repeat snap (x resets to 0), you'd see copy1's split DOM
        // instead of copy2's plain DOM — a visible flash. Reverting first
        // makes both copies identical plain text, so the snap is seamless.
        split.revert();

        // Measure AFTER revert so offsetWidth reflects plain-text rendering
        const gapPx = 4; // gap-1 = 0.25rem = 4px
        const loopWidth = textRef.current.offsetWidth + gapPx;

        marqueeTweenRef.current = gsap.to(trackRef.current, {
          x: -loopWidth,
          duration: 10,
          ease: "linear",
          repeat: -1,
          repeatDelay: 0,
        });
      },
    });

    return () => {
      split.revert();
      entranceTl.kill();
      marqueeTweenRef.current?.kill();
    };
  }, []);

  if (infiniteShowcase) {
    return (
      <div className="overflow-hidden">
        <div
          ref={trackRef}
          className="flex items-center whitespace-nowrap gap-1"
        >
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

  return (
    <h1 ref={textRef} className={className}>
      {text}
    </h1>
  );
}
