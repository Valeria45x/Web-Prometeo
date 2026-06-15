import { BORDERS, COLORS, TRANSITIONS } from "@/design/tokens";

export const T = `background ${TRANSITIONS.emphasis}, color ${TRANSITIONS.emphasis}, box-shadow ${TRANSITIONS.emphasis}`;

export function getHoverBg(light) {
  return light ? COLORS.grayDark : COLORS.grayWhite;
}

export function getHoverText(light) {
  return light ? COLORS.textOnDark : COLORS.textOnLight;
}

/** Tokens de color/superficie del topbar derivados del modo claro/oscuro. */
export function getTopbarTheme(light, background) {
  return {
    light,
    bg: background ?? (light ? COLORS.pageLight : COLORS.canvasDark),
    bd: light ? BORDERS.light : BORDERS.dark,
    navigationSurface: light ? "light" : "dark",
    navActiveText: COLORS.accent,
    wordmark: light ? COLORS.textOnLight : COLORS.textStrongDark,
    navText: light ? COLORS.textOnLight : COLORS.textStrongDark,
    mutedText: light ? COLORS.textMutedLight : COLORS.textMutedDark,
    hoverBg: getHoverBg(light),
    hoverText: getHoverText(light),
  };
}
