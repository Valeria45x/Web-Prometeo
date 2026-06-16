import { useEffect, useRef, useState } from "react";
import { PROMETEO_MOVES } from "@/features/landing/sections/scroll/prometeoScroll.config";
import {
  clamp,
  getNavbarDividerX,
} from "@/features/landing/sections/scroll/prometeoScroll.utils";

function isExplainRevealReady(rect) {
  const viewportHeight =
    window.innerHeight || document.documentElement.clientHeight || 0;

  if (!viewportHeight) return false;

  return (
    rect.top <= viewportHeight * 0.7 && rect.bottom >= viewportHeight * 0.24
  );
}

function isMoveTextInView(rect) {
  const viewportHeight =
    window.innerHeight || document.documentElement.clientHeight || 0;
  const viewportWidth =
    window.innerWidth || document.documentElement.clientWidth || 0;

  if (!viewportHeight || !viewportWidth) return false;
  if (rect.width === 0 && rect.height === 0) return false;

  return (
    rect.bottom > 0 &&
    rect.right > 0 &&
    rect.left < viewportWidth &&
    rect.top < viewportHeight
  );
}

export function usePrometeoScrollScene() {
  const scrollRef = useRef(null);
  const stageRef = useRef(null);
  const explainRef = useRef(null);
  const moveTextRef = useRef(null);
  const solutionMetaRef = useRef(null);
  const frameRef = useRef(0);
  const solutionTimerRef = useRef(null);

  const [state, setState] = useState({
    progress: 0,
    explainProgress: 0,
    moveRevealReady: false,
    stageDividerX: null,
    stageWidth: 0,
    stageHeight: 0,
  });
  const [solutionScrambleActive, setSolutionScrambleActive] = useState(false);
  const [moveStageDividerX, setMoveStageDividerX] = useState(null);

  useEffect(() => {
    const section = scrollRef.current;
    const stage = stageRef.current;
    const explain = explainRef.current;
    if (!section || !stage) return undefined;

    let requestUpdate = () => {};

    const update = () => {
      frameRef.current = 0;

      const sectionRect = section.getBoundingClientRect();
      const stageRect = stage.getBoundingClientRect();
      const scrollRange = Math.max(1, sectionRect.height - window.innerHeight);
      const rawProgress = clamp(-sectionRect.top / scrollRange, 0, 1);
      const stageDividerX = getNavbarDividerX(stageRect.left);

      let explainProgress = 0;
      let moveRevealReady = false;
      if (explain) {
        const explainRect = explain.getBoundingClientRect();
        const explainRange = Math.max(
          1,
          explainRect.height - window.innerHeight,
        );
        explainProgress = clamp(-explainRect.top / explainRange, 0, 1);
        moveRevealReady = isExplainRevealReady(explainRect);
      }

      const moveText = moveTextRef.current;
      if (moveText) {
        moveRevealReady = isMoveTextInView(moveText.getBoundingClientRect());
      }

      setState({
        progress: rawProgress,
        explainProgress,
        moveRevealReady,
        stageDividerX,
        stageWidth: stageRect.width,
        stageHeight: stageRect.height,
      });
    };

    requestUpdate = () => {
      if (frameRef.current) return;
      frameRef.current = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
    };
  }, []);

  useEffect(() => {
    const meta = solutionMetaRef.current;
    if (!meta) return undefined;

    const reset = () => {
      if (solutionTimerRef.current) {
        clearTimeout(solutionTimerRef.current);
        solutionTimerRef.current = null;
      }
      setSolutionScrambleActive(false);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.8) {
          if (solutionTimerRef.current) return;
          setSolutionScrambleActive(false);
          solutionTimerRef.current = setTimeout(() => {
            setSolutionScrambleActive(true);
            solutionTimerRef.current = null;
          }, 360);
        } else if (!entry.isIntersecting) {
          reset();
        }
      },
      { threshold: [0, 0.8, 1] },
    );

    observer.observe(meta);

    return () => {
      observer.disconnect();
      reset();
    };
  }, []);

  const total = PROMETEO_MOVES.length;
  const activeIndex = Math.min(
    Math.max(Math.floor(state.explainProgress * total), 0),
    total - 1,
  );

  return {
    scrollRef,
    stageRef,
    explainRef,
    moveTextRef,
    solutionMetaRef,
    state,
    total,
    activeIndex,
    activeMove: PROMETEO_MOVES[activeIndex],
    moveVisible: state.moveRevealReady,
    solutionScrambleActive,
    moveStageDividerX,
    setMoveStageDividerX,
  };
}
