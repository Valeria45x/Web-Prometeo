import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { TH, NAV } from "../constants";
import { COLORS, FONTS, LAYOUT, TRANSITIONS } from "../design/tokens";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { scrollToTopImmediate } from "../lib/lenis";

const T = `background ${TRANSITIONS.emphasis}, color ${TRANSITIONS.emphasis}, opacity ${TRANSITIONS.emphasis}, box-shadow ${TRANSITIONS.emphasis}`;

function ProfileIcon({ stroke }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  );
}

function MenuIcon({ stroke }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  );
}

function CloseIcon({ stroke }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 6l12 12" />
      <path d="M18 6L6 18" />
    </svg>
  );
}

function ChevronIcon({ stroke, open }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        transition: "transform 0.25s cubic-bezier(0.16,1,0.3,1)",
        transform: open ? "rotate(180deg)" : "rotate(0deg)",
        flexShrink: 0,
      }}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function DropdownPanel({ item, bg, bd, navText, accentBg, onClose, pathname }) {
  const mutedText = navText === COLORS.textOnLight ? COLORS.textMutedLight : COLORS.textMutedDark;
  const cells = Array.from({ length: 4 }, (_, index) => item.items[index] ?? null);

  return (
    <div
      className="topbar-dropdown"
      style={{
        background: bg,
        borderBottom: bd,
        display: "grid",
        gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
        animation: "dropdownFadeIn 0.18s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      {cells.map((sub, i) => {
        const isLast = i === cells.length - 1;

        if (!sub) {
          return (
            <div
              key={`empty-${i}`}
              aria-hidden="true"
              style={{
                borderRight: isLast ? "none" : bd,
                minHeight: 128,
              }}
            />
          );
        }

        const subActive = pathname === sub.to;
        return (
          <Link
            key={`${sub.to}-${i}`}
            to={sub.to}
            onClick={() => { onClose(); scrollToTopImmediate(); }}
            style={{
              textDecoration: "none",
              borderRight: isLast ? "none" : bd,
              background: subActive ? "rgba(255, 10, 84, 0.08)" : "transparent",
              boxShadow: subActive ? `inset 0 -4px 0 ${accentBg}` : "none",
              padding: "16px 32px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 16,
              minHeight: 128,
              transition: T,
            }}
          >
            <span
              style={{
                fontFamily: FONTS.display,
                fontSize: 16,
                lineHeight: "32px",
                fontWeight: 800,
                letterSpacing: 0,
                color: subActive ? COLORS.accent : navText,
                transition: T,
              }}
            >
              {sub.label}
            </span>
            <span
              style={{
                fontFamily: FONTS.mono,
                fontSize: 8,
                color: subActive ? COLORS.accent : mutedText,
                letterSpacing: "0.08em",
                lineHeight: "16px",
                transition: T,
              }}
            >
              {sub.description}
            </span>
          </Link>
        );
      })}
    </div>
  );
}

