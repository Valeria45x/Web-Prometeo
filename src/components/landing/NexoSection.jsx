import { useRef, useEffect, useState } from "react";
import { TH } from "../../constants";
import { COLORS, FONTS } from "../../design/tokens";
import { EASE, DARK_GRID, LIGHT_GRID, PAGE_LIGHT_BG } from "./theme";
import { useReveal } from "../../hooks/useReveal";
import { useMediaQuery } from "../../hooks/useMediaQuery";

const NEXO_SCROLL_PX = 256;
const NEXO_MOBILE_SCROLL_PX = 128;

export default function NexoSection({ light, setLight }) {
  const wrapperRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [rA, sA] = useReveal(0, false);
  const [rB, sB] = useReveal(160, false);
  const isMobileLayout = useMediaQuery("(max-width: 767px)");
  const scrollDistance = isMobileLayout ? NEXO_MOBILE_SCROLL_PX : NEXO_SCROLL_PX;

  useEffect(() => {
    let frame = 0;
    let restoreTimers = [];
    let lastP = -1;
    let lastLight = null;

    const syncShell = () => {
      frame = 0;
      const el = wrapperRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();

      let p;
      if (rect.top > window.innerHeight) {
        p = 0;
      } else if (rect.bottom <= 0) {
        p = 1;
      } else {
        const scrolled = Math.max(0, -rect.top);
        p = Math.max(0, Math.min(1, scrolled / scrollDistance));
      }

      const nextLight = p > 0.25;
      if (p !== lastP) { lastP = p; setProgress(p); }
      if (nextLight !== lastLight) { lastLight = nextLight; setLight(nextLight); }
    };

    const scheduleSync = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(syncShell);
    };

    syncShell();
    window.requestAnimationFrame(syncShell);
    restoreTimers = [0, 80, 180, 420, 800].map((delay) =>
      window.setTimeout(syncShell, delay),
    );

    window.addEventListener("scroll", scheduleSync, { passive: true });
    window.addEventListener("resize", scheduleSync);
    window.addEventListener("pageshow", scheduleSync);
    window.addEventListener("load", scheduleSync);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      restoreTimers.forEach((timer) => window.clearTimeout(timer));
      window.removeEventListener("scroll", scheduleSync);
      window.removeEventListener("resize", scheduleSync);
      window.removeEventListener("pageshow", scheduleSync);
      window.removeEventListener("load", scheduleSync);
    };
  }, [scrollDistance, setLight]);

  const titleColor = light ? "#050505" : "#fcfcfc";
  const accentTextColor = titleColor;
  const bd = light ? LIGHT_GRID : DARK_GRID;
  const CT = `background ${EASE}`;
  const headingSize = isMobileLayout ? 28 : 48;
  const headingLine = isMobileLayout ? "32px" : "56px";

  const rp = Math.max(0, Math.min(1, (progress - 0.05) / 0.95));
  const rightStyle = {
    opacity: rp,
    transform: `translateY(${(1 - rp) * 32}px)`,
  };

  return (
    <div
      ref={wrapperRef}
      style={{
        height: `calc(100svh - ${TH}px + ${scrollDistance}px)`,
        borderTop: bd,
      }}
    >
      <section
        id="nexo"
        style={{
          position: "sticky",
          top: TH,
          height: `calc(100svh - ${TH}px)`,
          background: light ? PAGE_LIGHT_BG : "#050505",
          display: "grid",
          gridTemplateRows: "1fr 1fr",
          alignItems: "stretch",
          overflow: "hidden",
          transition: CT,
        }}
      >
        <div
          style={{
            borderBottom: bd,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: isMobileLayout ? "32px 16px" : "64px",
            transition: CT,
          }}
        >
          <div ref={rA} style={sA}>
            <div style={{ opacity: 1 - rp * 0.65 }}>
              <h2
                className="section-title"
                style={{
                  fontFamily: FONTS.sans,
                  color: titleColor,
                  fontSize: headingSize,
                  lineHeight: headingLine,
                  textAlign: "center",
                  maxWidth: isMobileLayout ? "16ch" : "none",
                  margin: 0,
                  textWrap: isMobileLayout ? "balance" : undefined,
                  transition: `color ${EASE}`,
                }}
              >
                {isMobileLayout ? (
                  "A nosotros también nos incomodaba eso."
                ) : (
                  <>
                    A nosotros también
                    <br />
                    nos incomodaba eso.
                  </>
                )}
              </h2>
            </div>
          </div>
        </div>

        <div
          style={{
            ...rightStyle,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: isMobileLayout ? "32px 16px" : "64px",
            transition: `opacity ${EASE}, transform ${EASE}`,
          }}
        >
          <div ref={rB} style={sB}>
            <h2
              className="section-title"
              style={{
                fontFamily: FONTS.sans,
                color: titleColor,
                fontSize: headingSize,
                lineHeight: headingLine,
                textAlign: "center",
                maxWidth: isMobileLayout ? "16ch" : "none",
                margin: 0,
                textWrap: isMobileLayout ? "balance" : undefined,
                transition: `color ${EASE}`,
              }}
            >
              {isMobileLayout ? (
                <>
                  Por eso decidimos hacerla{" "}
                  <span style={{ color: COLORS.accent, fontFamily: FONTS.display }}>más clara.</span>
                </>
              ) : (
                <>
                  Por eso decidimos
                  <br />
                  hacerla <span style={{ color: COLORS.accent, fontFamily: FONTS.display }}>más clara.</span>
                </>
              )}
            </h2>
          </div>
        </div>
      </section>
    </div>
  );
}
