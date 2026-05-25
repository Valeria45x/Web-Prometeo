import { BORDERS, COLORS, FONTS } from "../../design/tokens";
import "./community.css";

export const COMMUNITY_BORDERS = {
  dark: BORDERS.dark,
  light: BORDERS.light,
  soft: BORDERS.soft,
  accent: BORDERS.accent,
};

export const COMMUNITY_COLORS = {
  darkBackground: COLORS.canvasDark,
  lightBackground: COLORS.pageLight,
  lightPanel: COLORS.pageLight,
  inputBackground: "#050505",
  cardHover: COLORS.canvasLight,
  mutedBackground: "#d9d9d6",
  text: COLORS.canvasDark,
  textOnDark: COLORS.textOnDark,
  mutedText: "#050505",
  accent: COLORS.accent,
  accentText: COLORS.textOnLight,
  textOnAccent: COLORS.textOnAccent,
  accentSoft: "rgba(255, 11, 58, 0.1)",
  accentSoftBorder: "rgba(255, 11, 58, 0.35)",
  overlay: "rgba(5,5,5,0.85)",
};

export const COMMUNITY_FONTS = {
  mono: { fontFamily: FONTS.mono },
  sans: FONTS.sans,
  display: FONTS.display,
};

export function formatCommunityDate(iso, options) {
  if (!iso) return "—";

  return new Date(iso).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    ...options,
  });
}

export function getRoleLabel(role) {
  return (
    {
      miembro: "Miembro",
      certificado: "Certificado",
      prometeo_team: "Equipo Prometeo",
    }[role] ?? role
  );
}
