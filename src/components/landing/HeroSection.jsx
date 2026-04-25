import { useRef, useEffect, useState } from "react";
import { TH } from "../../constants";
import { DARK_GRID, PAGE_WHITE } from "./theme";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useReveal } from "../../hooks/useReveal";

const HERO_FILL_PX = 500;

export default function HeroSection() {
  const wrapperRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [rHero, sHero] = useReveal(0, true);
  const [rSubtitle, sSubtitle] = useReveal(160, true);
  const isMobileLayout = useMediaQuery("(max-width: 767px)");
  const bd = DARK_GRID;
  const fillDistance = isMobileLayout ? 180 : HERO_FILL_PX;

  useEffect(() => {
    const onScroll = () => {
      const el = wrapperRef.current;
      if (!el) return;
      const scrolled = -el.getBoundingClientRect().top;
      setProgress(Math.max(0, Math.min(1, scrolled / fillDistance)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [fillDistance]);

  const clipRight = `${((1 - progress) * 100).toFixed(1)}%`;

  return (
    <div
      ref={wrapperRef}
      style={{ height: `calc(100vh - ${TH}px + ${fillDistance}px)` }}
    >
      <section
        style={{
          position: "sticky",
          top: TH,
          height: `calc(100vh - ${TH}px)`,
          borderLeft: bd,
          background: "#0a0a0a",
          display: "flex",
          flexDirection: "column",
          padding: isMobileLayout ? "36px 20px 32px" : "48px 36px 44px",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
          }}
        >
          <div ref={rHero} style={{ ...sHero, width: "100%" }}>
            <h2
              id="hero-title"
              className="mega-title"
              style={{
                color: PAGE_WHITE,
                textAlign: "center",
                lineHeight: 1.02,
                width: "100%",
                margin: 0,
              }}
            >
              PROMETEO
            </h2>
          </div>

          <div
            ref={rSubtitle}
            style={{
              ...sSubtitle,
              position: "relative",
              textAlign: "center",
              display: "inline-block",
              width: "auto",
              maxWidth: "100%",
              paddingBottom: "0.12em",
              overflow: "visible",
              margin: "0 auto",
            }}
          >
            <h1
              className="sub-title"
              style={{
                color: "#8a8a8a",
                whiteSpace: "nowrap",
                lineHeight: 1.05,
                margin: 0,
                fontSize: isMobileLayout ? "clamp(0.82rem, 4vw, 1rem)" : undefined,
              }}
            >
              Privacidad digital que se entiende.
            </h1>
            <h1
              aria-hidden="true"
              className="sub-title"
              style={{
                position: "absolute",
                inset: 0,
                color: "#ff3c54",
                whiteSpace: "nowrap",
                lineHeight: 1.05,
                clipPath: `inset(0 ${clipRight} 0 0)`,
                margin: 0,
                fontSize: isMobileLayout ? "clamp(0.82rem, 4vw, 1rem)" : undefined,
              }}
            >
              Privacidad digital que se entiende.
            </h1>
          </div>
        </div>
      </section>
    </div>
  );
}
