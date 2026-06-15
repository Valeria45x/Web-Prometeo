import { Link } from "react-router-dom";
import { NAV, TH } from "@/constants";
import { FONTS, LAYOUT, TRANSITIONS } from "@/design/tokens";
import { getPrometeoTopbarTokens } from "@/design/prometeoSystem";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { ACCOUNT_JOURNEY } from "@/shared/account/accountJourney";
import NavigationButton from "@/shared/ui/NavigationButton";
import { T } from "@/shared/layout/topbar/topbar.utils";
import BrandLockup from "@/shared/layout/topbar/BrandLockup";
import { CloseIcon, ChevronIcon, ProfileIcon } from "@/shared/layout/topbar/icons";

export default function MobileMenu({
  theme,
  pathname,
  isActive,
  handleNavClick,
  mobileExpanded,
  onExpand,
  onClose,
}) {
  const {
    bg,
    bd,
    navText,
    navActiveText,
    mutedText,
    hoverBg,
    hoverText,
    wordmark,
    navigationSurface,
  } = theme;

  const isPhoneCompactNav = useMediaQuery("(max-width: 767px)");
  const isTabletCompactNav = useMediaQuery(
    "(min-width: 768px) and (max-width: 1024px)",
  );
  const tokens = getPrometeoTopbarTokens({ compact: true });
  const rowMinHeight = isTabletCompactNav ? 88 : TH;
  const inset = isTabletCompactNav ? "24px 32px 32px" : "20px 16px 24px";
  const submenuPadding = isTabletCompactNav
    ? "16px 32px 16px 32px"
    : tokens.submenuPadding;
  const navSize = isTabletCompactNav ? 22 : tokens.navFontSize;
  const lead = isTabletCompactNav
    ? "Explora la landing y entra en el bloque que más te interese."
    : "Privacidad digital que se entiende.";

  return (
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
            onClick={onClose}
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
                    hasItems && onExpand(expanded ? null : item.label)
                  }
                  style={{
                    "--topbar-hover-bg": hoverBg,
                    "--topbar-hover-text": hoverText,
                    width: "100%",
                    minHeight: rowMinHeight,
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
                    gap: tokens.itemGap,
                    padding: tokens.itemPadding,
                    textAlign: "left",
                    cursor: hasItems ? "pointer" : "default",
                  }}
                >
                  <span
                    style={{
                      color: itemText,
                      fontFamily: FONTS.sans,
                      fontSize: navSize,
                      fontWeight: 800,
                      lineHeight: tokens.navLineHeight,
                      letterSpacing: 0,
                    }}
                  >
                    {item.label}
                  </span>
                  {hasItems ? (
                    <ChevronIcon open={expanded} size={tokens.iconSize} />
                  ) : null}
                </button>

                {expanded &&
                  hasItems &&
                  item.items.map((sub) => {
                    const subActive = pathname === sub.to;
                    return (
                      <div
                        key={sub.to}
                        style={{ background: bg, borderBottom: bd, transition: T }}
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
                            "--ds-button-font-size": `${tokens.dropdownTitleSize}px`,
                            "--ds-button-line-height":
                              tokens.dropdownTitleLineHeight,
                            "--ds-button-padding": submenuPadding,
                            "--ds-navigation-description-font-size": `${tokens.dropdownDescriptionSize}px`,
                            "--ds-navigation-description-line-height":
                              tokens.dropdownDescriptionLineHeight,
                            "--ds-navigation-content-gap": "4px",
                            minHeight: tokens.submenuMinHeight,
                          }}
                        />
                      </div>
                    );
                  })}
              </div>
            );
          })}

          <div style={{ background: bg, borderBottom: bd, transition: T }}>
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
                minHeight: rowMinHeight,
                display: "grid",
                gridTemplateColumns: "minmax(0, 1fr) auto",
                alignItems: "center",
                gap: tokens.itemGap,
                padding: tokens.itemPadding,
                transition: T,
              }}
            >
              <span
                style={{
                  color: pathname === "/perfil" ? navActiveText : navText,
                  fontFamily: FONTS.sans,
                  fontSize: navSize,
                  fontWeight: 800,
                  lineHeight: tokens.navLineHeight,
                }}
              >
                {ACCOUNT_JOURNEY.navLabel}
              </span>
              <span className="topbar-menu__icon">
                <ProfileIcon size={tokens.iconSize} />
              </span>
            </Link>
          </div>

          <div
            className="topbar-menu__footer"
            style={{
              marginTop: "auto",
              borderTop: bd,
              background: bg,
              padding: inset,
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
              {lead}
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
  );
}
