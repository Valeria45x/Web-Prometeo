import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { TH, NAV } from "../constants";
import { BORDERS, COLORS, FONTS, LAYOUT, TRANSITIONS } from "../design/tokens";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { scrollToTopImmediate } from "../lib/lenis";

const T = `background ${TRANSITIONS.emphasis}, color ${TRANSITIONS.emphasis}, box-shadow ${TRANSITIONS.emphasis}`;

function getHoverBg(light) {
  return light ? COLORS.grayDark : COLORS.grayLight;
}

function getHoverText(light) {
  return light ? COLORS.textOnDark : COLORS.textOnLight;
}

function getActiveBg() {
  return COLORS.accent;
}

function ProfileIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 6l12 12" />
      <path d="M18 6L6 18" />
    </svg>
  );
}

function ChevronIcon({ open }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
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

function BrandLockup({
  wordmark,
  onClick,
  compact = false,
  visible = true,
  hoverBg,
  hoverText,
}) {
  return (
    <Link
      to="/"
      className="topbar__brand-link"
      onClick={onClick}
      style={{
        "--topbar-hover-bg": hoverBg,
        "--topbar-hover-text": hoverText,
        textDecoration: "none",
        width: "100%",
        height: "100%",
        minWidth: 0,
        display: "flex",
        alignItems: "center",
        padding: compact ? "0 16px" : "0 32px",
        color: wordmark,
        transition: T,
      }}
    >
      <span
        style={{
          color: wordmark,
          fontFamily: FONTS.display,
          fontSize: compact ? 20 : 22,
          fontWeight: 900,
          lineHeight: compact ? "24px" : "24px",
          letterSpacing: 0,
          whiteSpace: "nowrap",
          clipPath: visible ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
          transform: visible ? "translateY(0)" : "translateY(4px)",
          transition: `clip-path ${TRANSITIONS.emphasis}, transform ${TRANSITIONS.emphasis}, color ${TRANSITIONS.emphasis}`,
        }}
      >
        Prometeo
      </span>
    </Link>
  );
}

function DropdownPanel({ item, bg, bd, navText, activeText, onClose, pathname }) {
  const mutedText = navText === COLORS.textOnLight ? COLORS.textMutedLight : COLORS.textMutedDark;
  const isLight = navText === COLORS.textOnLight;
  const hoverBg = getHoverBg(isLight);
  const hoverText = getHoverText(isLight);
  const activeBg = getActiveBg();
  const cells = Array.from({ length: 4 }, (_, index) => item.items[index] ?? null);

  return (
    <div
      className="topbar-dropdown"
      aria-label={item.label}
      style={{
        background: bg,
        borderBottom: bd,
        display: "grid",
        gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
        overflow: "hidden",
        animation: "dropdownReveal 0.34s cubic-bezier(0.16,1,0.3,1)",
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
                minHeight: 104,
              }}
            />
          );
        }

        const subActive = pathname === sub.to;
        return (
          <Link
            key={`${sub.to}-${i}`}
            className="topbar-dropdown__link"
            data-active={subActive ? "true" : undefined}
            to={sub.to}
            onClick={() => { onClose(); scrollToTopImmediate(); }}
            style={{
              "--topbar-dropdown-hover-bg": hoverBg,
              "--topbar-hover-text": hoverText,
              textDecoration: "none",
              borderRight: isLast ? "none" : bd,
              background: subActive ? activeBg : bg,
              color: subActive ? activeText : navText,
              padding: "16px 32px",
              display: "grid",
              gridTemplateRows: "auto auto",
              alignItems: "start",
              alignContent: "start",
              gap: 8,
              minHeight: 104,
              position: "relative",
              transition: T,
            }}
          >
            <span
              style={{
                alignSelf: "start",
                fontFamily: FONTS.sans,
                fontSize: 18,
                lineHeight: "24px",
                fontWeight: 800,
                letterSpacing: 0,
                color: subActive ? activeText : navText,
                transition: T,
              }}
            >
              {sub.label}
            </span>
            <span
              style={{
                alignSelf: "end",
                maxWidth: "28ch",
                fontFamily: FONTS.sans,
                fontSize: 13,
                color: subActive ? activeText : mutedText,
                letterSpacing: 0,
                lineHeight: "20px",
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
  const bd = light ? BORDERS.light : BORDERS.dark;
  const activeBg = getActiveBg();
  const navActiveText = COLORS.textOnAccent;
  const wordmark = light ? COLORS.textOnLight : COLORS.textStrongDark;
  const navText = light ? COLORS.textOnLight : COLORS.textStrongDark;
  const mutedText = light ? COLORS.textMutedLight : COLORS.textMutedDark;
  const hoverBg = getHoverBg(light);
  const hoverText = getHoverText(light);
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
        @keyframes dropdownReveal {
          from { clip-path: inset(0 0 100% 0); transform: translateY(-6px); }
          to   { clip-path: inset(0 0 0 0); transform: translateY(0); }
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
              minWidth: 0,
              transition: T,
            }}
          >
            <BrandLockup
              wordmark={wordmark}
              onClick={handleNavClick("/")}
              compact={isCompactNav}
              visible={wordmarkVisible}
              hoverBg={hoverBg}
              hoverText={hoverText}
            />
          </div>

          {isCompactNav ? (
            <button
              type="button"
              className="topbar__menu-toggle"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Cerrar menu" : "Abrir menu"}
              onClick={() => setMenuOpen((c) => !c)}
              style={{
                "--topbar-hover-bg": hoverBg,
                "--topbar-hover-text": hoverText,
                background: bg,
                color: navText,
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
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
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
                    className="topbar__nav-item"
                    data-active={active || isOpen ? "true" : undefined}
                    aria-haspopup={hasItems ? "menu" : undefined}
                    aria-expanded={isOpen}
                    onClick={() => hasItems && toggleDropdown(item.label)}
                    style={{
                      "--topbar-hover-bg": hoverBg,
                      "--topbar-hover-text": hoverText,
                      position: "relative",
                      background: active || isOpen ? activeBg : bg,
                      color: active || isOpen ? navActiveText : navText,
                      border: "none",
                      borderRight: bd,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 16,
                      padding: "0 32px",
                      minWidth: 0,
                      cursor: hasItems ? "pointer" : "default",
                      transition: T,
                      textAlign: "left",
                    }}
                  >
                    <span
                      className="nav-link topbar__nav-link"
                      style={{
                        color: active || isOpen ? navActiveText : navText,
                        transition: T,
                        whiteSpace: "nowrap",
                        fontFamily: FONTS.sans,
                        fontSize: 13,
                        lineHeight: "16px",
                        letterSpacing: "0.02em",
                        textAlign: "left",
                      }}
                    >
                      {item.label}
                    </span>
                    {hasItems && (
                      <ChevronIcon open={isOpen} />
                    )}
                  </button>
                );
              })}

              {/* Profile */}
              <div
                className="topbar__profile-cell"
                style={{
                  background: pathname === "/perfil" ? activeBg : bg,
                  minWidth: 0,
                  transition: T,
                }}
              >
                <Link
                  to="/perfil"
                  className="topbar__profile-link"
                  data-active={pathname === "/perfil" ? "true" : undefined}
                  style={{
                    "--topbar-hover-bg": hoverBg,
                    "--topbar-hover-text": hoverText,
                    position: "relative",
                    color: pathname === "/perfil" ? navActiveText : navText,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 16,
                    width: "100%",
                    height: "100%",
                    padding: "0 32px",
                    textDecoration: "none",
                    transition: T,
                  }}
                  onClick={handleNavClick("/perfil")}
                  aria-label="Ir al perfil"
                >
                  <span
                    className="nav-link topbar__nav-link"
                    style={{
                      color: pathname === "/perfil" ? navActiveText : navText,
                      transition: T,
                      fontSize: 13,
                      lineHeight: "16px",
                      letterSpacing: "0.02em",
                      textAlign: "left",
                    }}
                  >
                    Perfil
                  </span>
                  <ProfileIcon />
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
              activeText={navActiveText}
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
                style={{ borderRight: bd, minWidth: 0 }}
              >
                <BrandLockup
                  wordmark={wordmark}
                  onClick={handleNavClick("/", true)}
                  compact
                  visible
                  hoverBg={hoverBg}
                  hoverText={hoverText}
                />
              </div>
              <button
                type="button"
                className="topbar__menu-toggle"
                aria-label="Cerrar menu"
                onClick={() => setMenuOpen(false)}
                style={{
                  "--topbar-hover-bg": hoverBg,
                  "--topbar-hover-text": hoverText,
                  background: bg, border: "none",
                  color: navText,
                  width: TH, minWidth: TH, display: "flex", alignItems: "center",
                  justifyContent: "center", cursor: "pointer", padding: 0,
                }}
              >
                <CloseIcon />
              </button>
            </div>

            <nav className="topbar-menu__nav" aria-label="Menu principal" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              {NAV.map((item) => {
                const active = isActive(item);
                const expanded = mobileExpanded === item.label;
                const hasItems = item.items && item.items.length > 0;

                return (
                  <div key={item.label}>
                    <button
                      type="button"
                      className="topbar-menu__group-button"
                      data-active={active || expanded ? "true" : undefined}
                      aria-expanded={expanded}
                      onClick={() => hasItems && setMobileExpanded(expanded ? null : item.label)}
                      style={{
                        "--topbar-hover-bg": hoverBg,
                        "--topbar-hover-text": hoverText,
                        width: "100%",
                        minHeight: TH,
                        background: active || expanded ? activeBg : bg,
                        borderBottom: bd,
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        color: active || expanded ? navActiveText : navText,
                        transition: T,
                        display: "grid",
                        gridTemplateColumns: "minmax(0, 1fr) auto",
                        alignItems: "center",
                        gap: 16,
                        padding: "0 16px",
                        textAlign: "left",
                        cursor: hasItems ? "pointer" : "default",
                      }}
                    >
                      <span
                        style={{
                          color: active || expanded ? navActiveText : navText,
                          fontFamily: FONTS.sans,
                          fontSize: 20,
                          fontWeight: 800,
                          lineHeight: "24px",
                          letterSpacing: 0,
                        }}
                      >
                        {item.label}
                      </span>
                      {hasItems ? (
                        <ChevronIcon open={expanded} />
                      ) : null}
                    </button>

                    {expanded && hasItems && item.items.map((sub) => {
                      const subActive = pathname === sub.to;
                      return (
                        <div
                          key={sub.to}
                          style={{
                            background: subActive ? activeBg : bg,
                            borderBottom: bd,
                            transition: T,
                          }}
                        >
                          <Link
                            to={sub.to}
                            className="topbar-menu__sublink"
                            data-active={subActive ? "true" : undefined}
                            onClick={handleNavClick(sub.to, true)}
                            style={{
                              "--topbar-hover-bg": hoverBg,
                              "--topbar-hover-text": hoverText,
                              color: subActive ? navActiveText : navText,
                              textDecoration: "none",
                              display: "grid",
                              gridTemplateColumns: "minmax(0, 1fr)",
                              alignItems: "center",
                              gap: 16,
                              minHeight: 72,
                              padding: "12px 16px 12px 32px",
                              transition: T,
                            }}
                          >
                            <span style={{ display: "grid", gap: 4, minWidth: 0 }}>
                              <span
                                style={{
                                  color: subActive ? navActiveText : navText,
                                  fontFamily: FONTS.sans,
                                  fontSize: 16,
                                  fontWeight: 800,
                                  lineHeight: "20px",
                                }}
                              >
                                {sub.label}
                              </span>
                              <span
                                style={{
                                  color: subActive ? navActiveText : mutedText,
                                  fontFamily: FONTS.sans,
                                  fontSize: 13,
                                  lineHeight: "18px",
                                  letterSpacing: 0,
                                }}
                              >
                                {sub.description}
                              </span>
                            </span>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                );
              })}

              <div
                style={{
                  background: pathname === "/perfil" ? activeBg : bg,
                  borderBottom: bd,
                  transition: T,
                }}
              >
                <Link
                  to="/perfil"
                  className="topbar-menu__profile-link"
                  data-active={pathname === "/perfil" ? "true" : undefined}
                  onClick={handleNavClick("/perfil", true)}
                  style={{
                    "--topbar-hover-bg": hoverBg,
                    "--topbar-hover-text": hoverText,
                    color: pathname === "/perfil" ? navActiveText : navText,
                    textDecoration: "none",
                    minHeight: TH,
                    display: "grid",
                    gridTemplateColumns: "minmax(0, 1fr) auto",
                    alignItems: "center",
                    gap: 16,
                    padding: "0 16px",
                    transition: T,
                  }}
                >
                  <span
                    style={{
                      color: pathname === "/perfil" ? navActiveText : navText,
                      fontFamily: FONTS.sans,
                      fontSize: 20,
                      fontWeight: 800,
                      lineHeight: "24px",
                    }}
                  >
                    Perfil
                  </span>
                  <span className="topbar-menu__icon">
                    <ProfileIcon />
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
