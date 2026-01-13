"use client";

// imports
import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

// interface
interface AnimatedLinkProps {
  text: string;
  href: string;
  className: string;
  target?: string;
}

// register the plugins so that gsap knows it's usable
gsap.registerPlugin(ScrollTrigger, SplitText);

export default function AnimatedLink({
  text,
  href,
  className,
  target,
}: AnimatedLinkProps) {
  // create a ref to handle animation state of the element passed back
  const linkRef = useRef<HTMLAnchorElement | null>(null);

  // make an gsap block to handle animation clean up
  useGSAP(() => {
    // handle if there is no element
    if (!linkRef.current) {
      return;
    }

    // make split text animation
    const split = new SplitText(linkRef.current, {
      type: "chars",
      smartWrap: true,
      charsClass: "char",
      mask: "chars",
    });

    // set the initial state of the text animation before it executes
    gsap.set(split.chars, {
      yPercent: "random(400, -400)",
      opacity: 0,
      rotation: 1.3,
    });

    // animation control for the text
    const animation = gsap.to(split.chars, {
      yPercent: 0,
      delay: 0.85,
      duration: 0.52,
      ease: "power1.inOut",
      opacity: 1,
      rotation: 0,
      stagger: 0.095,
      scrollTrigger: {
        trigger: linkRef.current,
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
    <Link ref={linkRef} href={href} target={target} className={className}>
      {text}
    </Link>
  );
}
