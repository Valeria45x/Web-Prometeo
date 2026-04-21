import { useRef, useEffect, useState } from "react";
import { TH } from "../../constants";
import { DARK_GRID, PAGE_WHITE } from "./theme";

const HERO_FILL_PX = 500;

export default function HeroSection() {
  const wrapperRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const bd = DARK_GRID;

  useEffect(() => {
    const onScroll = () => {
      const el = wrapperRef.current;
      if (!el) return;
      const scrolled = -el.getBoundingClientRect().top;
      setProgress(Math.max(0, Math.min(1, scrolled / HERO_FILL_PX)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const clipRight = `${((1 - progress) * 100).toFixed(1)}%`;

  return (
    <div
      ref={wrapperRef}
      style={{ height: `calc(100vh - ${TH}px + ${HERO_FILL_PX}px)` }}
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
          padding: "48px 36px 44px",
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
          <h2
            id="hero-title"
            className="mega-title"
            style={{ color: PAGE_WHITE, textAlign: "center", lineHeight: 1.05 }}
          >
            PROMETEO
          </h2>

          <div
            style={{
              position: "relative",
              textAlign: "center",
              display: "inline-block",
              paddingBottom: "0.12em",
              overflow: "visible",
            }}
          >
            <h1
              className="sub-title"
              style={{
                color: "#8a8a8a",
                whiteSpace: "nowrap",
                lineHeight: 1.05,
                margin: 0,
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
