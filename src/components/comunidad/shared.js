import { BORDERS, COLORS, FONTS } from "../../design/tokens";

export const COMMUNITY_BORDERS = {
  dark: BORDERS.dark,
  light: BORDERS.light,
  soft: BORDERS.soft,
  accent: BORDERS.accent,
};

export const COMMUNITY_COLORS = {
  darkBackground: COLORS.canvasDark,
  lightBackground: COLORS.canvasLight,
  lightPanel: "#fafafa",
  inputBackground: "#111111",
  cardHover: "#f9f9f9",
  mutedBackground: "#f4f4f4",
  text: COLORS.canvasDark,
  textOnDark: COLORS.textOnDark,
  mutedText: "#505050",
  accent: COLORS.accent,
  accentDeep: COLORS.accentDeep,
  accentSoft: "rgba(255,60,84,0.1)",
  accentSoftBorder: "rgba(255,60,84,0.35)",
  overlay: "rgba(0,0,0,0.85)",
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
      experto: "Experto",
      prometeo_team: "Equipo Prometeo",
    }[role] ?? role
  );
}
