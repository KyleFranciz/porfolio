"use client";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useLayoutEffect, useRef } from "react";

type Text = {
  text: string;
  yInput?: number;
  className: string;
};

// register the gsap text plugin
gsap.registerPlugin(SplitText);

// function for text animation
export default function StaggeredText({ text, className }: Text) {
  // ref for DOMnode
  const textRef = useRef<HTMLHeadingElement | null>(null); // for the different heading types

  // useEffect to help with rerenders
  useLayoutEffect(() => {
    // check for ref
    if (!textRef.current) {
      return;
    }

    // otherwise make the text split
    const split = new SplitText(textRef.current, {
      type: "chars",
      smartWrap: true,
      charsClass: "char",
      mask: "chars",
    });

    gsap.from(split.chars, {
      yPercent: "random([200, -300])",
      stagger: 0.085,
      duration: 0.8,
      opacity: 0,
      delay: 0.2,
      ease: "power2.out",
      rotation: 5,
    });

    // make the split go back to its original state
    return () => {
      split.revert();
    };
  }, [text]);
  return (
    // return the element and make sure its linkable as a ref
    <h1 className={className} ref={textRef}>
      {text}
    </h1>
  );
}
