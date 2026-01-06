"use client";

import { useEffect, useState } from "react";

export default function CircularMouse() {
  // state obj to store positions
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // useEffect to help handle rerenders
  useEffect(() => {
    const updateCursorPostions = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };
    // add a mouse listener to listen to the changes that may happen on the screen
    window.addEventListener("mousemove", updateCursorPostions);
    // update the positions state

    return () => window.removeEventListener("mousemove", updateCursorPostions);
  }, []);

  return (
    <div
      className="fixed pointer-events-none w-4 h-4 rounded-full bg-mouse transform translate-1/2 z-100"
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    ></div>
  );
}
