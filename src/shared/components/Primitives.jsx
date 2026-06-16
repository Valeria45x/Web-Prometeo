import { COLORS } from "@/design/tokens";
export function L({ children, style = {} }) {
  return (
    <span className="small-label" style={{ color: COLORS.grayDark, ...style }}>
      {children}
    </span>
  );
}
