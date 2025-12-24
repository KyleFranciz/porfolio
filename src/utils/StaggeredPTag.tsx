"use client";

import { SplitText } from "gsap/all";
import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";

interface pTagRefI {
  text: string;
  className?: string;
  delay?: number;
}

// register the gsap pluggin
gsap.registerPlugin(SplitText);

export default function StaggeredPTag({ text, className, delay }: pTagRefI) {
  // create ref to access the paragragh element that Ill use
  const pTagRef = useRef<HTMLParagraphElement | null>(null);

  // create a useLayout to help with making sure the animation loads properly
  useLayoutEffect(() => {
    // make sure that there is a p tag element
    if (!pTagRef.current) return;

    // otherwise create the gsap text splitter
    const split = new SplitText(pTagRef.current, {
      type: "chars",
      smartWrap: true,
      charsClass: "char",
      mask: "chars",
    });

    // use the split text to split the words and animate them
    gsap.from(split.chars, {
      yPercent: "random(-200, 200)",
      stagger: 0.07,
      opacity: 0,
      delay: delay,
      duration: 0.82,
      ease: "power2.out",
      rotation: 5,
    });

    // revert the text to normal after the animation runs
    return () => {
      split.revert();
    };
  }, [text]);
  return (
    <p ref={pTagRef} className={className}>
      {text}
    </p>
  );
}
