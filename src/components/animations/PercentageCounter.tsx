"use client";

import { motion, useMotionValue, useTransform, animate } from "motion/react";
import { useEffect } from "react";

type Props = {
  from?: number;
  to?: number;
  duration?: number;
};
export default function PercentageCounter({}: Props) {
  // variables
  const count = useMotionValue(0);
  // transform the number all the wat to 100
  const rounded = useTransform(count, (latest) => Math.round(latest)); // increments

  useEffect(() => {
    // controls the animation status
    const controls = animate(count, 100, {
      type: "keyframes",
      duration: 1.4,
      ease: "easeOut",
    });

    // stop the animation
    return controls.stop;
  }, []);

  return (
    <div>
      <div>
        <motion.span>{rounded}</motion.span>
        <>%</>
      </div>
    </div>
  );
}
