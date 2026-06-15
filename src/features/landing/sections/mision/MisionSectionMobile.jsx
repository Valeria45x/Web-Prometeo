import { Link } from "react-router-dom";
import { COLORS, FONTS } from "@/design/tokens";
import { scrollToTopImmediate } from "@/lib/lenis";
import { MISION_COPY } from "@/features/landing/sections/mision/mision.content";

const MISION_LINK_STYLE = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  width: "fit-content",
  fontFamily: FONTS.sans,
  fontSize: "var(--type-title-sm-size)",
  lineHeight: "var(--type-title-sm-line)",
  fontWeight: 800,
  letterSpacing: 0,
};

export default function MisionSectionMobile({
  border,
  leadRevealRef,
  leadRevealStyle,
  bodyRevealRef,
  bodyRevealStyle,
  outroRevealRef,
  outroRevealStyle,
}) {
  const narrative = {
    fontFamily: FONTS.sans,
    fontSize: "var(--type-title-md-size)",
    lineHeight: "var(--type-title-md-line)",
    letterSpacing: 0,
    margin: 0,
    color: "#fcfcfc",
    textWrap: "pretty",
  };

  return (
    <section
      id="sobre"
      style={{
        borderTop: border,
        background: "#050505",
        padding: "var(--s64) var(--s16)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--s32)",
        }}
      >
        <p
          ref={leadRevealRef}
          style={{
            ...leadRevealStyle,
            ...narrative,
            fontWeight: 400,
            maxWidth: "28ch",
          }}
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
            maxWidth: "28ch",
          }}
        >
          {MISION_COPY.tension}
        </p>
        <p
          ref={outroRevealRef}
          style={{
            ...outroRevealStyle,
            ...narrative,
            fontWeight: 900,
            maxWidth: "20ch",
          }}
        >
          {MISION_COPY.resolve}
        </p>
        <Link
          to="/sobre-prometeo"
          onClick={scrollToTopImmediate}
          className="ds-link-secondary"
          style={{ ...outroRevealStyle, ...MISION_LINK_STYLE }}
        >
          Conoce por qué existe Prometeo
          <span className="ds-link-secondary__arrow" aria-hidden="true">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
