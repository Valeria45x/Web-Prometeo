import { COLORS } from "../../../design/tokens";
import { typeStyle } from "../../../design/typography";
import TextReveal from "../../system/TextReveal";
import { MISION_COPY } from "./mision.content";

export default function MisionSectionMobile({
  border,
  maskColor,
  bodyRevealRef,
  bodyRevealStyle,
  outroRevealRef,
  outroRevealStyle,
}) {
  const titleLines = MISION_COPY.titleLines.map((line, index) => (
    <span key={`mision-mobile-title-line-${index}`} style={{ display: "block" }}>
      {line}
    </span>
  ));

  return (
    <section
      id="sobre"
      style={{
        borderTop: border,
        background: "#050505",
      }}
    >
      <div>
        <div style={{ padding: "32px 16px" }}>
          <TextReveal
            as="h2"
            lines={titleLines}
            once={false}
            maskColor={maskColor}
            style={{
              ...typeStyle("displaySm"),
              color: "#fcfcfc",
              margin: 0,
              maxWidth: "12ch",
              textWrap: "balance",
            }}
          />
        </div>

        <div
          ref={bodyRevealRef}
          style={{
            ...bodyRevealStyle,
            borderTop: border,
            padding: "32px 16px",
          }}
        >
          <p
            style={{
              ...typeStyle("body"),
              color: "#fcfcfc",
              margin: 0,
              maxWidth: "32ch",
            }}
          >
            {MISION_COPY.body}
          </p>
        </div>

        <div
          ref={outroRevealRef}
          style={{
            ...outroRevealStyle,
            borderTop: border,
            padding: "32px 16px",
          }}
        >
          <h3
            className="section-title"
            style={{
              ...typeStyle("displaySm"),
              color: "#fcfcfc",
              maxWidth: "15ch",
              margin: 0,
              textWrap: "balance",
            }}
          >
            <span style={{ color: COLORS.accent }}>{MISION_COPY.outro}</span>
          </h3>
        </div>
      </div>
    </section>
  );
}
