import { Link } from "react-router-dom";
import { FONTS, TRANSITIONS } from "@/design/tokens";
import { getPrometeoTopbarTokens } from "@/design/prometeoSystem";
import { T } from "@/shared/layout/topbar/topbar.utils";

export default function BrandLockup({
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
