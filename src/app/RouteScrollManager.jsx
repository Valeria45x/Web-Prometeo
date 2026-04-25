import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollToTopImmediate } from "../lib/lenis";

export default function RouteScrollManager() {
  const location = useLocation();

  useLayoutEffect(() => {
    if (location.state?.preserveScroll) return;

    scrollToTopImmediate();
  }, [location.key]);

  return null;
}
