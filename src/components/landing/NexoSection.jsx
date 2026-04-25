import { useRef, useEffect, useState } from "react";
import { TH } from "../../constants";
import { EASE, DARK_GRID, LIGHT_GRID, PAGE_LIGHT_BG } from "./theme";
import { useReveal } from "../../hooks/useReveal";
import { useMediaQuery } from "../../hooks/useMediaQuery";

const NEXO_SCROLL_PX = 420;
const NEXO_MOBILE_SCROLL_PX = 240;

export default function NexoSection({ light, setLight }) {
  const wrapperRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [rA, sA] = useReveal(0, true);
  const [rB, sB] = useReveal(160, true);
  const isMobileLayout = useMediaQuery("(max-width: 767px)");
  const scrollDistance = isMobileLayout ? NEXO_MOBILE_SCROLL_PX : NEXO_SCROLL_PX;

  useEffect(() => {
    const onScroll = () => {
      const el = wrapperRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / scrollDistance));
      setProgress(p);
      setLight(p > 0.25);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollDistance, setLight]);

  const titleColor = light ? "#0a0a0a" : "#e4e4e4";
  const bd = light ? LIGHT_GRID : DARK_GRID;
  const CT = `background ${EASE}, border-color ${EASE}`;

  const rp = Math.max(0, Math.min(1, (progress - 0.05) / 0.95));
  const rightStyle = {
    opacity: rp,
    transform: `translateY(${(1 - rp) * 24}px)`,
  };

  return (
    <div
      ref={wrapperRef}
      style={{ height: `calc(100svh - ${TH}px + ${scrollDistance}px)` }}
    >
      <section
        id="nexo"
        style={{
          position: "sticky",
          top: TH,
          height: `calc(100svh - ${TH}px)`,
          background: light ? PAGE_LIGHT_BG : "#0a0a0a",
          borderTop: bd,
          borderLeft: bd,
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
            padding: isMobileLayout ? "28px 20px" : "44px 48px",
            transition: CT,
          }}
        >
          <div ref={rA} style={sA}>
            <div style={{ opacity: 1 - rp * 0.65 }}>
              <h2
                className="section-title"
                style={{
                  color: titleColor,
                  lineHeight: isMobileLayout ? 0.96 : 1.05,
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
            padding: isMobileLayout ? "28px 20px" : "44px 48px",
            transition: `opacity ${EASE}, transform ${EASE}`,
          }}
        >
          <div ref={rB} style={sB}>
            <h2
              className="section-title"
              style={{
                color: titleColor,
                lineHeight: isMobileLayout ? 0.96 : 1.05,
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
                  <span style={{ color: "#ff3c54" }}>más clara.</span>
                </>
              ) : (
                <>
                  Por eso decidimos
                  <br />
                  hacerla <span style={{ color: "#ff3c54" }}>más clara.</span>
                </>
              )}
            </h2>
          </div>
        </div>
      </section>
    </div>
  );
}
