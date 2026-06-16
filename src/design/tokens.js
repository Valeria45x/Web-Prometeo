// Fuente ÚNICA de los colores: las primitivas viven en el :root de index.css
// (--brand-*). Aquí solo se referencian con var(), para no duplicar los hex.
// Seguro porque COLORS no se usa en canvas (donde var() no resolvería).
const GRAY_DARK = "var(--brand-black)";
const GRAY_LIGHT = "var(--brand-gray)";
const GRAY_WHITE = "var(--brand-white)";
const PROMETEO_RED = "var(--brand-red)";
const GRID_ON_DARK = "var(--prometeo-structure)";

export const COLORS = {
  grayDark: GRAY_DARK,
  grayLight: GRAY_LIGHT,
  grayWhite: GRAY_WHITE,
  canvasDark: GRAY_DARK,
  canvasDarker: GRAY_DARK,
  canvasLight: GRAY_WHITE,
  pageLight: GRAY_WHITE,
  textOnDark: GRAY_WHITE,
  textOnLight: GRAY_DARK,
  textMutedDark: GRAY_LIGHT,
  textMutedLight: GRAY_DARK,
  textStrongDark: GRAY_WHITE,
  accent: PROMETEO_RED,
  textOnAccent: GRAY_DARK,
  footerText: GRAY_DARK,
  grid: GRID_ON_DARK,
  gridOnDark: GRID_ON_DARK,
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
  sans: "var(--font-sans)",
  display: "var(--font-display)",
  mono: "var(--font-mono)",
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
  displayXl: { fontSize: 128, lineHeight: "128px", fontWeight: 900 },
  displayLg: { fontSize: 64, lineHeight: "64px", fontWeight: 900 },
  displayMd: { fontSize: 48, lineHeight: "56px", fontWeight: 900 },
  displaySm: { fontSize: 32, lineHeight: "32px", fontWeight: 900 },
  titleMd: { fontSize: 20, lineHeight: "24px", fontWeight: 900 },
  titleSm: { fontSize: 16, lineHeight: "20px", fontWeight: 800 },
  body: { fontSize: 16, lineHeight: "32px", fontWeight: 400 },
  bodySm: { fontSize: 14, lineHeight: "24px", fontWeight: 400 },
  caption: { fontSize: 12, lineHeight: "16px", fontWeight: 400 },
  meta: { fontSize: 8, lineHeight: "16px", fontWeight: 400 },
  hero: { fontSize: 64, lineHeight: "64px", fontWeight: 900 },
  section: { fontSize: 32, lineHeight: "32px", fontWeight: 900 },
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
  emphasis: "0.65s cubic-bezier(0.16,1,0.3,1)",
};
