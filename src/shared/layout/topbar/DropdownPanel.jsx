import { Link } from "react-router-dom";
import { COLORS, GRID, TRANSITIONS } from "@/design/tokens";
import { getPrometeoTopbarTokens } from "@/design/prometeoSystem";
import { scrollToTopImmediate } from "@/lib/lenis";
import NavigationButton from "@/shared/ui/NavigationButton";
import { T } from "@/shared/layout/topbar/topbar.utils";

export default function DropdownPanel({ item, theme, onClose, pathname }) {
  const { bg, bd, light } = theme;
  const topbarTokens = getPrometeoTopbarTokens();
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
