import { GRID_SYSTEM } from "./gridSystem";
import { COLORS, FONTS, GRID, LAYOUT, TRANSITIONS } from "./tokens";

const TOPBAR_TOKENS = {
  brandPadding: {
    desktop: "0 32px",
    compact: "0 16px",
  },
  brandFontSize: {
    desktop: 22,
    compact: 20,
  },
  brandLineHeight: "24px",
  itemPadding: {
    desktop: "0 32px",
    compact: "0 16px",
  },
  itemGap: 16,
  navFontSize: {
    desktop: 18,
    compact: 20,
  },
  iconSize: {
    desktop: 18,
    compact: 18,
  },
  navLineHeight: "24px",
  dropdownPadding: "16px 32px",
  dropdownMinHeight: 104,
  dropdownTitleSize: 16,
  dropdownTitleLineHeight: "20px",
  dropdownDescriptionSize: 13,
  dropdownDescriptionLineHeight: {
    desktop: "20px",
    compact: "18px",
  },
  submenuMinHeight: 72,
  submenuPadding: "12px 16px 12px 32px",
};

const CTA_BUTTON_TOKENS = {
  minHeight: 56,
  iconSize: 56,
  copyPadding: "0 20px",
  arrowSize: 20,
  fontSize: 18,
  lineHeight: "24px",
  fontWeight: 800,
  transition: TRANSITIONS.emphasis,
};

const FOOTER_TOKENS = {
  background: COLORS.accent,
  text: COLORS.footerText,
  padding: {
    desktop: "64px 32px 12px",
    compact: "40px 16px 12px",
  },
  containerGap: {
    desktop: 0,
    compact: 32,
  },
  bottomGap: {
    desktop: 0,
    compact: 20,
  },
  linkGap: {
    desktop: 32,
    compact: 20,
  },
  linkFontSize: {
    desktop: 20,
    compact: 18,
  },
  linkLineHeight: {
    desktop: "28px",
    compact: "24px",
  },
  wordmarkFamily: FONTS.display,
  wordmarkWeight: 800,
  wordmarkSize: {
    desktop: "clamp(160px, 18vw, 320px)",
    compact: "clamp(112px, 30vw, 160px)",
  },
  wordmarkLineHeight: {
    desktop: "1",
    compact: "0.9",
  },
};

const PILLAR_MOTION = {
  swapMs: 320,
  exitMs: 420,
  enterDelayMs: 120,
  transitionMs: 920,
  indexDelayMs: 140,
  titleDelayMs: 170,
  titleRevealMs: 980,
  bodyDelayMs: 440,
  imageEnterDelayMs: 0,
  imageBlendMs: 1120,
  minReadMs: 1360,
};

export const PROMETEO_SYSTEM = Object.freeze({
  surfaces: {
    dark: {
      canvas: COLORS.canvasDark,
      text: COLORS.textOnDark,
      muted: COLORS.textMutedDark,
      line: COLORS.grid,
      border: `1px solid ${COLORS.grid}`,
    },
    light: {
      canvas: COLORS.pageLight,
      text: COLORS.textOnLight,
      muted: COLORS.textMutedLight,
      line: COLORS.gridLight,
      border: `1px solid ${COLORS.gridLight}`,
    },
    accent: {
      canvas: COLORS.accent,
      text: COLORS.textOnAccent,
      muted: COLORS.textOnAccent,
      line: COLORS.textOnAccent,
      border: `1px solid ${COLORS.textOnAccent}`,
    },
  },
  grid: {
    ...GRID_SYSTEM,
    template: GRID.site,
  },
  typography: {
    families: FONTS,
    roles: {
      eyebrow: "eyebrow",
      nav: "titleSm",
      transitionLabel: "transitionLabel",
      sectionTitle: "displaySm",
      sectionStatement: "displayMd",
      body: "body",
      meta: "metaStrong",
    },
    measures: {
      cardBody: "30ch",
      introBody: "26rem",
      longBody: "42ch",
    },
  },
  copy: {
    stacks: {
      section: ["eyebrow", "title", "body"],
      entryPoint: ["label", "title", "supporting body", "cta"],
      footer: ["links", "wordmark"],
    },
    tone: ["directa", "concreta", "accionable", "sin jerga legal innecesaria"],
  },
  layout: {
    frameWidth: LAYOUT.frameWidth,
    topbarHeightPx: LAYOUT.topbarHeight,
    topbarHeight: `${LAYOUT.topbarHeight}px`,
    sectionPadding: {
      desktop: "64px 32px",
      compact: "32px 16px",
    },
  },
  motion: {
    emphasis: TRANSITIONS.emphasis,
    textReveal: {
      durationMs: 1450,
      delayStepMs: 130,
    },
    pillars: PILLAR_MOTION,
  },
  components: {
    topbar: TOPBAR_TOKENS,
    ctaButton: CTA_BUTTON_TOKENS,
    footer: FOOTER_TOKENS,
  },
});

