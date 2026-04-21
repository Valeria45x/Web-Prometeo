import { Link, useLocation } from "react-router-dom";
import { TH, NAV } from "../constants";

const T =
  "background 0.9s cubic-bezier(0.16,1,0.3,1), border-color 0.9s cubic-bezier(0.16,1,0.3,1), color 0.9s cubic-bezier(0.16,1,0.3,1)";

export default function Topbar({ light = false, showWordmark = true }) {
  const { pathname } = useLocation();

  const bg = light ? "#efefef" : "#0a0a0a";
  const bd = light ? "1px solid #303030" : "1px solid #303030";
  const accentBg = "#ff3c54";
  const accentText = "#1a0509";
  const pageWhite = "#e4e4e4";
  const wordmark = light ? "#111" : "#bbb";

  const isActive = (to) => pathname === to;

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
          padding: "0 20px",
          transition: T,
        }}
      >
        <Link to="/" style={{ textDecoration: "none" }}>
          <span
            className="small-label"
            style={{
              color: wordmark,
              letterSpacing: "0.14em",
              transition: `${T}, opacity 0.5s cubic-bezier(0.16,1,0.3,1)`,
              opacity: showWordmark ? 1 : 0,
              display: "inline-block",
              whiteSpace: "nowrap",
            }}
          >
            Prometeo
          </span>
        </Link>
      </div>

      {/* Nav items — each in its own cell */}
      {NAV.map((n) => {
        const active = isActive(n.to);
        return (
          <div
            key={n.to}
            className="nav-hide"
            style={{
              background: active ? accentBg : bg,
              borderRight: bd,
              borderBottom: bd,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 12px",
              transition: T,
            }}
          >
            <Link
              to={n.to}
              className="nav-link"
              style={{
                color: active ? accentText : undefined,
                transition: T,
                whiteSpace: "nowrap",
              }}
            >
              {n.label}
            </Link>
          </div>
        );
      })}

      {/* Profile icon */}
      <div
        className="nav-hide"
        style={{
          background: isActive("/perfil") ? accentBg : bg,
          borderRight: bd,
          borderBottom: bd,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 16px",
          transition: T,
        }}
      >
        <Link to="/perfil" style={{ display: "flex", alignItems: "center" }}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke={isActive("/perfil") ? accentText : light ? "#111" : "#bbb"}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
          </svg>
        </Link>
      </div>
    </header>
  );
}
