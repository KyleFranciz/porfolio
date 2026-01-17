"use client";

// imports
import { useGSAP } from "@gsap/react"; // use to handle the animation state
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";

// interface
interface scrollTriggerTitleI {
  text: string;
  className: string;
}

// register the pluggins so that gsap knows it's useable
gsap.registerPlugin(ScrollTrigger, SplitText);

export default function ScrollTriggerTitle({
  text,
  className,
}: scrollTriggerTitleI) {
  // create a ref to handle animation state of the element passed back
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  // make an gsap block to handle animation clean up
  useGSAP(() => {
    // handle if there is no element
    if (!titleRef.current) {
      return;
    }

    // make split text animation
    const split = new SplitText(titleRef.current, {
      type: "chars",
      smartWrap: true,
      charsClass: "char",
      mask: "chars",
    });

    // set the initial state of the text animation before it executes
    gsap.set(split.chars, {
      yPercent: "random(-400, 400)",
      opacity: 0,
      rotation: 1.3,
    });

    // animation control for the text
    const animation = gsap.to(split.chars, {
      yPercent: 0,
      delay: 0.8,
      duration: 0.52,
      ease: "power2.inOut",
      opacity: 1,
      rotation: 0,
      stagger: 0.095,
      scrollTrigger: {
        trigger: titleRef.current,
        // scrub: 1,
        start: "bottom center",
        markers: true,
        toggleActions: "play none none reverse",
      },
    });

    // clean up the function to make sure that it stop running properly
    return () => {
      animation.kill(); // kill the animation
      split.revert(); // change the text back to normal
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <h2 ref={titleRef} className={className}>
      {text}
    </h2>
  );
}
