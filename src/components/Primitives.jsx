import { B, TH } from "../constants";

/** Celda de grid. span / rowSpan / bg / style override */
export function C({ children, span = 1, rowSpan = 1, bg, style = {} }) {
  return (
    <div style={{
      gridColumn: `span ${span}`,
      gridRow: rowSpan > 1 ? `span ${rowSpan}` : undefined,
      background: bg,
      borderRight: B, borderBottom: B,
      padding: 24, minHeight: 0, overflow: "hidden",
      ...style,
    }}>
      {children}
    </div>
  );
}

/** Etiqueta small-label con color por defecto #333 */
export function L({ children, style = {} }) {
  return (
    <span className="small-label" style={{ color: "#333", ...style }}>
      {children}
    </span>
  );
}

/** Sección de viewport completo con grid 4 columnas (solo landing) */
export function Sec({ children, id, rows }) {
  return (
    <section id={id} style={{
      height: `calc(100vh - ${TH}px)`,
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gridTemplateRows: rows || `${TH}px 1fr`,
      borderTop: B, borderLeft: B,
      overflow: "hidden",
    }}>
      {children}
    </section>
  );
}