export default function Topbar({ light = false, showWordmark = true, background }) {
  const { pathname } = useLocation();
  const isCompactNav = useMediaQuery("(max-width: 1024px)");
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const navRef = useRef(null);

  const bg = background ?? (light ? COLORS.pageLight : COLORS.canvasDark);
  const bd = `1px solid ${COLORS.grid}`;
  const accentBg = COLORS.accent;
  const accentText = COLORS.footerText;
  const wordmark = light ? COLORS.textOnLight : COLORS.textStrongDark;
  const navText = light ? COLORS.textOnLight : COLORS.textStrongDark;
  const wordmarkSize = 8;
  const brandPadding = "0 16px";
  const wordmarkVisible = isCompactNav ? true : showWordmark;

  // Active if current path matches any sub-item of this nav entry
  const isActive = (item) => {
    if (item.items) return item.items.some((sub) => pathname === sub.to);
    return false;
  };

  const toggleDropdown = (to) => {
    setOpenDropdown((current) => (current === to ? null : to));
  };

  const handleNavClick = (to, closeMenu = false) => (event) => {
    if (closeMenu) setMenuOpen(false);
    if (pathname === to) event.preventDefault();
    scrollToTopImmediate();
  };

  // Close dropdown on outside click
  useEffect(() => {
    if (!openDropdown) return undefined;
    const handler = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [openDropdown]);

  // Close on Escape
  useEffect(() => {
    if (!openDropdown) return undefined;
    const handler = (e) => { if (e.key === "Escape") setOpenDropdown(null); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [openDropdown]);

  // Reset on route change
  useEffect(() => {
    setMenuOpen(false);
    setOpenDropdown(null);
    setMobileExpanded(null);
  }, [pathname]);

  useEffect(() => {
    if (!isCompactNav) setMenuOpen(false);
  }, [isCompactNav]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const prev = document.body.style.overflow;
    const prevHtml = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
      document.documentElement.style.overflow = prevHtml;
    };
  }, [menuOpen]);

  return (
    <>
      <style>{`
        @keyframes dropdownFadeIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div ref={navRef} style={{ position: "sticky", top: 0, zIndex: 100 }}>
        <header
          className="topbar"
          style={{
            background: bg,
            borderTop: bd,
            borderBottom: bd,
            height: TH,
            display: "grid",
            gridTemplateColumns: isCompactNav
              ? "minmax(0, 1fr) auto"
              : "repeat(4, minmax(0, 1fr))",
            transition: T,
          }}
        >
          {/* Brand */}
          <div
            className="topbar__brand"
            style={{
              borderRight: bd,
              display: "flex",
              alignItems: "center",
              padding: "0 32px",
              minWidth: 0,
              transition: T,
            }}
          >
            <Link to="/" style={{ textDecoration: "none", minWidth: 0 }} onClick={handleNavClick("/")}>
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
              onClick={() => setMenuOpen((c) => !c)}
              style={{
                background: bg,
                border: "none",
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
                const active = isActive(item);
                const isOpen = openDropdown === item.label;
                const hasItems = item.items && item.items.length > 0;

                return (
                  <button
                    key={item.label}
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => hasItems && toggleDropdown(item.label)}
                    style={{
                      background: bg,
                      boxShadow: active || isOpen ? `inset 0 -4px 0 ${accentBg}` : "none",
                      border: "none",
                      borderRight: bd,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 6,
                      padding: "0 12px",
                      minWidth: 0,
                      cursor: hasItems ? "pointer" : "default",
                      transition: T,
                    }}
                  >
                    <span
                      className="nav-link topbar__nav-link"
                      style={{
                        color: active || isOpen ? COLORS.accent : navText,
                        opacity: active || isOpen ? 1 : 0.72,
                        transition: T,
                        whiteSpace: "nowrap",
                        fontFamily: FONTS.sans,
                        fontSize: "inherit",
                      }}
                    >
                      {item.label}
                    </span>
                    {hasItems && (
                      <ChevronIcon stroke={active || isOpen ? COLORS.accent : navText} open={isOpen} />
                    )}
                  </button>
                );
              })}

              {/* Profile */}
              <div
                className="topbar__profile-cell"
                style={{
                  background: bg,
                  boxShadow: pathname === "/perfil" ? `inset 0 -4px 0 ${accentBg}` : "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0 32px",
                  transition: T,
                }}
              >
                <Link
                  to="/perfil"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    width: "100%",
                    height: "100%",
                    textDecoration: "none",
                  }}
                  onClick={handleNavClick("/perfil")}
                  aria-label="Ir al perfil"
                >
                  <span
                    className="nav-link topbar__nav-link"
                    style={{
                      color: pathname === "/perfil" ? COLORS.accent : navText,
                      opacity: pathname === "/perfil" ? 1 : 0.72,
                      transition: T,
                    }}
                  >
                    Perfil
                  </span>
                  <ProfileIcon stroke={pathname === "/perfil" ? COLORS.accent : navText} />
                </Link>
              </div>
            </>
          )}
        </header>

        {/* Dropdown panel ? rendered inside sticky container so it scrolls with the nav */}
        {!isCompactNav && openDropdown && (() => {
          const item = NAV.find((n) => n.label === openDropdown);
          if (!item || !item.items) return null;
          return (
            <DropdownPanel
              item={item}
              bg={bg}
              bd={bd}
              navText={navText}
              accentBg={accentBg}
              onClose={() => setOpenDropdown(null)}
              pathname={pathname}
            />
          );
        })()}
      </div>

      {/* Mobile full-screen menu */}
      {isCompactNav && menuOpen ? (
        <div className="topbar-menu" style={{ position: "fixed", inset: 0, zIndex: 130, background: bg }}>
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
              style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) auto", minHeight: TH, borderTop: bd, borderBottom: bd }}
            >
              <div
                className="topbar-menu__brand"
                style={{ borderRight: bd, display: "flex", alignItems: "center", padding: brandPadding }}
              >
                <Link to="/" style={{ textDecoration: "none" }} onClick={handleNavClick("/", true)}>
                  <span className="small-label" style={{ color: wordmark, letterSpacing: "0.14em", fontWeight: 700, fontSize: wordmarkSize }}>
                    Prometeo
                  </span>
                </Link>
              </div>
              <button
                type="button"
                aria-label="Cerrar menu"
                onClick={() => setMenuOpen(false)}
                style={{
                  background: bg, border: "none",
                  width: TH, minWidth: TH, display: "flex", alignItems: "center",
                  justifyContent: "center", cursor: "pointer", padding: 0,
                }}
              >
                <CloseIcon stroke={navText} />
              </button>
            </div>

            <nav className="topbar-menu__nav" aria-label="Menu principal" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              {NAV.map((item) => {
                const active = isActive(item);
                const expanded = mobileExpanded === item.label;
                const hasItems = item.items && item.items.length > 0;

                return (
                  <div key={item.label}>
                    <div
                      className="topbar-menu__item"
                      style={{
                        background: active && !expanded ? accentBg : bg,
                        borderBottom: bd,
                        transition: T,
                        display: "flex",
                      }}
                    >
                      <span
                        className="topbar-menu__link"
                        style={{
                          flex: 1,
                          color: active && !expanded ? accentText : navText,
                          display: "flex",
                          alignItems: "center",
                          padding: "0 16px",
                          cursor: "default",
                        }}
                      >
                        {item.label}
                      </span>
                      {hasItems && (
                        <button
                          type="button"
                          aria-label={expanded ? `Cerrar ${item.label}` : `Ver ${item.label}`}
                          onClick={() => setMobileExpanded(expanded ? null : item.label)}
                          style={{
                            background: "transparent",
                            border: "none",
                            borderLeft: bd,
                            width: TH,
                            minWidth: TH,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            padding: 0,
                          }}
                        >
                          <ChevronIcon stroke={active && !expanded ? accentText : navText} open={expanded} />
                        </button>
                      )}
                    </div>

                    {expanded && hasItems && item.items.map((sub) => {
                      const subActive = pathname === sub.to;
                      return (
                        <div
                          key={sub.to}
                          style={{
                            background: subActive ? accentBg : bg,
                            borderBottom: bd,
                            transition: T,
                          }}
                        >
                          <Link
                            to={sub.to}
                            className="topbar-menu__link"
                            onClick={handleNavClick(sub.to, true)}
                            style={{
                              color: subActive ? accentText : navText,
                              textDecoration: "none",
                              justifyContent: "flex-start",
                              paddingLeft: 32,
                              opacity: subActive ? 1 : 0.7,
                              display: "flex",
                              alignItems: "center",
                              minHeight: TH,
                            }}
                          >
                            <span>{sub.label}</span>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                );
              })}

              <div
                className="topbar-menu__item"
                style={{
                  background: pathname === "/perfil" ? accentBg : bg,
                  borderBottom: bd,
                  transition: T,
                }}
              >
                <Link
                  to="/perfil"
                  className="topbar-menu__link"
                  onClick={handleNavClick("/perfil", true)}
                  style={{
                    color: pathname === "/perfil" ? accentText : navText,
                    textDecoration: "none",
                    justifyContent: "space-between",
                  }}
                >
                  <span>Perfil</span>
                  <span className="topbar-menu__icon">
                    <ProfileIcon stroke={pathname === "/perfil" ? accentText : navText} />
                  </span>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      ) : null}
    </>
  );
}
