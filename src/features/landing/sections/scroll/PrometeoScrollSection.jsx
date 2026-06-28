import { COLORS, FONTS } from "@/design/tokens";
import { typeStyle } from "@/design/typography";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReveal } from "@/hooks/useReveal";
import TextReveal from "@/shared/ui/TextReveal";
import TransitionSection from "@/shared/transition/TransitionSection";
import PrometeoScrollMoveStage from "@/features/landing/sections/scroll/PrometeoScrollMoveStage";
import PrometeoScrollMobileSection from "@/features/landing/sections/scroll/PrometeoScrollMobileSection";
import ScrambleText from "@/shared/ui/ScrambleText";
import {
  MOVE_IMAGE_BG,
  PROMETEO_SCROLL_COPY,
  STAGE_DIVIDER_NUDGE,
} from "@/features/landing/sections/scroll/prometeoScroll.config";
import { usePrometeoScrollScene } from "@/features/landing/sections/scroll/usePrometeoScrollScene";
import {
  clamp,
  smoothstep,
} from "@/features/landing/sections/scroll/prometeoScroll.utils";
import { DARK_GRID, LIGHT_GRID, PAGE_LIGHT_BG } from "@/shared/styles/theme";
import { placeholderImage as scrollMediaImage } from "@/lib/media";
import "@/features/landing/sections/scroll/prometeoScroll.css";

const PILLAR_SCROLL_STEP_SVH = 88;

