import { Link } from "react-router-dom";
import { COLORS } from "@/design/tokens";
import TransitionSection from "@/shared/transition/TransitionSection";
import Label from "@/shared/ui/Label";
import SplitCtaButton from "@/shared/ui/SplitCtaButton";
import { useAccessHorizontalText } from "@/features/para-ti/hooks/useAccessHorizontalText";
import {
  ACCESS_POINTS,
  ACCESS_QUOTE_LINES,
} from "@/features/para-ti/para-ti.content";

const QUOTE_LINES = ACCESS_QUOTE_LINES.map((words) => words.join(" "));
const QUOTE_ROWS = [
  { text: QUOTE_LINES[0], tone: "base" },
  { text: QUOTE_LINES[1], tone: "accent" },
];

export default function ParaTiAccess() {
  const { quoteScrollRef, quoteTrackRefs } = useAccessHorizontalText();

  return (
    <section
      className="para-ti-access"
      aria-labelledby="para-ti-access-heading"
    >
      <div ref={quoteScrollRef} className="para-ti-access__quote-scroll">
        <div className="para-ti-access__quote-pin">
          <h2
            id="para-ti-access-heading"
            className="para-ti-access__quote"
            data-scroll-text-reveal="true"
            aria-label={QUOTE_LINES.join(" ")}
          >
            {QUOTE_ROWS.map((row, rowIndex) => (
              <span
                key={row.tone}
                className={`para-ti-access__quote-line para-ti-access__quote-line--${row.tone}`}
              >
                <span
                  ref={(node) => {
                    quoteTrackRefs.current[rowIndex] = node;
                  }}
                  className="para-ti-access__quote-track"
                  aria-hidden="true"
                >
                  <span className="para-ti-access__quote-segment">
                    {row.text}
                  </span>
                </span>
              </span>
            ))}
          </h2>
        </div>
      </div>

      <div className="para-ti-transition para-ti-access__transition">
        <TransitionSection light title="Elige tu camino" column={3} />
      </div>

      <div className="para-ti-access__index">
        {ACCESS_POINTS.map((item) => (
          <article
            key={item.to}
            className="para-ti-access-row"
            aria-labelledby={`para-ti-access-row-${item.number}`}
          >
            <div className="para-ti-access-row__number" aria-hidden="true">
              {item.number}
            </div>

            <div className="para-ti-access-row__heading">
              <Label
                color={COLORS.textOnLight}
                className="para-ti-access-row__eyebrow"
              >
                {item.eyebrow}
              </Label>
              <h3 id={`para-ti-access-row-${item.number}`}>{item.title}</h3>
            </div>

            <div className="para-ti-access-row__copy">
              <p>{item.description}</p>
            </div>

            <SplitCtaButton
              as={Link}
              to={item.to}
              label={item.cta}
              color={COLORS.textOnLight}
              iconBg={COLORS.pageLight}
              className="para-ti-access-row__cta"
              style={{ "--ds-split-cta-width": "240px", maxWidth: "100%" }}
            />
          </article>
        ))}
      </div>
    </section>
  );
}
