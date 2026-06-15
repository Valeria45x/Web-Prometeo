import { COLORS, FONTS } from "@/design/tokens";
import { typeStyle } from "@/design/typography";
import { useReveal } from "@/hooks/useReveal";
import TextReveal from "@/shared/ui/TextReveal";
import LandingTransitionSection from "@/features/landing/transition/LandingTransitionSection";
import ScrambleText from "@/features/landing/shared/ScrambleText";
import {
  PROMETEO_MOVES,
  PROMETEO_SCROLL_COPY,
} from "@/features/landing/sections/scroll/prometeoScroll.config";
import { placeholderVideo as heroPlaceholderVideo } from "@/lib/media";

function MobilePillarCard({ move, borderColor, mutedColor, maskColor, index }) {
  const [cardRef, cardStyle] = useReveal(120 + index * 120, false);

  return (
    <article
      ref={cardRef}
      className="prometeo-scroll__mobile-pillar"
      style={{ ...cardStyle, borderTop: borderColor }}
    >
      <div className="prometeo-scroll__mobile-pillar-media">
        <img
          className="prometeo-scroll__mobile-pillar-image"
          src={move.image}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="prometeo-scroll__mobile-pillar-copy">
        <span
          className="prometeo-scroll__mobile-pillar-index"
          style={{ color: COLORS.grayDark, ...typeStyle("eyebrow") }}
        >
          Pilar {move.index}
        </span>

        <TextReveal
          as="h3"
          className="prometeo-scroll__mobile-pillar-title"
          lines={[move.title]}
          once={false}
          delayStep={0}
          maskColor={maskColor}
          style={{
            ...typeStyle("displaySm", { fontFamily: FONTS.display }),
            color: COLORS.accent,
            margin: 0,
            "--text-reveal-block": COLORS.accent,
          }}
        />

        <p
          className="prometeo-scroll__mobile-pillar-body"
          style={{ color: mutedColor, ...typeStyle("body") }}
        >
          {move.body}
        </p>
      </div>
    </article>
  );
}

export default function PrometeoScrollMobileSection({
  bg,
  bd,
  titleColor,
  mutedColor,
  accentTextColor,
  maskColor,
  light,
  isTabletLayout = false,
}) {
  const [headlineRef, headlineStyle] = useReveal(80, false);
  const [methodKickerRef, methodKickerStyle] = useReveal(140, false);

  return (
    <section
      className={`prometeo-scroll ${isTabletLayout ? "prometeo-scroll--tablet" : "prometeo-scroll--mobile"}`}
      style={{
        "--prometeo-scroll-bg": bg,
        "--prometeo-scroll-border": bd,
        "--prometeo-scroll-title": titleColor,
        "--prometeo-scroll-muted": mutedColor,
        "--prometeo-scroll-accent-text": accentTextColor,
        "--prometeo-structure": light ? COLORS.gridLight : COLORS.grid,
        "--prometeo-scroll-line": light ? COLORS.gridLight : COLORS.grid,
        "--prometeo-scroll-video-bg": COLORS.canvasDark,
        "--prometeo-scroll-video-border": light
          ? COLORS.gridLight
          : COLORS.grid,
        background: bg,
        color: titleColor,
      }}
    >
      <div className="prometeo-scroll__mobile-stage-shell">
        <div className="prometeo-scroll__mobile-meta">
          <ScrambleText
            text={PROMETEO_SCROLL_COPY.metaLabel}
            idle="scrambled"
            duration={820}
            className="prometeo-scroll__meta-copy"
          />
        </div>

        <div className="prometeo-scroll__mobile-stage">
          <div className="prometeo-scroll__mobile-stage-media">
            <video
              className="prometeo-scroll__mobile-stage-video"
              src={heroPlaceholderVideo}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
            />
          </div>

          <div
            ref={headlineRef}
            className="prometeo-scroll__mobile-headline"
            style={headlineStyle}
            aria-hidden="true"
          >
            <h2>Conoce a</h2>
            <h2 style={{ color: COLORS.accent }}>Prometeo</h2>
          </div>
        </div>
      </div>

      <LandingTransitionSection
        light={light}
        title={PROMETEO_SCROLL_COPY.transition.title}
        column={PROMETEO_SCROLL_COPY.transition.column}
      />

      <div className="prometeo-scroll__mobile-intro" style={{ borderTop: bd }}>
        <div
          ref={methodKickerRef}
          className="prometeo-scroll__mobile-kicker-wrap"
          style={methodKickerStyle}
        >
          <span
            className="pmt-method-kicker"
            style={{ color: accentTextColor, ...typeStyle("bodyStrong") }}
          >
            {PROMETEO_SCROLL_COPY.methodKicker}
          </span>
        </div>

        <TextReveal
          as="h2"
          once={false}
          lines={[
            PROMETEO_SCROLL_COPY.statementLead,
            <span
              key="accent"
              style={{ color: COLORS.accent, fontFamily: FONTS.display }}
            >
              {PROMETEO_SCROLL_COPY.statementAccent}
            </span>,
          ]}
          maskColor={maskColor}
          delayStep={140}
          style={{
            color: titleColor,
            margin: 0,
            textAlign: "left",
            ...typeStyle("displaySm"),
            "--text-reveal-block": COLORS.accent,
          }}
        />
      </div>

      <div className="prometeo-scroll__mobile-pillars">
        {PROMETEO_MOVES.map((move, index) => (
          <MobilePillarCard
            key={move.index}
            move={move}
            borderColor={bd}
            mutedColor={mutedColor}
            maskColor={maskColor}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
