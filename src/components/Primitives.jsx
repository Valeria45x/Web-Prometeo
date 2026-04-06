import { B, TH } from "../constants";

/** Celda de grid. span / rowSpan / bg / style override */
export function C({ children, span = 1, rowSpan = 1, bg, style = {}, className = "" }) {
  return (
    <div className={className} style={{
      gridColumn: `span ${span}`,
      gridRow: rowSpan > 1 ? `span ${rowSpan}` : undefined,
      background: bg,
      borderRight: B, borderBottom: B,
      padding: 24, minWidth: 0, minHeight: 0, overflow: "hidden",
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
export function Sec({ children, id, rows, className = "" }) {
  return (
    <section id={id} className={`sec-grid ${className}`} style={{
      height: `calc(100vh - ${TH}px)`,
      gridTemplateRows: rows || `${TH}px 1fr`,
      borderTop: B, borderLeft: B,
      overflow: "hidden",
    }}>
      {children}
    </section>
  );
}
