import { useLocation } from "react-router-dom";
import { NAV, TH } from "@/constants";
import { GRID } from "@/design/tokens";
import { getPrometeoTopbarTokens } from "@/design/prometeoSystem";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { scrollToTopImmediate } from "@/lib/lenis";
import { T, getTopbarTheme } from "@/shared/layout/topbar/topbar.utils";
import { useTopbarState } from "@/shared/layout/topbar/useTopbarState";
import BrandLockup from "@/shared/layout/topbar/BrandLockup";
import DropdownPanel from "@/shared/layout/topbar/DropdownPanel";
import DesktopNav from "@/shared/layout/topbar/DesktopNav";
import MobileMenu from "@/shared/layout/topbar/MobileMenu";
import { CloseIcon, MenuIcon } from "@/shared/layout/topbar/icons";

export default function Topbar({
  light = false,
  showWordmark = true,
  background,
}) {
  const { pathname } = useLocation();
  const isCompactNav = useMediaQuery("(max-width: 1024px)");
  const {
    menuOpen,
    setMenuOpen,
    openDropdown,
    setOpenDropdown,
    mobileExpanded,
    setMobileExpanded,
    navRef,
    toggleDropdown,
  } = useTopbarState({ pathname, isCompactNav });

  const theme = getTopbarTheme(light, background);
  const wordmarkVisible = isCompactNav ? true : showWordmark;
  const compactTokens = getPrometeoTopbarTokens({ compact: true });

  // Activo si la ruta coincide con algún sub-elemento de la entrada de nav.
  const isActive = (item) =>
    item.items ? item.items.some((sub) => pathname === sub.to) : false;

  const handleNavClick =
    (to, closeMenu = false) =>
    (event) => {
      if (closeMenu) setMenuOpen(false);
      if (pathname === to) event.preventDefault();
      scrollToTopImmediate();
    };

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
            background: theme.bg,
            borderTop: theme.bd,
            borderBottom: theme.bd,
            height: TH,
            display: "grid",
            gridTemplateColumns: isCompactNav ? "minmax(0, 1fr) auto" : GRID.site,
            transition: T,
          }}
        >
          <div
            className="topbar__brand"
            style={{ borderRight: theme.bd, minWidth: 0, transition: T }}
          >
            <BrandLockup
              wordmark={theme.wordmark}
              onClick={handleNavClick("/")}
              compact={isCompactNav}
              visible={wordmarkVisible}
              hoverBg={theme.hoverBg}
              hoverText={theme.hoverText}
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
                "--topbar-hover-bg": theme.hoverBg,
                "--topbar-hover-text": theme.hoverText,
                background: theme.bg,
                color: theme.navText,
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
                <CloseIcon size={compactTokens.iconSize} />
              ) : (
                <MenuIcon size={compactTokens.iconSize} />
              )}
            </button>
          ) : (
            <DesktopNav
              theme={theme}
              pathname={pathname}
              openDropdown={openDropdown}
              onToggleDropdown={toggleDropdown}
              isActive={isActive}
              handleNavClick={handleNavClick}
            />
          )}
        </header>

        {!isCompactNav &&
          openDropdown &&
          (() => {
            const item = NAV.find((n) => n.label === openDropdown);
            if (!item || !item.items) return null;
            return (
              <div
                style={{ position: "absolute", top: TH, left: 0, right: 0, zIndex: 120 }}
              >
                <DropdownPanel
                  item={item}
                  theme={theme}
                  onClose={() => setOpenDropdown(null)}
                  pathname={pathname}
                />
              </div>
            );
          })()}
      </div>

      {isCompactNav && menuOpen ? (
        <MobileMenu
          theme={theme}
          pathname={pathname}
          isActive={isActive}
          handleNavClick={handleNavClick}
          mobileExpanded={mobileExpanded}
          onExpand={setMobileExpanded}
          onClose={() => setMenuOpen(false)}
        />
      ) : null}
    </>
  );
}
