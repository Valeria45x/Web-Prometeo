import { Link, useLocation } from "react-router-dom";
import { TH, NAV } from "../constants";

const T =
  "background 0.9s cubic-bezier(0.16,1,0.3,1), border-color 0.9s cubic-bezier(0.16,1,0.3,1), color 0.9s cubic-bezier(0.16,1,0.3,1)";

export default function Topbar({ light = false, showWordmark = true }) {
  const { pathname } = useLocation();

  const bg = light ? "#f8f8f8" : "#0a0a0a";
  const bd = light ? "1px solid #111" : "1px solid #f2f2f2";
  const wordmark = light ? "#111" : "#bbb";
  const active = (to) =>
    pathname === to ? (light ? "#0a0a0a" : "#e0e0e0") : undefined;
  const mainNav = NAV.slice(0, 4);
  const featuredNav =
    mainNav.find((item) => item.to === pathname) ?? mainNav[0];
  const groupedNav = mainNav.filter((item) => item.to !== featuredNav.to);

  return (
    <header
      className="topbar"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: bg,
        borderTop: bd,
        borderLeft: bd,
        height: TH,
        transition: T,
      }}
    >
      {/* Wordmark */}
      <div
        style={{
          borderRight: bd,
          borderBottom: bd,
          display: "flex",
          alignItems: "center",
          padding: "0 24px",
          transition: T,
        }}
      >
        <Link to="/" style={{ textDecoration: "none" }}>
          <span
            className="small-label"
            style={{
              color: wordmark,
              letterSpacing: "0.22em",
              transition: `${T}, opacity 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.5s cubic-bezier(0.16,1,0.3,1)`,
              opacity: showWordmark ? 1 : 0,
              transform: showWordmark ? "translateY(0)" : "translateY(-6px)",
              display: "inline-block",
            }}
          >
            Proyecto Prometeo
          </span>
        </Link>
      </div>

      {/* Main section for active page — hidden on mobile */}
      <div
        className="nav-hide"
        style={{
          borderRight: bd,
          borderBottom: bd,
          display: "flex",
          alignItems: "center",
          padding: "0 24px",
          transition: T,
        }}
      >
        <Link
          to={featuredNav.to}
          className="nav-link"
          style={{ color: active(featuredNav.to), transition: T }}
        >
          {featuredNav.label}
        </Link>
      </div>

      {/* Remaining main navigation — hidden on mobile */}
      <div
        className="nav-hide"
        style={{
          borderRight: bd,
          borderBottom: bd,
          display: "flex",
          alignItems: "center",
          gap: 28,
          padding: "0 24px",
          transition: T,
        }}
      >
        {groupedNav.map((n) => (
          <Link
            key={n.to}
            to={n.to}
            className="nav-link"
            style={{ color: active(n.to), transition: T }}
          >
            {n.label}
          </Link>
        ))}
      </div>

      {/* Contacto */}
      <div
        style={{
          borderRight: bd,
          borderBottom: bd,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: "0 24px",
          transition: T,
        }}
      >
        <Link
          to="/contacto"
          className="nav-link"
          style={{ color: active("/contacto"), transition: T }}
        >
          Contacto
        </Link>
      </div>
    </header>
  );
}
