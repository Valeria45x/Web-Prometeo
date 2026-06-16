import { Link } from "react-router-dom";
import { COLORS, FONTS } from "@/design/tokens";
import GridImageReveal from "@/shared/ui/GridImageReveal";
import SplitCtaButton from "@/shared/ui/SplitCtaButton";
import { MISION_COPY } from "@/features/landing/sections/mision/mision.content";

const IMAGE_STYLE = {
  minHeight: "clamp(240px, 40vh, 380px)",
  "--grid-image-bg": COLORS.grayDark,
  "--grid-image-overlay": "transparent",
  "--grid-image-placeholder-bg": COLORS.grayWhite,
  "--grid-image-placeholder-text": COLORS.grayDark,
  "--grid-image-placeholder-accent": "transparent",
};

export default function MisionSectionMobile({
  border,
  leadRevealRef,
  leadRevealStyle,
  bodyRevealRef,
  bodyRevealStyle,
  outroRevealRef,
  outroRevealStyle,
  imageSrc,
}) {
  const narrative = {
    fontFamily: FONTS.sans,
    fontSize: "var(--type-display-sm-size)",
    lineHeight: "var(--type-display-sm-line)",
    letterSpacing: 0,
    margin: 0,
    color: COLORS.grayWhite,
    textWrap: "pretty",
  };

  return (
    <section
      id="sobre"
      style={{ borderTop: border, background: COLORS.grayDark }}
    >
      {/* Foto + texto */}
      <GridImageReveal
        src={imageSrc}
        label=""
        minHeight="0"
        revealWidthRatio={1}
        style={IMAGE_STYLE}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--s16)",
          padding: "var(--s32) var(--s16)",
          borderTop: border,
          borderBottom: border,
        }}
      >
        <p
          ref={leadRevealRef}
          style={{ ...leadRevealStyle, ...narrative, fontWeight: 400 }}
        >
          {MISION_COPY.lead}
        </p>
        <p
          ref={bodyRevealRef}
          style={{
            ...bodyRevealStyle,
            ...narrative,
            fontWeight: 900,
            color: COLORS.accent,
          }}
        >
          {MISION_COPY.tension}
        </p>
        <p
          ref={outroRevealRef}
          style={{ ...outroRevealStyle, ...narrative, fontWeight: 900 }}
        >
          {MISION_COPY.resolve}
        </p>
      </div>

      {/* Foto + botón */}
      <GridImageReveal
        src={imageSrc}
        label=""
        minHeight="0"
        revealWidthRatio={1}
        style={IMAGE_STYLE}
      />
      <div style={{ padding: "var(--s32) var(--s16)", borderTop: border }}>
        <div style={{ ...outroRevealStyle, width: "fit-content" }}>
          <SplitCtaButton
            as={Link}
            to="/sobre-prometeo"
            label="Conoce por qué existe Prometeo"
            color={COLORS.grayWhite}
            iconBg={COLORS.grayDark}
          />
        </div>
      </div>
    </section>
  );
}
