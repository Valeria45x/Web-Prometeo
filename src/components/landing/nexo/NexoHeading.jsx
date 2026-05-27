import { COLORS, FONTS } from "../../../design/tokens";

export default function NexoHeading({
  isMobileLayout,
  titleColor,
  headingSize,
  headingLine,
  mobileText,
  desktopLines,
  accentText,
}) {
  return (
    <h2
      className="section-title"
      style={{
        fontFamily: FONTS.sans,
        color: titleColor,
        fontSize: headingSize,
        lineHeight: headingLine,
        textAlign: "center",
        maxWidth: isMobileLayout ? "16ch" : "none",
        margin: 0,
        textWrap: isMobileLayout ? "balance" : undefined,
      }}
    >
      {isMobileLayout ? (
        <>
          {mobileText}
          {accentText ? (
            <>
              {" "}
              <span style={{ color: COLORS.accent, fontFamily: FONTS.display }}>
                {accentText}
              </span>
            </>
          ) : null}
        </>
      ) : (
        <>
          {desktopLines[0]}
          <br />
          {desktopLines[1]}
          {accentText ? (
            <>
              {" "}
              <span style={{ color: COLORS.accent, fontFamily: FONTS.display }}>
                {accentText}
              </span>
            </>
          ) : null}
        </>
      )}
    </h2>
  );
}
