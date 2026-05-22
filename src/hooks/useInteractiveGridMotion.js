import { useEffect, useRef } from "react";
import { GRID_SYSTEM } from "../design/gridSystem";

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export function useInteractiveGridMotion() {
  const containerRef = useRef(null);
  const frameRef = useRef(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return undefined;

    const { maxShift, lerp } = GRID_SYSTEM.interactive;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const writeMotionVariables = () => {
      const current = currentRef.current;

      node.style.setProperty("--interactive-grid-x", `${current.x}px`);
      node.style.setProperty("--interactive-grid-y", `${current.y}px`);
      node.style.setProperty("--interactive-grid-x-soft", `${current.x * 0.5}px`);
      node.style.setProperty("--interactive-grid-y-soft", `${current.y * 0.5}px`);
    };

    const animate = () => {
      const current = currentRef.current;
      const target = targetRef.current;

      current.x += (target.x - current.x) * lerp;
      current.y += (target.y - current.y) * lerp;
      writeMotionVariables();

      frameRef.current = window.requestAnimationFrame(animate);
    };

    const moveTarget = (event) => {
      const rect = node.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const x = ((event.clientX - centerX) / (rect.width / 2)) * maxShift;
      const y = ((event.clientY - centerY) / (rect.height / 2)) * maxShift;

      targetRef.current.x = clamp(x, -maxShift, maxShift);
      targetRef.current.y = clamp(y, -maxShift, maxShift);

      if (reducedMotion.matches) {
        currentRef.current = { ...targetRef.current };
        writeMotionVariables();
      }
    };

    const resetTarget = () => {
      targetRef.current = { x: 0, y: 0 };

      if (reducedMotion.matches) {
        currentRef.current = { x: 0, y: 0 };
        writeMotionVariables();
      }
    };

    node.addEventListener("pointermove", moveTarget);
    node.addEventListener("pointerleave", resetTarget);
    writeMotionVariables();

    if (!reducedMotion.matches) {
      frameRef.current = window.requestAnimationFrame(animate);
    }

    return () => {
      node.removeEventListener("pointermove", moveTarget);
      node.removeEventListener("pointerleave", resetTarget);

      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return containerRef;
}
