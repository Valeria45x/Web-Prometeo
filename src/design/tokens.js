export const COLORS = {
  canvasDark: "#0a0a0a",
  canvasDarker: "#0d0d0d",
  canvasLight: "#ffffff",
  pageLight: "#efefef",
  textOnDark: "#c8c8c8",
  textOnLight: "#0a0a0a",
  textMutedDark: "#8a8a8a",
  textMutedLight: "#6b6b6b",
  textStrongDark: "#e4e4e4",
  accent: "#ff3c54",
  accentDeep: "#5c1220",
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

export const LAYOUT = {
  frameWidth: "min(1600px, 92vw)",
  topbarHeight: 52,
};

export const GRID = {
  site: "repeat(4, minmax(0, 1fr))",
  halves: "repeat(2, minmax(0, 1fr))",
  thirds: "repeat(3, minmax(0, 1fr))",
};

export const TRANSITIONS = {
  emphasis: "0.9s cubic-bezier(0.16,1,0.3,1)",
};
