import { useEffect, useRef, useState } from "react";
import {
  PROMETEO_MOVES,
  PROMETEO_SCROLL_MOTION,
} from "./prometeoScroll.config";
import { clamp, getNavbarDividerX } from "./prometeoScroll.utils";

const MOVE_SWAP_MS = PROMETEO_SCROLL_MOTION.swapMs;
const MOVE_ENTER_DELAY_MS = PROMETEO_SCROLL_MOTION.enterDelayMs;
const FIRST_MOVE_ENTER_DELAY_MS = 220;

function isExplainRevealReady(rect) {
  const viewportHeight =
    window.innerHeight || document.documentElement.clientHeight || 0;

  if (!viewportHeight) return false;

  return (
    rect.top <= viewportHeight * 0.7 && rect.bottom >= viewportHeight * 0.24
  );
}

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
    explainRevealReady: false,
    stageDividerX: null,
    stageWidth: 0,
    stageHeight: 0,
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const [moveVisible, setMoveVisible] = useState(false);
  const [solutionScrambleActive, setSolutionScrambleActive] = useState(false);
  const [moveStageDividerX, setMoveStageDividerX] = useState(null);
  const [moveRevealKey, setMoveRevealKey] = useState(0);

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
      let explainRevealReady = false;
      if (explain) {
        const explainRect = explain.getBoundingClientRect();
        const explainRange = Math.max(
          1,
          explainRect.height - window.innerHeight,
        );
        explainProgress = clamp(-explainRect.top / explainRange, 0, 1);
        explainRevealReady = isExplainRevealReady(explainRect);
      }

      setState({
        progress: rawProgress,
        explainProgress,
        explainRevealReady,
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
      if (!state.explainRevealReady) {
        setMoveVisible(false);
        return undefined;
      }

      if (!moveVisible) {
        const enterDelay =
          activeIndex === 0 ? FIRST_MOVE_ENTER_DELAY_MS : MOVE_ENTER_DELAY_MS;
        setMoveRevealKey((current) => current + 1);
        enterTimerRef.current = setTimeout(() => {
          setMoveVisible(true);
          enterTimerRef.current = null;
        }, enterDelay);
      }

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
  }, [activeIndex, moveVisible, state.explainRevealReady, targetIndex]);

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
    moveRevealKey,
    solutionScrambleActive,
    moveStageDividerX,
    setMoveStageDividerX,
  };
}
