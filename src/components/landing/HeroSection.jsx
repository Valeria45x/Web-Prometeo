import { useRef } from "react";
import { TH } from "../../constants";
import { FONTS } from "../../design/tokens";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useReveal } from "../../hooks/useReveal";

export default function HeroSection() {
  const wrapperRef = useRef(null);
  const [rHero, sHero] = useReveal(0, true);
  const [rSubtitle, sSubtitle] = useReveal(160, true);
  const isMobileLayout = useMediaQuery("(max-width: 767px)");

  return (
    <div
      ref={wrapperRef}
      className="landing-hero"
      style={{ height: `calc(100vh - ${TH}px)` }}
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
                color: "#fcfcfc",
                fontFamily: FONTS.sans,
                whiteSpace: "nowrap",
                lineHeight: "32px",
                margin: 0,
                fontSize: isMobileLayout
                  ? "16px"
                  : undefined,
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
