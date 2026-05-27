import { useEffect, useRef, useState } from "react";
import {
  PROMETEO_MOVES,
  PROMETEO_SCROLL_MOTION,
} from "./prometeoScroll.config";
import { clamp, getNavbarDividerX } from "./prometeoScroll.utils";

const MOVE_SWAP_MS = PROMETEO_SCROLL_MOTION.swapMs;
const MOVE_ENTER_DELAY_MS = PROMETEO_SCROLL_MOTION.enterDelayMs;

export function usePrometeoScrollScene() {
  const scrollRef = useRef(null);
  const stageRef = useRef(null);
  const explainRef = useRef(null);
  const solutionMetaRef = useRef(null);
  const frameRef = useRef(0);
  const timerRef = useRef(null);
  const enterTimerRef = useRef(null);
  const solutionTimerRef = useRef(null);

  const [state, setState] = useState({
    progress: 0,
    explainProgress: 0,
    stageDividerX: null,
    stageWidth: 0,
    stageHeight: 0,
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const [moveVisible, setMoveVisible] = useState(true);
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
      if (explain) {
        const explainRect = explain.getBoundingClientRect();
        const explainRange = Math.max(1, explainRect.height - window.innerHeight);
        explainProgress = clamp(-explainRect.top / explainRange, 0, 1);
      }

      setState({
        progress: rawProgress,
        explainProgress,
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
  const targetIndex = Math.min(
    Math.floor(state.explainProgress * total),
    total - 1,
  );

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (enterTimerRef.current) {
      clearTimeout(enterTimerRef.current);
      enterTimerRef.current = null;
    }

    if (targetIndex === activeIndex) {
      setMoveVisible(true);
      return undefined;
    }

    setMoveVisible(false);
    if (PROMETEO_MOVES[targetIndex]?.image) {
      const image = new Image();
      image.src = PROMETEO_MOVES[targetIndex].image;
      image.decode?.().catch(() => {});
    }

    timerRef.current = setTimeout(() => {
      setActiveIndex(targetIndex);
      enterTimerRef.current = setTimeout(() => {
        setMoveVisible(true);
        enterTimerRef.current = null;
      }, MOVE_ENTER_DELAY_MS);
      timerRef.current = null;
    }, MOVE_SWAP_MS);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      if (enterTimerRef.current) {
        clearTimeout(enterTimerRef.current);
        enterTimerRef.current = null;
      }
    };
  }, [activeIndex, targetIndex]);

  return {
    scrollRef,
    stageRef,
    explainRef,
    solutionMetaRef,
    state,
    total,
    activeIndex,
    activeMove: PROMETEO_MOVES[activeIndex],
    moveVisible,
    solutionScrambleActive,
    moveStageDividerX,
    setMoveStageDividerX,
  };
}