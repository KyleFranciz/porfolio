"use client";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";

type Text = {
  text: string;
  yInput?: number;
  className: string;
};

// register the gsap text plugin
gsap.registerPlugin(SplitText);
gsap.registerPlugin(useGSAP);

// function for text animation
export default function StaggeredText({ text, className }: Text) {
  // ref for DOMnode
  const textRef = useRef<HTMLHeadingElement | null>(null); // for the different heading types

  // useEffect to help with rerenders
  useGSAP(() => {
    // check for ref
    if (!textRef.current) {
      return;
    }

    // make the object to make the text controllable
    const split = new SplitText(textRef.current, {
      type: "chars",
      smartWrap: true,
      charsClass: "char", // controls the styling class that is given
      mask: "chars", // adds a mask to hid the text when it comes in the screen
    });

    // setting up the animation to split each character
    gsap.from(split.chars, {
      yPercent: "random([200, -300])",
      stagger: 0.085,
      duration: 0.8,
      opacity: 0,
      delay: 0.2,
      ease: "power2.out",
      rotation: 5,
    });
  });
  return (
    // return the element and make sure its linkable as a ref
    <h1 className={className} ref={textRef}>
      {text}
    </h1>
  );
}
