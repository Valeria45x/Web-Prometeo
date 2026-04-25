import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { TH, NAV } from "../constants";
import { COLORS, LAYOUT, TRANSITIONS } from "../design/tokens";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { scrollToTopImmediate } from "../lib/lenis";

const T = `background ${TRANSITIONS.emphasis}, border-color ${TRANSITIONS.emphasis}, color ${TRANSITIONS.emphasis}`;

function ProfileIcon({ stroke }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  );
}

function MenuIcon({ stroke }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  );
}

function CloseIcon({ stroke }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 6l12 12" />
      <path d="M18 6L6 18" />
    </svg>
  );
}

export default function Topbar({
  light = false,
  showWordmark = true,
  background,
}) {
  const { pathname } = useLocation();
  const isCompactNav = useMediaQuery("(max-width: 1024px)");
  const [menuOpen, setMenuOpen] = useState(false);

  const bg = background ?? (light ? COLORS.pageLight : COLORS.canvasDark);
  const bd = `1px solid ${COLORS.grid}`;
  const accentBg = COLORS.accent;
  const accentText = COLORS.footerText;
  const wordmark = light ? COLORS.textOnLight : COLORS.textStrongDark;
  const navText = light ? COLORS.textOnLight : COLORS.textStrongDark;
  const wordmarkSize = "clamp(9px, 0.9vw, 11px)";
  const brandPadding = "0 clamp(16px, 1.7vw, 20px)";
  const wordmarkVisible = isCompactNav ? true : showWordmark;
  const mobileItems = [...NAV, { label: "Perfil", to: "/perfil", isProfile: true }];

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isCompactNav) {
      setMenuOpen(false);
    }
  }, [isCompactNav]);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [menuOpen]);

  const isActive = (to) => pathname === to;
  const handleNavClick = (to, closeMenu = false) => (event) => {
    if (closeMenu) {
      setMenuOpen(false);
    }

    if (pathname === to) {
      event.preventDefault();
    }

    scrollToTopImmediate();
  };

  return (
    <>
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
          display: "grid",
          gridTemplateColumns: isCompactNav
            ? "minmax(0, 1fr) auto"
            : "auto repeat(6, minmax(0, 1fr)) auto",
          transition: T,
        }}
      >
        <div
          className="topbar__brand"
          style={{
            borderRight: bd,
            borderBottom: bd,
            display: "flex",
            alignItems: "center",
            padding: brandPadding,
            minWidth: 0,
            transition: T,
          }}
        >
          <Link
            to="/"
            style={{ textDecoration: "none", minWidth: 0 }}
            onClick={handleNavClick("/")}
          >
            <span
              className="small-label topbar__wordmark"
              style={{
                color: wordmark,
                letterSpacing: "0.14em",
                fontWeight: 700,
                fontSize: wordmarkSize,
                transition: `${T}, opacity 0.5s cubic-bezier(0.16,1,0.3,1)`,
                opacity: wordmarkVisible ? 1 : 0,
                display: "inline-block",
                whiteSpace: "nowrap",
              }}
            >
              Prometeo
            </span>
          </Link>
        </div>

        {isCompactNav ? (
          <button
            type="button"
            className="topbar__menu-toggle"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Cerrar menu" : "Abrir menu"}
            onClick={() => setMenuOpen((current) => !current)}
            style={{
              background: bg,
              border: "none",
              borderRight: bd,
              borderBottom: bd,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: TH,
              minWidth: TH,
              padding: 0,
              cursor: "pointer",
              transition: T,
            }}
          >
            {menuOpen ? <CloseIcon stroke={navText} /> : <MenuIcon stroke={navText} />}
          </button>
        ) : (
          <>
            {NAV.map((item) => {
              const active = isActive(item.to);
              return (
                <div
                  key={item.to}
                  className="topbar__nav-cell"
                  style={{
                    background: active ? accentBg : bg,
                    borderRight: bd,
                    borderBottom: bd,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "0 clamp(8px, 0.85vw, 12px)",
                    minWidth: 0,
                    transition: T,
                  }}
                >
                  <Link
                    to={item.to}
                    className="nav-link topbar__nav-link"
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
              className="topbar__profile-cell"
              style={{
                background: isActive("/perfil") ? accentBg : bg,
                borderRight: bd,
                borderBottom: bd,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0 clamp(12px, 1vw, 16px)",
                transition: T,
              }}
            >
              <Link
                to="/perfil"
                style={{ display: "flex", alignItems: "center" }}
                onClick={handleNavClick("/perfil")}
                aria-label="Ir al perfil"
              >
                <ProfileIcon stroke={isActive("/perfil") ? accentText : navText} />
              </Link>
            </div>
          </>
        )}
      </header>

      {isCompactNav && menuOpen ? (
        <div
          className="topbar-menu"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 130,
            background: bg,
          }}
        >
          <div
            className="topbar-menu__frame"
            style={{
              maxWidth: LAYOUT.frameWidth,
              minHeight: "100dvh",
              margin: "0 auto",
              background: bg,
              borderLeft: bd,
              borderRight: bd,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              className="topbar-menu__header"
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(0, 1fr) auto",
                minHeight: TH,
                borderTop: bd,
              }}
            >
              <div
                className="topbar-menu__brand"
                style={{
                  borderRight: bd,
                  borderBottom: bd,
                  display: "flex",
                  alignItems: "center",
                  padding: brandPadding,
                }}
              >
                <Link
                  to="/"
                  style={{ textDecoration: "none" }}
                  onClick={handleNavClick("/", true)}
                >
                  <span
                    className="small-label"
                    style={{
                      color: wordmark,
                      letterSpacing: "0.14em",
                      fontWeight: 700,
                      fontSize: wordmarkSize,
                    }}
                  >
                    Prometeo
                  </span>
                </Link>
              </div>

              <button
                type="button"
                aria-label="Cerrar menu"
                onClick={() => setMenuOpen(false)}
                style={{
                  background: bg,
                  border: "none",
                  borderRight: bd,
                  borderBottom: bd,
                  width: TH,
                  minWidth: TH,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                <CloseIcon stroke={navText} />
              </button>
            </div>

            <nav
              className="topbar-menu__nav"
              aria-label="Menu principal"
              style={{ flex: 1, display: "flex", flexDirection: "column" }}
            >
              {mobileItems.map((item) => {
                const active = isActive(item.to);

                return (
                  <div
                    key={item.to}
                    className="topbar-menu__item"
                    style={{
                      background: active ? accentBg : bg,
                      borderRight: bd,
                      borderBottom: bd,
                      transition: T,
                    }}
                  >
                    <Link
                      to={item.to}
                      className="topbar-menu__link"
                      onClick={handleNavClick(item.to, true)}
                      style={{
                        color: active ? accentText : navText,
                        textDecoration: "none",
                        justifyContent: item.isProfile ? "space-between" : "flex-start",
                      }}
                    >
                      <span>{item.label}</span>
                      {item.isProfile ? (
                        <span className="topbar-menu__icon">
                          <ProfileIcon stroke={active ? accentText : navText} />
                        </span>
                      ) : null}
                    </Link>
                  </div>
                );
              })}
            </nav>
          </div>
        </div>
      ) : null}
    </>
  );
}
