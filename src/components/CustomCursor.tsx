"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  // Position of cursor
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 40, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    setMounted(true);

    // Disable cursor on touch devices or if reduced motion is preferred
    const isTouchDevice = () => {
      return (
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0
      );
    };

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (isTouchDevice() || mediaQuery.matches) {
      return;
    }

    setVisible(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hoverAttr = target?.closest("[data-cursor]");
      if (hoverAttr) {
        const text = hoverAttr.getAttribute("data-cursor") || "";
        setCursorText(text);
        setIsHovered(true);
      } else {
        setCursorText("");
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (!mounted || !visible) return null;

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-taupe/60 pointer-events-none z-[99999] mix-blend-difference hidden lg:flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          width: isHovered ? 80 : 32,
          height: isHovered ? 80 : 32,
          backgroundColor: isHovered ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0)",
          borderColor: isHovered ? "rgba(255, 255, 255, 1)" : "rgba(197, 187, 175, 0.6)",
        }}
        transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.2 }}
      >
        {isHovered && (
          <span className="text-[10px] uppercase font-bold tracking-widest text-deep-charcoal font-sans select-none">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-espresso rounded-full pointer-events-none z-[99999] mix-blend-difference hidden lg:block -translate-x-1/2 -translate-y-1/2"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: isHovered ? 0 : 1,
        }}
      />
    </>
  );
}
