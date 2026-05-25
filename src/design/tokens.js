const GRAY_DARK = "#050505";
const GRAY_LIGHT = "#d9d9d6";
const PROMETEO_RED = "#ff0b3a";

export const COLORS = {
  grayDark: GRAY_DARK,
  grayLight: GRAY_LIGHT,
  canvasDark: GRAY_DARK,
  canvasDarker: GRAY_DARK,
  canvasLight: GRAY_LIGHT,
  pageLight: GRAY_LIGHT,
  textOnDark: GRAY_LIGHT,
  textOnLight: GRAY_DARK,
  textMutedDark: GRAY_LIGHT,
  textMutedLight: GRAY_DARK,
  textStrongDark: GRAY_LIGHT,
  accent: PROMETEO_RED,
  textOnAccent: GRAY_DARK,
  footerText: GRAY_DARK,
  grid: GRAY_LIGHT,
  gridLight: GRAY_DARK,
  gridSoft: GRAY_DARK,
};

export const BORDERS = {
  dark: `1px solid ${COLORS.grid}`,
  light: `1px solid ${COLORS.gridLight}`,
  soft: `1px solid ${COLORS.gridSoft}`,
  accent: `1px solid ${COLORS.accent}`,
};

export const FONTS = {
  sans: '"Funnel Sans", sans-serif',
  display: '"Funnel Display", serif',
  mono: "monospace",
};

export const SPACING = {
  s4: 4,
  s8: 8,
  s16: 16,
  s32: 32,
  s64: 64,
  s128: 128,
  s256: 256,
};

export const TYPE = {
  hero: { fontSize: 64, lineHeight: "64px" },
  section: { fontSize: 32, lineHeight: "32px" },
  body: { fontSize: 16, lineHeight: "32px" },
  meta: { fontSize: 8, lineHeight: "16px" },
};

export const LAYOUT = {
  frameWidth: "min(1600px, 92vw)",
  topbarHeight: SPACING.s64,
  heroHeight: SPACING.s128 + SPACING.s256,
};

export const GRID = {
  site: "repeat(4, minmax(0, 1fr))",
  halves: "repeat(2, minmax(0, 1fr))",
  thirds: "repeat(3, minmax(0, 1fr))",
};

export const TRANSITIONS = {
  emphasis: "0.9s cubic-bezier(0.16,1,0.3,1)",
};
