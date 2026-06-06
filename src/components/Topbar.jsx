import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { TH, NAV } from "../constants";
import {
  BORDERS,
  COLORS,
  FONTS,
  GRID,
  LAYOUT,
  TRANSITIONS,
} from "../design/tokens";
import { getPrometeoTopbarTokens } from "../design/prometeoSystem";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { scrollToTopImmediate } from "../lib/lenis";
import { ACCOUNT_JOURNEY } from "./account/accountJourney";
import NavigationButton from "./system/NavigationButton";

const T = `background ${TRANSITIONS.emphasis}, color ${TRANSITIONS.emphasis}, box-shadow ${TRANSITIONS.emphasis}`;

function getHoverBg(light) {
  return light ? COLORS.grayDark : COLORS.grayWhite;
}

function getHoverText(light) {
  return light ? COLORS.textOnDark : COLORS.textOnLight;
}

function ProfileIcon({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  );
}

function MenuIcon({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
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

function CloseIcon({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 6l12 12" />
      <path d="M18 6L6 18" />
    </svg>
  );
}

function ChevronIcon({ open, size = 18 }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="butt"
      strokeLinejoin="miter"
      style={{
        display: "block",
        flexShrink: 0,
        transform: `translate3d(0, 0, 0) rotate(${open ? 180 : 0}deg)`,
        transformOrigin: "50% 50%",
        transformBox: "fill-box",
        transition: "transform 0.42s cubic-bezier(0.16,1,0.3,1)",
        willChange: "transform",
        backfaceVisibility: "hidden",
        shapeRendering: "geometricPrecision",
      }}
    >
      <path d="M5 7L9 11L13 7" />
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
  const topbarTokens = getPrometeoTopbarTokens({ compact });

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
        padding: topbarTokens.brandPadding,
        color: wordmark,
        transition: T,
      }}
    >
      <span
        style={{
          color: wordmark,
          fontFamily: FONTS.display,
          fontSize: topbarTokens.brandFontSize,
          fontWeight: 900,
          lineHeight: topbarTokens.brandLineHeight,
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

function DropdownPanel({
  item,
  bg,
  bd,
  navText,
  activeText,
  light,
  onClose,
  pathname,
}) {
  const topbarTokens = getPrometeoTopbarTokens();
  const mutedText =
    navText === COLORS.textOnLight
      ? COLORS.textMutedLight
      : COLORS.textMutedDark;
  const hoverBg = getHoverBg(light);
  const hoverText = getHoverText(light);
  const cells = Array.from(
    { length: 4 },
    (_, index) => item.items[index] ?? null,
  );

  return (
    <div
      className="topbar-dropdown-shell"
      aria-label={item.label}
      style={{
        background: bg,
        borderBottom: bd,
        display: "grid",
        gridTemplateColumns: GRID.site,
        overflow: "hidden",
        transition: T,
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
                background: bg,
                borderRight: isLast ? "none" : bd,
                minHeight: topbarTokens.dropdownMinHeight,
                transition: T,
              }}
            />
          );
        }

        const subActive = pathname === sub.to;
        return (
          <NavigationButton
            key={`${sub.to}-${i}`}
            as={Link}
            to={sub.to}
            label={sub.label}
            description={sub.description}
            surface={light ? "light" : "dark"}
            active={subActive}
            onClick={() => {
              onClose();
              scrollToTopImmediate();
            }}
            style={{
              "--ds-button-transition": TRANSITIONS.emphasis,
              "--ds-button-font-size": `${topbarTokens.dropdownTitleSize}px`,
              "--ds-button-line-height": topbarTokens.dropdownTitleLineHeight,
              "--ds-button-padding": topbarTokens.dropdownPadding,
              "--ds-button-border-width": isLast ? "0" : "0 1px 0 0",
              "--ds-button-border": light ? COLORS.gridLight : COLORS.grid,
              "--ds-navigation-description-font-size": `${topbarTokens.dropdownDescriptionSize}px`,
              "--ds-navigation-description-line-height":
                topbarTokens.dropdownDescriptionLineHeight,
              "--ds-navigation-content-gap": "8px",
              minHeight: topbarTokens.dropdownMinHeight,
              position: "relative",
            }}
            contentStyle={{
              alignItems: "start",
              alignContent: "start",
              minHeight: "100%",
              willChange: "transform",
              animation:
                "dropdownContentSettle 0.5s cubic-bezier(0.16,1,0.3,1) both",
            }}
            titleStyle={{ alignSelf: "start" }}
            descriptionStyle={{ alignSelf: "end", maxWidth: "28ch" }}
          />
        );
      })}
    </div>
  );
}

