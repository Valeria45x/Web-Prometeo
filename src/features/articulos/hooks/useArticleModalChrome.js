import { useEffect } from "react";
import { getLenisInstance } from "@/lib/lenis";

function getFocusableElements(container) {
  return Array.from(
    container.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((element) => !element.hasAttribute("hidden"));
}

/**
 * "Cromado" del modal de artículo: bloquea el scroll del fondo, lo marca como
 * inert, atrapa el foco (Tab/Shift+Tab/Escape) y restaura todo al cerrar.
 */
export function useArticleModalChrome({
  panelRef,
  scrollRef,
  closeButtonRef,
  onClose,
  triggerRef,
  articleId,
}) {
  useEffect(() => {
    const panel = panelRef.current;
    const main = document.querySelector("#contenido-principal");
    const lenis = getLenisInstance();
    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    document.body.style.overflow = "hidden";
    if (main) main.inert = true;
    lenis?.stop();
    scrollRef.current?.scrollTo({ top: 0, behavior: "auto" });

    const focusFrame = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panel) return;

      const focusable = getFocusableElements(panel);
      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
      if (main) main.inert = false;
      lenis?.start();
      window.requestAnimationFrame(() => {
        triggerRef.current?.focus();
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articleId, onClose, triggerRef]);
}
