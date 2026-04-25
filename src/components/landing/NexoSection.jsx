import { useRef, useEffect, useState } from "react";
import { TH } from "../../constants";
import { EASE, DARK_GRID, LIGHT_GRID, PAGE_LIGHT_BG } from "./theme";
import { useReveal } from "../../hooks/useReveal";
import { useMediaQuery } from "../../hooks/useMediaQuery";

const NEXO_SCROLL_PX = 420;

export default function NexoSection({ light, setLight }) {
  const wrapperRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [rA, sA] = useReveal(0, true);
  const [rB, sB] = useReveal(160, true);
  const isMobileLayout = useMediaQuery("(max-width: 767px)");

  useEffect(() => {
    const onScroll = () => {
      const el = wrapperRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (isMobileLayout) {
        const mobileLight = rect.top <= window.innerHeight * 0.45;
        setProgress(mobileLight ? 1 : 0);
        setLight(mobileLight);
        return;
      }
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / NEXO_SCROLL_PX));
      setProgress(p);
      setLight(p > 0.25);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMobileLayout, setLight]);

  const titleColor = light ? "#0a0a0a" : "#e4e4e4";
  const bd = light ? LIGHT_GRID : DARK_GRID;
  const CT = `background ${EASE}, border-color ${EASE}`;

  const rp = Math.max(0, Math.min(1, (progress - 0.05) / 0.95));
  const rightStyle = {
    opacity: rp,
    transform: `translateY(${(1 - rp) * 24}px)`,
  };

  if (isMobileLayout) {
    return (
      <section
        id="nexo"
        ref={wrapperRef}
        style={{
          background: light ? PAGE_LIGHT_BG : "#0a0a0a",
          borderTop: bd,
          borderLeft: bd,
          transition: CT,
        }}
      >
        <div
          ref={rA}
          style={{
            ...sA,
            padding: "32px 20px 28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: CT,
          }}
        >
          <h2
            className="section-title"
            style={{
              color: titleColor,
              lineHeight: 0.96,
              textAlign: "center",
              maxWidth: "16ch",
              margin: "0 auto",
              textWrap: "balance",
              transition: `color ${EASE}`,
            }}
          >
            A nosotros también nos incomodaba eso.
          </h2>
        </div>

        <div
          ref={rB}
          style={{
            ...sB,
            borderTop: bd,
            padding: "28px 20px 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: CT,
          }}
        >
          <h2
            className="section-title"
            style={{
              color: titleColor,
              lineHeight: 0.96,
              textAlign: "center",
              maxWidth: "16ch",
              margin: "0 auto",
              textWrap: "balance",
              transition: `color ${EASE}`,
            }}
          >
            Por eso decidimos hacerla <span style={{ color: "#ff3c54" }}>más clara.</span>
          </h2>
        </div>
      </section>
    );
  }

  return (
    <div
      ref={wrapperRef}
      style={{ height: `calc(100vh - ${TH}px + ${NEXO_SCROLL_PX}px)` }}
    >
      <section
        id="nexo"
        style={{
          position: "sticky",
          top: TH,
          height: `calc(100vh - ${TH}px)`,
          background: light ? PAGE_LIGHT_BG : "#0a0a0a",
          borderTop: bd,
          borderLeft: bd,
          display: "grid",
          gridTemplateRows: "1fr 1fr",
          alignItems: "stretch",
          transition: CT,
        }}
      >
        <div
          style={{
            borderBottom: bd,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "44px 48px",
            transition: CT,
          }}
        >
          <div ref={rA} style={sA}>
            <div style={{ opacity: 1 - rp * 0.65 }}>
              <h2
                className="section-title"
                style={{
                  color: titleColor,
                  lineHeight: 1.05,
                  textAlign: "center",
                  transition: `color ${EASE}`,
                }}
              >
                A nosotros también
                <br />
                nos incomodaba eso.
              </h2>
            </div>
          </div>
        </div>

        <div
          style={{
            ...rightStyle,
            ...sB,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "44px 48px",
            transition: `opacity ${EASE}, transform ${EASE}`,
          }}
        >
          <h2
            className="section-title"
            style={{
              color: titleColor,
              lineHeight: 1.05,
              textAlign: "center",
              transition: `color ${EASE}`,
            }}
          >
            Por eso decidimos
            <br />
            hacerla <span style={{ color: "#ff3c54" }}>más clara.</span>
          </h2>
        </div>
      </section>
    </div>
  );
}
