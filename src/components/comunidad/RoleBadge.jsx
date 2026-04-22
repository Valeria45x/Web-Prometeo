const ROLE_CONFIG = {
  prometeo_team: {
    label: "PROMETEO TEAM",
    style: {
      background: "#FF3C54",
      color: "#0A0A0A",
      border: "none",
    },
  },
  experto: {
    label: "EXPERTO",
    style: {
      background: "#C8C8C8",
      color: "#0A0A0A",
      border: "none",
    },
  },
  certificado: {
    label: "CERT.",
    style: {
      background: "transparent",
      color: "#C8C8C8",
      border: "1px solid #C8C8C8",
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
        fontFamily: "monospace",
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
