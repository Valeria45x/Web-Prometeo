import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  PROMETEO_MOVES,
  PROMETEO_SCROLL_MOTION,
} from "@/features/landing/sections/scroll/prometeoScroll.config";
import {
  clamp,
  getNavbarDividerX,
} from "@/features/landing/sections/scroll/prometeoScroll.utils";

const MOVE_SWAP_MS = PROMETEO_SCROLL_MOTION.swapMs;
const MOVE_ENTER_DELAY_MS = PROMETEO_SCROLL_MOTION.enterDelayMs;
const MOVE_EXIT_MS = PROMETEO_SCROLL_MOTION.exitMs ?? MOVE_SWAP_MS;
const MOVE_MIN_READ_MS = PROMETEO_SCROLL_MOTION.minReadMs ?? 1120;
const FIRST_MOVE_ENTER_DELAY_MS = 220;

function clearTimer(timerRef) {
  if (timerRef.current) {
    clearTimeout(timerRef.current);
    timerRef.current = null;
  }
}

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
  const timerRef = useRef(null);
  const enterTimerRef = useRef(null);
  const exitTimerRef = useRef(null);
  const solutionTimerRef = useRef(null);
  const visibleSinceRef = useRef(0);
  const wasMoveRevealReadyRef = useRef(false);

  const [state, setState] = useState({
    progress: 0,
    explainProgress: 0,
    moveRevealReady: false,
    stageDividerX: null,
    stageWidth: 0,
    stageHeight: 0,
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const [moveVisible, setMoveVisible] = useState(false);
  const [pendingIndex, setPendingIndex] = useState(null);
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
  const targetIndex = Math.min(
    Math.floor(state.explainProgress * total),
    total - 1,
  );

  useLayoutEffect(() => {
    const wasMoveRevealReady = wasMoveRevealReadyRef.current;
    wasMoveRevealReadyRef.current = state.moveRevealReady;

    if (
      !state.moveRevealReady ||
      wasMoveRevealReady ||
      targetIndex === activeIndex
    ) {
      return;
    }

    // The scene may re-enter after being left on another pillar. Sync before
    // reveal so the user never lands on stale content.
    clearTimer(timerRef);
    clearTimer(enterTimerRef);
    clearTimer(exitTimerRef);
    visibleSinceRef.current = 0;
    setPendingIndex(null);
    setMoveVisible(false);
    setActiveIndex(targetIndex);
  }, [activeIndex, state.moveRevealReady, targetIndex]);

  useEffect(() => {
    if (pendingIndex == null) return undefined;

    clearTimer(exitTimerRef);

    exitTimerRef.current = setTimeout(() => {
      setActiveIndex(pendingIndex);
      setPendingIndex(null);
      exitTimerRef.current = null;
    }, MOVE_EXIT_MS);

    return () => {
      clearTimer(exitTimerRef);
    };
  }, [pendingIndex]);

  useEffect(() => {
    const clearMoveTimers = () => {
      clearTimer(timerRef);
      clearTimer(enterTimerRef);
    };

    const revealCurrentMove = (delay) => {
      setMoveRevealKey((current) => current + 1);
      enterTimerRef.current = setTimeout(() => {
        visibleSinceRef.current = performance.now();
        setMoveVisible(true);
        enterTimerRef.current = null;
      }, delay);
    };

    clearMoveTimers();

    if (!state.moveRevealReady) {
      visibleSinceRef.current = 0;
      if (pendingIndex != null) setPendingIndex(null);
      if (activeIndex !== targetIndex) setActiveIndex(targetIndex);
      setMoveVisible(false);
      return undefined;
    }

    if (pendingIndex != null) {
      return clearMoveTimers;
    }

    if (targetIndex === activeIndex) {
      if (!moveVisible) {
        const enterDelay =
          activeIndex === 0 ? FIRST_MOVE_ENTER_DELAY_MS : MOVE_ENTER_DELAY_MS;
        revealCurrentMove(enterDelay);
      }

      return clearMoveTimers;
    }

    if (!moveVisible) {
      if (targetIndex !== activeIndex) {
        visibleSinceRef.current = 0;
        setActiveIndex(targetIndex);
        return clearMoveTimers;
      }

      const enterDelay =
        activeIndex === 0 ? FIRST_MOVE_ENTER_DELAY_MS : MOVE_ENTER_DELAY_MS;
      revealCurrentMove(enterDelay);
      return clearMoveTimers;
    }

    const direction = targetIndex > activeIndex ? 1 : -1;
    const nextIndex = activeIndex + direction;
    const visibleAge = visibleSinceRef.current
      ? performance.now() - visibleSinceRef.current
      : 0;
    const readWait = Math.max(0, MOVE_MIN_READ_MS - visibleAge);

    if (PROMETEO_MOVES[nextIndex]?.image) {
      const image = new Image();
      image.src = PROMETEO_MOVES[nextIndex].image;
      image.decode?.().catch(() => {});
    }

    timerRef.current = setTimeout(() => {
      setPendingIndex(nextIndex);
      setMoveVisible(false);
      visibleSinceRef.current = 0;
      timerRef.current = null;
    }, readWait);

    return clearMoveTimers;
  }, [
    activeIndex,
    moveVisible,
    pendingIndex,
    state.moveRevealReady,
    targetIndex,
  ]);

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
    moveVisible,
    moveRevealKey,
    solutionScrambleActive,
    moveStageDividerX,
    setMoveStageDividerX,
  };
}
