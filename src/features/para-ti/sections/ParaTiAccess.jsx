import { Fragment } from "react";
import TransitionSection from "@/shared/transition/TransitionSection";
import AccessCard from "@/features/para-ti/components/AccessCard";
import { useAccessCardStack } from "@/features/para-ti/hooks/useAccessCardStack";
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
  const { anchorsRef, revealAccessCard } = useAccessCardStack();
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

      <div className="para-ti-access__stack">
        {ACCESS_POINTS.map((item, index) => (
          <Fragment key={item.to}>
            <div
              ref={(node) => {
                anchorsRef.current[index] = node;
              }}
              className="para-ti-access-card__anchor"
              aria-hidden="true"
            />
            <AccessCard item={item} index={index} onSelect={revealAccessCard} />
          </Fragment>
        ))}
      </div>
    </section>
  );
}
