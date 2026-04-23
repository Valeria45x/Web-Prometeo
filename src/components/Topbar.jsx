import { Link, useLocation } from "react-router-dom";
import { TH, NAV } from "../constants";
import { COLORS, TRANSITIONS } from "../design/tokens";
import { scrollToTopImmediate } from "../lib/lenis";

const T = `background ${TRANSITIONS.emphasis}, border-color ${TRANSITIONS.emphasis}, color ${TRANSITIONS.emphasis}`;

export default function Topbar({ light = false, showWordmark = true, background }) {
  const { pathname } = useLocation();

  const bg = background ?? (light ? COLORS.pageLight : COLORS.canvasDark);
  const bd = `1px solid ${COLORS.grid}`;
  const accentBg = COLORS.accent;
  const accentText = COLORS.footerText;
  const wordmark = light ? COLORS.textOnLight : COLORS.textStrongDark;
  const navText = light ? COLORS.textOnLight : COLORS.textStrongDark;

  const isActive = (to) => pathname === to;
  const handleNavClick = (to) => (event) => {
    if (pathname === to) {
      event.preventDefault();
    }

    scrollToTopImmediate();
  };

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
        <Link
          to="/"
          style={{ textDecoration: "none" }}
          onClick={handleNavClick("/")}
        >
          <span
            className="small-label"
            style={{
              color: wordmark,
              letterSpacing: "0.14em",
              fontWeight: 700,
              fontSize: "11px",
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

      {NAV.map((item) => {
        const active = isActive(item.to);
        return (
          <div
            key={item.to}
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
              to={item.to}
              className="nav-link"
              onClick={handleNavClick(item.to)}
              style={{
                color: active ? accentText : navText,
                transition: T,
                whiteSpace: "nowrap",
              }}
            >
              {item.label}
            </Link>
          </div>
        );
      })}

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
        <Link
          to="/perfil"
          style={{ display: "flex", alignItems: "center" }}
          onClick={handleNavClick("/perfil")}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke={isActive("/perfil") ? accentText : navText}
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
