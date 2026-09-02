import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let activeMagnetic: HTMLElement | null = null;

    const resetMagnetic = () => {
      if (activeMagnetic) {
        activeMagnetic.style.transform = "";
        activeMagnetic = null;
      }
    };

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      if (window.matchMedia("(pointer: coarse)").matches) return;
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>("button, a, .magnetic");
      if (!target) {
        resetMagnetic();
        return;
      }

      if (activeMagnetic && activeMagnetic !== target) resetMagnetic();
      const bounds = target.getBoundingClientRect();
      const offsetX = (e.clientX - (bounds.left + bounds.width / 2)) * 0.12;
      const offsetY = (e.clientY - (bounds.top + bounds.height / 2)) * 0.12;
      activeMagnetic = target;
      activeMagnetic.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("interactive")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>("button, a, .magnetic");
      const related = e.relatedTarget as Node | null;
      if (target && !related?.isConnected || (target && related && !target.contains(related))) {
        resetMagnetic();
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
      resetMagnetic();
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-primary rounded-full pointer-events-none z-[9999] mix-blend-screen"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          scale: isHovering ? 0 : 1,
          opacity: isHovering ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 2 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 border-2 border-primary rounded-full pointer-events-none z-[9998]"
        animate={{
          x: mousePosition.x - 24,
          y: mousePosition.y - 24,
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? "rgba(139, 92, 246, 0.1)" : "transparent",
        }}
        transition={{ type: "spring", stiffness: 250, damping: 20, mass: 1 }}
      />
    </>
  );
}
