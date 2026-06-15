import { Fragment } from "react";
import { COLORS } from "@/design/tokens";
import { placeholderImage as heroImage } from "@/lib/media";
import GridImageReveal from "@/shared/ui/GridImageReveal";
import TransitionSection from "@/shared/transition/TransitionSection";
import AccessCard from "@/features/para-ti/components/AccessCard";
import { useAccessQuoteReveal } from "@/features/para-ti/hooks/useAccessQuoteReveal";
import { useAccessCardStack } from "@/features/para-ti/hooks/useAccessCardStack";
import {
  ACCESS_POINTS,
  ACCESS_QUOTE_LINES,
} from "@/features/para-ti/para-ti.content";

const VISUAL_STYLE = {
  height: "100%",
  "--grid-image-bg": COLORS.pageLight,
  "--grid-image-overlay": "transparent",
};

export default function ParaTiAccess() {
  const { accessHeadingRef, wordsRef } = useAccessQuoteReveal();
  const { anchorsRef, revealAccessCard } = useAccessCardStack();

  return (
    <section
      className="para-ti-access"
      aria-labelledby="para-ti-access-heading"
    >
      <div ref={accessHeadingRef} className="para-ti-access__visuals">
        <div className="para-ti-access__visual para-ti-access__visual--first">
          <GridImageReveal
            src={heroImage}
            alt=""
            label=""
            tone="light"
            minHeight="100%"
            revealWidthRatio={1}
            objectPosition="right center"
            className="para-ti-access__visual-reveal"
            style={VISUAL_STYLE}
          />
        </div>

        <h2
          id="para-ti-access-heading"
          className="para-ti-access__quote"
          data-scroll-text-reveal="true"
          aria-label={ACCESS_QUOTE_LINES.map((words) => words.join(" ")).join(
            " ",
          )}
        >
          {ACCESS_QUOTE_LINES.map((words, lineIndex) => {
            const lineOffset = ACCESS_QUOTE_LINES.slice(0, lineIndex).reduce(
              (total, lineWords) => total + lineWords.length,
              0,
            );

            return (
              <span
                key={words.join("-")}
                className={`para-ti-access__quote-line para-ti-access__quote-line--${lineIndex + 1}`}
                aria-hidden="true"
              >
                <span className="para-ti-access__quote-line-copy">
                  {words.map((word, wordIndex) => {
                    const globalIndex = lineOffset + wordIndex;
                    return (
                      <Fragment key={`${word}-${globalIndex}`}>
                        <span
                          ref={(node) => {
                            wordsRef.current[globalIndex] = node;
                          }}
                          className="para-ti-access__quote-word"
                        >
                          {word}
                        </span>
                        {wordIndex < words.length - 1 ? " " : null}
                      </Fragment>
                    );
                  })}
                </span>
              </span>
            );
          })}
        </h2>

        <div className="para-ti-access__visual para-ti-access__visual--second">
          <GridImageReveal
            src={heroImage}
            alt=""
            label=""
            tone="light"
            minHeight="100%"
            revealWidthRatio={1}
            objectPosition="left center"
            className="para-ti-access__visual-reveal"
            style={VISUAL_STYLE}
          />
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
