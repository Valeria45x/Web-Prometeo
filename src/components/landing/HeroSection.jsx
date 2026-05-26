import { useEffect, useRef, useState } from "react";
import { TH } from "../../constants";
import { COLORS, FONTS } from "../../design/tokens";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useReveal } from "../../hooks/useReveal";

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function smoothstep(value) {
  const x = clamp(value, 0, 1);
  return x * x * (3 - 2 * x);
}

export default function HeroSection() {
  const wrapperRef = useRef(null);
  const frameRef = useRef(0);
  const [rHero, sHero] = useReveal(0, true);
  const [rSubtitle, sSubtitle] = useReveal(160, true);
  const [subtitleFillProgress, setSubtitleFillProgress] = useState(0);
  const isMobileLayout = useMediaQuery("(max-width: 767px)");
  const heroWrapperHeight = isMobileLayout
    ? `calc(150vh - ${TH}px)`
    : `calc(165vh - ${TH}px)`;

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return undefined;

    const update = () => {
      frameRef.current = 0;
      const rect = wrapper.getBoundingClientRect();
      const stickyHeight = window.innerHeight - TH;
      const scrollRange = Math.max(1, rect.height - stickyHeight);
      const rawProgress = clamp((TH - rect.top) / scrollRange, 0, 1);
      setSubtitleFillProgress(smoothstep(rawProgress));
    };

    const requestUpdate = () => {
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

  const subtitleFillStop = `${(subtitleFillProgress * 100).toFixed(2)}%`;

  return (
    <div
      ref={wrapperRef}
      className="landing-hero"
      style={{ height: heroWrapperHeight }}
    >
      <section
        style={{
          position: "sticky",
          top: TH,
          height: `calc(100vh - ${TH}px)`,
          background: "#050505",
          display: "flex",
          flexDirection: "column",
          padding: isMobileLayout ? "32px 16px" : "64px 32px",
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
                color: "#fcfcfc",
                textAlign: "center",
                lineHeight: isMobileLayout ? "64px" : "128px",
                width: "100%",
                margin: 0,
              }}
            >
              Prometeo
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
              paddingBottom: "8px",
              overflow: "visible",
              margin: "0 auto",
            }}
          >
            <h1
              className="sub-title"
              style={{
                fontFamily: FONTS.sans,
                whiteSpace: "nowrap",
                lineHeight: "32px",
                margin: 0,
                backgroundImage: `linear-gradient(90deg, ${COLORS.accent} 0%, ${COLORS.accent} ${subtitleFillStop}, #fcfcfc ${subtitleFillStop}, #fcfcfc 100%)`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
                fontSize: isMobileLayout ? "16px" : undefined,
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
