import { useEffect, useRef, useState } from "react";
import { TH } from "../constants";

export function useLandingFooterReveal(isMobile) {
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (isMobile) {
      setContentHeight(0);
      return undefined;
    }

    const contentElement = contentRef.current;
    if (!contentElement) return undefined;

    const updateContentHeight = () => {
      setContentHeight(contentElement.scrollHeight);
    };

    updateContentHeight();

    const observer = new ResizeObserver(() => {
      updateContentHeight();
    });

    observer.observe(contentElement);
    window.addEventListener("resize", updateContentHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateContentHeight);
    };
  }, [isMobile]);

  const viewportHeight = typeof window === "undefined" ? 0 : window.innerHeight;
  const footerWrapperHeight =
    contentHeight > 0
      ? contentHeight + viewportHeight - TH
      : `calc(200svh - ${TH}px)`;

  return {
    contentRef,
    footerWrapperHeight,
  };
}
