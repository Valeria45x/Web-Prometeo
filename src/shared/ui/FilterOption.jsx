export default function FilterOption({
  name,
  count,
  active = false,
  className = "",
  ...props
}) {
  return (
    <button
      type="button"
      className={["ds-filter-option", active && "ds-filter-option--active", className]
        .filter(Boolean)
        .join(" ")}
      aria-pressed={active}
      {...props}
    >
      <span className="ds-filter-option__name">{name}</span>
      {count != null ? (
        <span className="ds-filter-option__count">{count}</span>
      ) : null}
    </button>
  );
}
