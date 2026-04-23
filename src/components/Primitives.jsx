export function L({ children, style = {} }) {
  return (
    <span className="small-label" style={{ color: "#333", ...style }}>
      {children}
    </span>
  );
}
