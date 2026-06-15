import { useEffect, useState } from "react";

/**
 * Sigue la lectura del modal: barra de progreso, sección activa en el mapa y
 * si el título debe aparecer en la barra superior.
 */
export function useReadingProgress({
  scrollRef,
  titleRef,
  sectionRefs,
  readingSections,
  articleId,
}) {
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [showToolbarTitle, setShowToolbarTitle] = useState(false);

  useEffect(() => {
    sectionRefs.current = [];
  }, [articleId, sectionRefs]);

  useEffect(() => {
    const scrollNode = scrollRef.current;
    if (!scrollNode) return undefined;

    function updateReadingState() {
      const maxScroll = scrollNode.scrollHeight - scrollNode.clientHeight;
      const nextProgress = maxScroll > 0 ? scrollNode.scrollTop / maxScroll : 0;
      const scrollBounds = scrollNode.getBoundingClientRect();
      const isAtEnd =
        scrollNode.scrollTop + scrollNode.clientHeight >=
        scrollNode.scrollHeight - 4;
      let nextActiveSection = 0;
      let greatestVisibleArea = 0;

      sectionRefs.current.forEach((sectionNode, index) => {
        if (!sectionNode) return;
        const sectionBounds = sectionNode.getBoundingClientRect();
        const visibleArea = Math.max(
          0,
          Math.min(sectionBounds.bottom, scrollBounds.bottom) -
            Math.max(sectionBounds.top, scrollBounds.top),
        );

        if (visibleArea > greatestVisibleArea) {
          greatestVisibleArea = visibleArea;
          nextActiveSection = index;
        }
      });

      if (isAtEnd) {
        nextActiveSection = readingSections.length - 1;
      }

      const titleBounds = titleRef.current?.getBoundingClientRect();
      const nextShowToolbarTitle = titleBounds
        ? titleBounds.bottom <= scrollBounds.top + 16
        : false;

      setReadingProgress(nextProgress);
      setActiveSectionIndex(nextActiveSection);
      setShowToolbarTitle(nextShowToolbarTitle);
    }

    updateReadingState();
    scrollNode.addEventListener("scroll", updateReadingState, { passive: true });
    window.addEventListener("resize", updateReadingState);

    return () => {
      scrollNode.removeEventListener("scroll", updateReadingState);
      window.removeEventListener("resize", updateReadingState);
    };
  }, [readingSections, scrollRef, sectionRefs, titleRef]);

  return { readingProgress, activeSectionIndex, showToolbarTitle };
}
