import { Link, useLocation } from "react-router-dom";
import { B, TH, NAV } from "../constants";

export default function Topbar() {
  const { pathname } = useLocation();
  const active = (to) => pathname === to ? "#e0e0e0" : undefined;

  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 100,
      background: "#0a0a0a",
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      borderTop: B, borderLeft: B,
      height: TH,
    }}>
      {/* Wordmark */}
      <div style={{ borderRight: B, borderBottom: B, display: "flex", alignItems: "center", padding: "0 24px" }}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="small-label" style={{ color: "#bbb", letterSpacing: "0.22em" }}>
            Proyecto Prometeo
          </span>
        </Link>
      </div>

      {/* Sobre Nosotros */}
      <div style={{ borderRight: B, borderBottom: B, display: "flex", alignItems: "center", padding: "0 24px" }}>
        <Link to="/" className="nav-link" style={{ color: active("/") }}>
          Sobre Nosotros
        </Link>
      </div>

      {/* Certificación · Tienda · Artículos */}
      <div style={{ borderRight: B, borderBottom: B, display: "flex", alignItems: "center", gap: 28, padding: "0 24px" }}>
        {NAV.slice(1, 4).map(n => (
          <Link key={n.to} to={n.to} className="nav-link" style={{ color: active(n.to) }}>
            {n.label}
          </Link>
        ))}
      </div>

      {/* Contacto */}
      <div style={{ borderRight: B, borderBottom: B, display: "flex", alignItems: "center", justifyContent: "flex-end", padding: "0 24px" }}>
        <Link to="/contacto" className="nav-link" style={{ color: active("/contacto") }}>
          Contacto
        </Link>
      </div>
    </header>
  );
}