export function getPrometeoTopbarTokens({ compact = false } = {}) {
  return {
    brandPadding: compact
      ? TOPBAR_TOKENS.brandPadding.compact
      : TOPBAR_TOKENS.brandPadding.desktop,
    brandFontSize: compact
      ? TOPBAR_TOKENS.brandFontSize.compact
      : TOPBAR_TOKENS.brandFontSize.desktop,
    brandLineHeight: TOPBAR_TOKENS.brandLineHeight,
    itemPadding: compact
      ? TOPBAR_TOKENS.itemPadding.compact
      : TOPBAR_TOKENS.itemPadding.desktop,
    itemGap: TOPBAR_TOKENS.itemGap,
    navFontSize: compact
      ? TOPBAR_TOKENS.navFontSize.compact
      : TOPBAR_TOKENS.navFontSize.desktop,
    iconSize: compact
      ? TOPBAR_TOKENS.iconSize.compact
      : TOPBAR_TOKENS.iconSize.desktop,
    navLineHeight: TOPBAR_TOKENS.navLineHeight,
    dropdownPadding: TOPBAR_TOKENS.dropdownPadding,
    dropdownMinHeight: TOPBAR_TOKENS.dropdownMinHeight,
    dropdownTitleSize: TOPBAR_TOKENS.dropdownTitleSize,
    dropdownTitleLineHeight: TOPBAR_TOKENS.dropdownTitleLineHeight,
    dropdownDescriptionSize: TOPBAR_TOKENS.dropdownDescriptionSize,
    dropdownDescriptionLineHeight: compact
      ? TOPBAR_TOKENS.dropdownDescriptionLineHeight.compact
      : TOPBAR_TOKENS.dropdownDescriptionLineHeight.desktop,
    submenuMinHeight: TOPBAR_TOKENS.submenuMinHeight,
    submenuPadding: TOPBAR_TOKENS.submenuPadding,
  };
}

export function getPrometeoCtaButtonTokens() {
  return CTA_BUTTON_TOKENS;
}

export function getPrometeoFooterTokens({ compact = false } = {}) {
  return {
    background: FOOTER_TOKENS.background,
    text: FOOTER_TOKENS.text,
    padding: compact
      ? FOOTER_TOKENS.padding.compact
      : FOOTER_TOKENS.padding.desktop,
    containerGap: compact
      ? FOOTER_TOKENS.containerGap.compact
      : FOOTER_TOKENS.containerGap.desktop,
    bottomGap: compact
      ? FOOTER_TOKENS.bottomGap.compact
      : FOOTER_TOKENS.bottomGap.desktop,
    linkGap: compact
      ? FOOTER_TOKENS.linkGap.compact
      : FOOTER_TOKENS.linkGap.desktop,
    linkFontSize: compact
      ? FOOTER_TOKENS.linkFontSize.compact
      : FOOTER_TOKENS.linkFontSize.desktop,
    linkLineHeight: compact
      ? FOOTER_TOKENS.linkLineHeight.compact
      : FOOTER_TOKENS.linkLineHeight.desktop,
    wordmarkFamily: FOOTER_TOKENS.wordmarkFamily,
    wordmarkWeight: FOOTER_TOKENS.wordmarkWeight,
    wordmarkSize: compact
      ? FOOTER_TOKENS.wordmarkSize.compact
      : FOOTER_TOKENS.wordmarkSize.desktop,
    wordmarkLineHeight: compact
      ? FOOTER_TOKENS.wordmarkLineHeight.compact
      : FOOTER_TOKENS.wordmarkLineHeight.desktop,
  };
}
