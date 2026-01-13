"use client";

// imports
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

// interface
interface ScrollSeperatorLineI {
  // lineThickness: number; // might not need
  className: string;
}

// register the plug-in
gsap.registerPlugin(ScrollTrigger);

// function for the scroll seperator
export default function ScrollSeperatorLine(props: ScrollSeperatorLineI) {
  // create the ref to make sure the animation is linked
  const seperatorRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    // if the ref doesn't exist
    if (!seperatorRef.current) return;

    // set the starting state of the ref
    gsap.set(seperatorRef.current, {
      width: "0",
    });
    // animate the line to be full
    const seperatorAnimation = gsap.to(seperatorRef.current, {
      width: "100%",
      ease: "power3.inOut",
      duration: 0.62,
      delay: 0.9,
      scrollTrigger: {
        trigger: seperatorRef.current,
        start: "bottom center",
        // scrub: 1,
        markers: true,
        toggleActions: "play none none reverse",
      },
    });

    return () => {
      seperatorAnimation.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
  return <div ref={seperatorRef} className={props.className}></div>;
}
