const ROLE_CONFIG = {
  prometeo_team: {
    label: "Equipo Prometeo",
    className: "community-role-badge--team",
  },
  certificado: {
    label: "Certificado",
    className: "community-role-badge--certified",
  },
  miembro: null,
};

export default function RoleBadge({ role }) {
  const config = ROLE_CONFIG[role];
  if (!config) return null;

  return (
    <span className={`community-role-badge ${config.className}`}>
      {config.label}
    </span>
  );
}
