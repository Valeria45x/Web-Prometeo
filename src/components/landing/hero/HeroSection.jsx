import { TH } from "../../../constants";
import { FONTS } from "../../../design/tokens";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import { useReveal } from "../../../hooks/useReveal";
import { HERO_COPY, HERO_LAYOUT } from "./hero.content";
import { useHeroSubtitleFill } from "./useHeroSubtitleFill";

export default function HeroSection() {
  const [rHero, sHero] = useReveal(0, false);
  const [rSubtitle, sSubtitle] = useReveal(160, false);
  const isPhoneLayout = useMediaQuery("(max-width: 767px)");
  const isTabletLayout = useMediaQuery(
    "(min-width: 768px) and (max-width: 1024px)",
  );
  const isCompactLayout = isPhoneLayout || isTabletLayout;
  const { wrapperRef, heroWrapperHeight, subtitleBackgroundImage } =
    useHeroSubtitleFill({ isPhoneLayout, isTabletLayout });

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
          background: HERO_LAYOUT.background,
          display: "flex",
          flexDirection: "column",
          padding: isPhoneLayout
            ? HERO_LAYOUT.padding.mobile
            : isTabletLayout
              ? HERO_LAYOUT.padding.tablet
              : HERO_LAYOUT.padding.desktop,
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: isCompactLayout ? 12 : 16,
          }}
        >
          <div ref={rHero} style={{ ...sHero, width: "100%" }}>
            <h2
              id="hero-title"
              className="mega-title"
              style={{
                color: "#fcfcfc",
                textAlign: "center",
                lineHeight: isPhoneLayout
                  ? HERO_LAYOUT.titleLineHeight.mobile
                  : isTabletLayout
                    ? HERO_LAYOUT.titleLineHeight.tablet
                    : HERO_LAYOUT.titleLineHeight.desktop,
                width: "100%",
                margin: 0,
              }}
            >
              {HERO_COPY.title}
            </h2>
          </div>

          <div
            ref={rSubtitle}
            style={{
              ...sSubtitle,
              position: "relative",
              textAlign: "center",
              display: "inline-block",
              width: isCompactLayout ? "100%" : "auto",
              maxWidth: isPhoneLayout
                ? HERO_LAYOUT.subtitleMaxWidth.mobile
                : isTabletLayout
                  ? HERO_LAYOUT.subtitleMaxWidth.tablet
                  : "100%",
              paddingBottom: HERO_LAYOUT.subtitleContainerPaddingBottom,
              overflow: "visible",
              margin: "0 auto",
            }}
          >
            <h1
              className="sub-title"
              style={{
                fontFamily: FONTS.sans,
                display: "inline-block",
                whiteSpace: isCompactLayout ? "normal" : "nowrap",
                textWrap: isCompactLayout ? "balance" : undefined,
                lineHeight: isPhoneLayout
                  ? HERO_LAYOUT.subtitleCompactLineHeight.mobile
                  : isTabletLayout
                    ? HERO_LAYOUT.subtitleCompactLineHeight.tablet
                    : HERO_LAYOUT.subtitleLineHeight,
                margin: 0,
                paddingBottom: HERO_LAYOUT.subtitlePaddingBottom,
                backgroundImage: subtitleBackgroundImage,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
                fontSize: isPhoneLayout
                  ? HERO_LAYOUT.subtitleCompactFontSize.mobile
                  : isTabletLayout
                    ? HERO_LAYOUT.subtitleCompactFontSize.tablet
                    : undefined,
              }}
            >
              {HERO_COPY.subtitle}
            </h1>
          </div>
        </div>
      </section>
    </div>
  );
}
