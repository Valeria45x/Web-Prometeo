export const COLORS = {
  canvasDark: "#0A0A0A",
  canvasDarker: "#0A0A0A",
  canvasLight: "#C8C8C8",
  pageLight: "#C8C8C8",
  textOnDark: "#C8C8C8",
  textOnLight: "#0A0A0A",
  textMutedDark: "#8a8a8a",
  textMutedLight: "#6b6b6b",
  textStrongDark: "#C8C8C8",
  accent: "#FF3C54",
  accentDeep: "#5C1220",
  footerText: "#160509",
  grid: "#303030",
  gridLight: "#303030",
  gridSoft: "#303030",
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
