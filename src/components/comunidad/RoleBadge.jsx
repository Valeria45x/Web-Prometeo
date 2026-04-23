import { COMMUNITY_COLORS, COMMUNITY_FONTS } from "./shared";

const ROLE_CONFIG = {
  prometeo_team: {
    label: "PROMETEO TEAM",
    style: {
      background: COMMUNITY_COLORS.accent,
      color: COMMUNITY_COLORS.darkBackground,
      border: "none",
    },
  },
  experto: {
    label: "EXPERTO",
    style: {
      background: COMMUNITY_COLORS.textOnDark,
      color: COMMUNITY_COLORS.darkBackground,
      border: "none",
    },
  },
  certificado: {
    label: "CERT.",
    style: {
      background: "transparent",
      color: COMMUNITY_COLORS.textOnDark,
      border: `1px solid ${COMMUNITY_COLORS.textOnDark}`,
    },
  },
  miembro: null,
};

export default function RoleBadge({ role }) {
  const config = ROLE_CONFIG[role];
  if (!config) return null;

  return (
    <span
      style={{
        fontFamily: COMMUNITY_FONTS.mono.fontFamily,
        fontSize: 6,
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        padding: "2px 4px",
        display: "inline-block",
        lineHeight: 1.4,
        ...config.style,
      }}
    >
      {config.label}
    </span>
  );
}
