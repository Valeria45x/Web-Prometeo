export default function Chip({ label, active = false, className = "", ...props }) {
  return (
    <button
      type="button"
      className={["ds-chip", active && "ds-chip--active", className]
        .filter(Boolean)
        .join(" ")}
      aria-pressed={active}
      {...props}
    >
      {label}
    </button>
  );
}
