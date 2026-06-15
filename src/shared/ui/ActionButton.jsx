// Micro-acción del sistema (acciones compactas: foro, footers de card…).
// Distinta del Button grande: pensada para acciones inline de utilidad.
// variant: "default" | "primary" · active: estado toggled (p. ej. "Siguiendo").
export default function ActionButton({
  label,
  icon,
  variant = "default",
  active = false,
  className = "",
  children,
  ...props
}) {
  return (
    <button
      type="button"
      className={[
        "ds-action",
        `ds-action--${variant}`,
        active && "ds-action--active",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {icon ? (
        <span className="ds-action__icon" aria-hidden="true">
          {icon}
        </span>
      ) : null}
      {children ??
        (label ? <span className="ds-action__label">{label}</span> : null)}
    </button>
  );
}
