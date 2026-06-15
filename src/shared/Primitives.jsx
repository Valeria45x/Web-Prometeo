export function L({ children, style = {} }) {
  return (
    <span className="small-label" style={{ color: "#050505", ...style }}>
      {children}
    </span>
  );
}