export default function Topbar({
  light = false,
  showWordmark = true,
  background,
}) {
  const { pathname } = useLocation();
  const isCompactNav = useMediaQuery("(max-width: 1024px)");
  const isPhoneCompactNav = useMediaQuery("(max-width: 767px)");
  const isTabletCompactNav = useMediaQuery(
    "(min-width: 768px) and (max-width: 1024px)",
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const navRef = useRef(null);

  const bg = background ?? (light ? COLORS.pageLight : COLORS.canvasDark);
  const bd = light ? BORDERS.light : BORDERS.dark;
  const navigationSurface = light ? "light" : "dark";
  const navActiveText = COLORS.accent;
  const wordmark = light ? COLORS.textOnLight : COLORS.textStrongDark;
  const navText = light ? COLORS.textOnLight : COLORS.textStrongDark;
  const mutedText = light ? COLORS.textMutedLight : COLORS.textMutedDark;
  const hoverBg = getHoverBg(light);
  const hoverText = getHoverText(light);
  const wordmarkVisible = isCompactNav ? true : showWordmark;
  const desktopTopbarTokens = getPrometeoTopbarTokens();
  const compactTopbarTokens = getPrometeoTopbarTokens({ compact: true });
  const compactMenuRowMinHeight = isTabletCompactNav ? 88 : TH;
  const compactMenuInset = isTabletCompactNav
    ? "24px 32px 32px"
    : "20px 16px 24px";
  const compactMenuSubmenuPadding = isTabletCompactNav
    ? "16px 32px 16px 32px"
    : compactTopbarTokens.submenuPadding;
  const compactMenuNavSize = isTabletCompactNav
    ? 22
    : compactTopbarTokens.navFontSize;
  const compactMenuLead = isTabletCompactNav
    ? "Explora la landing y entra en el bloque que más te interese."
    : "Privacidad digital que se entiende.";

  // Active if current path matches any sub-item of this nav entry
  const isActive = (item) => {
    if (item.items) return item.items.some((sub) => pathname === sub.to);
    return false;
  };

  const toggleDropdown = (to) => {
    setOpenDropdown((current) => (current === to ? null : to));
  };

  const handleNavClick =
    (to, closeMenu = false) =>
    (event) => {
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
    const handler = (e) => {
      if (e.key === "Escape") setOpenDropdown(null);
    };
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
        @keyframes dropdownContentSettle {
          from { opacity: 0; transform: translate3d(0, 4px, 0); }
          to   { opacity: 1; transform: translate3d(0, 0, 0); }
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
              : GRID.site,
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
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
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
              {menuOpen ? (
                <CloseIcon size={compactTopbarTokens.iconSize} />
              ) : (
                <MenuIcon size={compactTopbarTokens.iconSize} />
              )}
            </button>
          ) : (
            <>
              {NAV.map((item) => {
                const active = isActive(item);
                const isOpen = openDropdown === item.label;
                const hasItems = item.items && item.items.length > 0;
                const itemText = isOpen
                  ? hoverText
                  : active
                    ? navActiveText
                    : navText;

                return (
                  <button
                    key={item.label}
                    type="button"
                    className="topbar__nav-item"
                    data-active={active ? "true" : undefined}
                    data-expanded={isOpen ? "true" : undefined}
                    aria-haspopup={hasItems ? "menu" : undefined}
                    aria-expanded={isOpen}
                    aria-current={active ? "true" : undefined}
                    onClick={() => hasItems && toggleDropdown(item.label)}
                    style={{
                      "--topbar-hover-bg": hoverBg,
                      "--topbar-hover-text": hoverText,
                      position: "relative",
                      background: isOpen ? hoverBg : bg,
                      color: itemText,
                      border: "none",
                      borderRight: bd,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: desktopTopbarTokens.itemGap,
                      padding: desktopTopbarTokens.itemPadding,
                      minWidth: 0,
                      cursor: hasItems ? "pointer" : "default",
                      transition: T,
                      textAlign: "left",
                    }}
                  >
                    <span
                      className="nav-link topbar__nav-link"
                      style={{
                        color: itemText,
                        transition: T,
                        whiteSpace: "nowrap",
                        fontFamily: FONTS.sans,
                        fontSize: desktopTopbarTokens.navFontSize,
                        fontWeight: 800,
                        lineHeight: desktopTopbarTokens.navLineHeight,
                        letterSpacing: 0,
                        textAlign: "left",
                      }}
                    >
                      {item.label}
                    </span>
                    {hasItems && (
                      <ChevronIcon
                        open={isOpen}
                        size={desktopTopbarTokens.iconSize}
                      />
                    )}
                  </button>
                );
              })}

              {/* Profile */}
              <div
                className="topbar__profile-cell"
                style={{
                  background: bg,
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
                    gap: desktopTopbarTokens.itemGap,
                    width: "100%",
                    height: "100%",
                    padding: desktopTopbarTokens.itemPadding,
                    textDecoration: "none",
                    transition: T,
                  }}
                  onClick={handleNavClick("/perfil")}
                  aria-label="Ir a la cuenta Prometeo"
                >
                  <span
                    className="nav-link topbar__nav-link"
                    style={{
                      color: pathname === "/perfil" ? navActiveText : navText,
                      transition: T,
                      fontSize: desktopTopbarTokens.navFontSize,
                      fontWeight: 800,
                      lineHeight: desktopTopbarTokens.navLineHeight,
                      letterSpacing: 0,
                      textAlign: "left",
                    }}
                  >
                    {ACCOUNT_JOURNEY.navLabel}
                  </span>
                  <ProfileIcon size={desktopTopbarTokens.iconSize} />
                </Link>
              </div>
            </>
          )}
        </header>

        {/* Dropdown panel ? rendered inside sticky container so it scrolls with the nav */}
        {!isCompactNav &&
          openDropdown &&
          (() => {
            const item = NAV.find((n) => n.label === openDropdown);
            if (!item || !item.items) return null;
            return (
              <div
                style={{
                  position: "absolute",
                  top: TH,
                  left: 0,
                  right: 0,
                  zIndex: 120,
                }}
              >
                <DropdownPanel
                  item={item}
                  bg={bg}
                  bd={bd}
                  navText={navText}
                  activeText={navActiveText}
                  light={light}
                  onClose={() => setOpenDropdown(null)}
                  pathname={pathname}
                />
              </div>
            );
          })()}
      </div>

      {/* Mobile full-screen menu */}
      {isCompactNav && menuOpen ? (
        <div
          className="topbar-menu"
          style={{ position: "fixed", inset: 0, zIndex: 130, background: bg }}
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
                borderBottom: bd,
              }}
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
                aria-label="Cerrar menú"
                onClick={() => setMenuOpen(false)}
                style={{
                  "--topbar-hover-bg": hoverBg,
                  "--topbar-hover-text": hoverText,
                  background: bg,
                  border: "none",
                  color: navText,
                  width: TH,
                  minWidth: TH,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                <CloseIcon />
              </button>
            </div>

            <nav
              className="topbar-menu__nav"
              aria-label="Menú principal"
              style={{
                flex: 1,
                minHeight: 0,
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {NAV.map((item) => {
                const active = isActive(item);
                const expanded = mobileExpanded === item.label;
                const hasItems = item.items && item.items.length > 0;
                const itemText = expanded
                  ? hoverText
                  : active
                    ? navActiveText
                    : navText;

                return (
                  <div key={item.label}>
                    <button
                      type="button"
                      className="topbar-menu__group-button"
                      data-active={active ? "true" : undefined}
                      data-expanded={expanded ? "true" : undefined}
                      aria-expanded={expanded}
                      aria-current={active ? "true" : undefined}
                      onClick={() =>
                        hasItems &&
                        setMobileExpanded(expanded ? null : item.label)
                      }
                      style={{
                        "--topbar-hover-bg": hoverBg,
                        "--topbar-hover-text": hoverText,
                        width: "100%",
                        minHeight: compactMenuRowMinHeight,
                        background: expanded ? hoverBg : bg,
                        borderBottom: bd,
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        color: itemText,
                        transition: T,
                        display: "grid",
                        gridTemplateColumns: "minmax(0, 1fr) auto",
                        alignItems: "center",
                        gap: compactTopbarTokens.itemGap,
                        padding: compactTopbarTokens.itemPadding,
                        textAlign: "left",
                        cursor: hasItems ? "pointer" : "default",
                      }}
                    >
                      <span
                        style={{
                          color: itemText,
                          fontFamily: FONTS.sans,
                          fontSize: compactMenuNavSize,
                          fontWeight: 800,
                          lineHeight: compactTopbarTokens.navLineHeight,
                          letterSpacing: 0,
                        }}
                      >
                        {item.label}
                      </span>
                      {hasItems ? (
                        <ChevronIcon
                          open={expanded}
                          size={compactTopbarTokens.iconSize}
                        />
                      ) : null}
                    </button>

                    {expanded &&
                      hasItems &&
                      item.items.map((sub) => {
                        const subActive = pathname === sub.to;
                        return (
                          <div
                            key={sub.to}
                            style={{
                              background: bg,
                              borderBottom: bd,
                              transition: T,
                            }}
                          >
                            <NavigationButton
                              as={Link}
                              to={sub.to}
                              label={sub.label}
                              description={sub.description}
                              surface={navigationSurface}
                              active={subActive}
                              onClick={handleNavClick(sub.to, true)}
                              style={{
                                "--ds-button-transition": TRANSITIONS.emphasis,
                                "--ds-button-font-size": `${compactTopbarTokens.dropdownTitleSize}px`,
                                "--ds-button-line-height":
                                  compactTopbarTokens.dropdownTitleLineHeight,
                                "--ds-button-padding":
                                  compactMenuSubmenuPadding,
                                "--ds-navigation-description-font-size": `${compactTopbarTokens.dropdownDescriptionSize}px`,
                                "--ds-navigation-description-line-height":
                                  compactTopbarTokens.dropdownDescriptionLineHeight,
                                "--ds-navigation-content-gap": "4px",
                                minHeight: compactTopbarTokens.submenuMinHeight,
                              }}
                            />
                          </div>
                        );
                      })}
                  </div>
                );
              })}

              <div
                style={{
                  background: bg,
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
                    minHeight: compactMenuRowMinHeight,
                    display: "grid",
                    gridTemplateColumns: "minmax(0, 1fr) auto",
                    alignItems: "center",
                    gap: compactTopbarTokens.itemGap,
                    padding: compactTopbarTokens.itemPadding,
                    transition: T,
                  }}
                >
                  <span
                    style={{
                      color: pathname === "/perfil" ? navActiveText : navText,
                      fontFamily: FONTS.sans,
                      fontSize: compactMenuNavSize,
                      fontWeight: 800,
                      lineHeight: compactTopbarTokens.navLineHeight,
                    }}
                  >
                    {ACCOUNT_JOURNEY.navLabel}
                  </span>
                  <span className="topbar-menu__icon">
                    <ProfileIcon size={compactTopbarTokens.iconSize} />
                  </span>
                </Link>
              </div>

              <div
                className="topbar-menu__footer"
                style={{
                  marginTop: "auto",
                  borderTop: bd,
                  background: bg,
                  padding: compactMenuInset,
                  display: "grid",
                  gap: isPhoneCompactNav ? 12 : 16,
                }}
              >
                <p
                  style={{
                    margin: 0,
                    maxWidth: isTabletCompactNav ? "28ch" : "22ch",
                    color: mutedText,
                    fontFamily: FONTS.sans,
                    fontSize: isTabletCompactNav ? 15 : 14,
                    lineHeight: isTabletCompactNav ? "24px" : "20px",
                  }}
                >
                  {compactMenuLead}
                </p>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: isTabletCompactNav ? 16 : 12,
                    alignItems: "center",
                  }}
                >
                  <Link
                    to="/contacto"
                    onClick={handleNavClick("/contacto", true)}
                    style={{
                      color: navText,
                      textDecoration: "none",
                      fontFamily: FONTS.sans,
                      fontSize: 14,
                      lineHeight: "20px",
                      fontWeight: 800,
                    }}
                  >
                    Contacto
                  </Link>

                  <span
                    style={{
                      color: mutedText,
                      fontFamily: FONTS.sans,
                      fontSize: 14,
                      lineHeight: "20px",
                    }}
                  >
                    hola@prometeo.info
                  </span>
                </div>
              </div>
            </nav>
          </div>
        </div>
      ) : null}
    </>
  );
}
