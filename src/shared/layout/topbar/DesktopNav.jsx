import { Link } from "react-router-dom";
import { NAV } from "@/constants";
import { FONTS } from "@/design/tokens";
import { getPrometeoTopbarTokens } from "@/design/prometeoSystem";
import { ACCOUNT_JOURNEY } from "@/shared/account/accountJourney";
import { T } from "@/shared/layout/topbar/topbar.utils";
import { ChevronIcon, ProfileIcon } from "@/shared/layout/topbar/icons";

export default function DesktopNav({
  theme,
  pathname,
  openDropdown,
  onToggleDropdown,
  isActive,
  handleNavClick,
}) {
  const { bg, bd, navText, navActiveText, hoverBg, hoverText } = theme;
  const tokens = getPrometeoTopbarTokens();

  return (
    <>
      {NAV.map((item) => {
        const active = isActive(item);
        const isOpen = openDropdown === item.label;
        const hasItems = item.items && item.items.length > 0;
        const itemText = isOpen ? hoverText : active ? navActiveText : navText;

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
            onClick={() => hasItems && onToggleDropdown(item.label)}
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
              gap: tokens.itemGap,
              padding: tokens.itemPadding,
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
                fontSize: tokens.navFontSize,
                fontWeight: 800,
                lineHeight: tokens.navLineHeight,
                letterSpacing: 0,
                textAlign: "left",
              }}
            >
              {item.label}
            </span>
            {hasItems && <ChevronIcon open={isOpen} size={tokens.iconSize} />}
          </button>
        );
      })}

      <div
        className="topbar__profile-cell"
        style={{ background: bg, minWidth: 0, transition: T }}
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
            gap: tokens.itemGap,
            width: "100%",
            height: "100%",
            padding: tokens.itemPadding,
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
              fontSize: tokens.navFontSize,
              fontWeight: 800,
              lineHeight: tokens.navLineHeight,
              letterSpacing: 0,
              textAlign: "left",
            }}
          >
            {ACCOUNT_JOURNEY.navLabel}
          </span>
          <ProfileIcon size={tokens.iconSize} />
        </Link>
      </div>
    </>
  );
}
