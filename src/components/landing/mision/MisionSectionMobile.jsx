import { COLORS, FONTS } from "../../../design/tokens";
import { MISION_COPY } from "./mision.content";

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
      </div>
    </section>
  );
}