function PrometeoScrollDesktopSection({ light = false }) {
  const [headlineRef, headlineStyle] = useReveal(140);
  const [methodKickerRef, methodKickerStyle] = useReveal(280);
  const {
    scrollRef,
    stageRef,
    explainRef,
    moveTextRef,
    solutionMetaRef,
    state,
    total,
    activeIndex,
    moveVisible,
    solutionScrambleActive,
    moveStageDividerX,
    setMoveStageDividerX,
  } = usePrometeoScrollScene();

  const bg = light ? PAGE_LIGHT_BG : COLORS.canvasDark;
  const bd = light ? LIGHT_GRID : DARK_GRID;
  const titleColor = light ? COLORS.textOnLight : COLORS.textOnDark;
  const mutedColor = light ? COLORS.textMutedLight : COLORS.textMutedDark;
  const accentTextColor = light ? COLORS.textOnLight : COLORS.accent;
  const moveIndexColor = COLORS.grayDark;
  const moveTitleColor = COLORS.accent;
  const maskColor = light ? PAGE_LIGHT_BG : COLORS.canvasDark;

  const progress = smoothstep(state.progress);
  const stageWidth = state.stageWidth || 1024;
  const stageHeight = state.stageHeight || 640;
  const metaHeight = 64;
  const mediaHeight = Math.max(0, stageHeight - metaHeight);
  const headlineExitProgress = smoothstep(
    clamp((progress - 0.02) / 0.34, 0, 1),
  );
  const mediaProgress = smoothstep(clamp((progress - 0.36) / 0.64, 0, 1));
  const revealWidth = stageWidth * mediaProgress;
  const revealHeight = mediaHeight * mediaProgress;
  const clipLeft = Math.max(0, (stageWidth - revealWidth) / 2);
  const clipTop = Math.max(0, (mediaHeight - revealHeight) / 2);
  const textOpacity = 1 - headlineExitProgress;
  const rotatedVideoScale = (stageWidth / Math.max(mediaHeight, 1)) * 1.08;
  const mediaLabelOp = clamp((mediaProgress - 0.46) / 0.32, 0, 1);
  const headlineColorT = smoothstep(clamp((progress - 0.15) / 0.25, 0, 1));
  const headlineChannel = Math.round(26 + (252 - 26) * headlineColorT);
  const headlineColor = `rgb(${headlineChannel}, ${headlineChannel}, ${headlineChannel})`;
  const stageDefaultDividerX = Math.round(stageWidth * 0.75);
  const stageDividerX =
    moveStageDividerX != null
      ? Math.round(moveStageDividerX) + STAGE_DIVIDER_NUDGE
      : state.stageDividerX != null
        ? Math.round(state.stageDividerX) + STAGE_DIVIDER_NUDGE
        : stageDefaultDividerX;

  return (
    <section
      className="prometeo-scroll"
      style={{
        "--prometeo-scroll-bg": bg,
        "--prometeo-scroll-border": bd,
        "--prometeo-scroll-title": titleColor,
        "--prometeo-scroll-muted": mutedColor,
        "--prometeo-scroll-accent-text": accentTextColor,
        "--prometeo-stage-divider-x": `${stageDividerX}px`,
        "--prometeo-structure": light ? COLORS.gridLight : COLORS.grid,
        "--prometeo-scroll-line": light ? COLORS.gridLight : COLORS.grid,
        "--prometeo-scroll-progress": progress,
        "--prometeo-scroll-text-opacity": textOpacity,
        "--prometeo-scroll-video-rotate-scale": rotatedVideoScale,
        "--prometeo-scroll-media-label": mediaLabelOp,
        "--prometeo-headline-color": headlineColor,
        "--prometeo-scroll-video-bg": COLORS.canvasDark,
        "--prometeo-scroll-video-border": light
          ? COLORS.gridLight
          : COLORS.grid,
        "--pmt-move-image-bg": MOVE_IMAGE_BG,
        "--pmt-image-mask-bg": COLORS.grayDark,
        background: bg,
        color: titleColor,
      }}
    >
      <div ref={scrollRef} className="prometeo-scroll__sticky-wrap">
        <div ref={stageRef} className="prometeo-scroll__stage">
          <div className="prometeo-scroll__meta">
            <div className="prometeo-scroll__meta-grid" aria-hidden="true">
              <span className="prometeo-scroll__meta-grid-cell prometeo-scroll__meta-grid-cell--line" />
              <span className="prometeo-scroll__meta-grid-cell prometeo-scroll__meta-grid-cell--line" />
              <span className="prometeo-scroll__meta-grid-cell prometeo-scroll__meta-grid-cell--line" />
              <span className="prometeo-scroll__meta-grid-cell" />
            </div>
            <div ref={solutionMetaRef} className="prometeo-scroll__meta-title">
              <ScrambleText
                text={PROMETEO_SCROLL_COPY.metaLabel}
                play={solutionScrambleActive}
                idle="scrambled"
                duration={820}
                className="prometeo-scroll__meta-copy"
              />
            </div>
          </div>

          <div
            className="prometeo-scroll__media"
            style={{
              "--prometeo-scroll-media-clip": `inset(${clipTop}px ${clipLeft}px ${clipTop}px ${clipLeft}px)`,
            }}
          >
            <div className="prometeo-scroll__media-fill">
              <div className="prometeo-scroll__media-video-shell">
                <img
                  className="prometeo-scroll__media-video"
                  src={scrollMediaImage}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>

          <div className="prometeo-scroll__stage-grid" aria-hidden="true">
            <span className="prometeo-scroll__stage-grid-cell prometeo-scroll__stage-grid-cell--line" />
            <span className="prometeo-scroll__stage-grid-cell" />
            <span className="prometeo-scroll__stage-grid-cell prometeo-scroll__stage-grid-cell--line" />
            <span className="prometeo-scroll__stage-grid-cell" />
          </div>

          <div className="prometeo-scroll__headline" aria-hidden="true">
            <div
              ref={headlineRef}
              className="prometeo-scroll__headline-entry"
              style={headlineStyle}
            >
              <h2>Conoce a</h2>
              <h2
                className="prometeo-scroll__headline-brand font-display"
                style={{
                  color: COLORS.accent,
                  fontFamily: FONTS.display,
                  fontWeight: 900,
                }}
              >
                Prometeo
              </h2>
            </div>
          </div>
        </div>
      </div>

      <TransitionSection
        light={light}
        title={PROMETEO_SCROLL_COPY.transition.title}
        column={PROMETEO_SCROLL_COPY.transition.column}
      />

      <div
        ref={explainRef}
        className="prometeo-scroll__explain-wrap"
        style={{
          "--pmt-explain-total-scroll": `${total * PILLAR_SCROLL_STEP_SVH}svh`,
        }}
      >
        <div className="prometeo-scroll__explain-sticky">
          <div className="prometeo-scroll__explain-copy">
            <div className="prometeo-scroll__explain-heading">
              <div
                ref={methodKickerRef}
                className="pmt-method-kicker-wrap"
                style={methodKickerStyle}
              >
                <span
                  className="pmt-method-kicker"
                  style={{
                    color: accentTextColor,
                    ...typeStyle("eyebrow"),
                  }}
                >
                  {PROMETEO_SCROLL_COPY.methodKicker}
                </span>
              </div>
              <TextReveal
                as="h2"
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
                  ...typeStyle("displayMd"),
                  "--text-reveal-block": COLORS.accent,
                }}
              />
            </div>
          </div>

          <PrometeoScrollMoveStage
            activeIndex={activeIndex}
            moveVisible={moveVisible}
            moveTextRef={moveTextRef}
            moveTitleColor={moveTitleColor}
            moveIndexColor={moveIndexColor}
            mutedColor={mutedColor}
            borderTop={bd}
            onDividerChange={setMoveStageDividerX}
          />
        </div>
      </div>
    </section>
  );
}

export default function PrometeoScrollSection({ light = false }) {
  const isPhoneLayout = useMediaQuery("(max-width: 767px)");
  const isCompactLayout = useMediaQuery("(max-width: 1024px)");
  const isTabletLayout = isCompactLayout && !isPhoneLayout;
  const bg = light ? PAGE_LIGHT_BG : COLORS.canvasDark;
  const bd = light ? LIGHT_GRID : DARK_GRID;
  const titleColor = light ? COLORS.textOnLight : COLORS.textOnDark;
  const mutedColor = light ? COLORS.textMutedLight : COLORS.textMutedDark;
  const accentTextColor = light ? COLORS.textOnLight : COLORS.accent;
  const maskColor = light ? PAGE_LIGHT_BG : COLORS.canvasDark;

  if (isCompactLayout) {
    return (
      <PrometeoScrollMobileSection
        bg={bg}
        bd={bd}
        titleColor={titleColor}
        mutedColor={mutedColor}
        accentTextColor={accentTextColor}
        maskColor={maskColor}
        light={light}
        isTabletLayout={isTabletLayout}
      />
    );
  }

  return <PrometeoScrollDesktopSection light={light} />;
}
