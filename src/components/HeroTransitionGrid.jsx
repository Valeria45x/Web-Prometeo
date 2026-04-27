import { TH } from "../constants";
import { BORDERS, COLORS, GRID } from "../design/tokens";

export default function HeroTransitionGrid({
  className = "",
  background = COLORS.canvasLight,
  border = BORDERS.soft,
  columns = "transition",
  bottomBorder = false,
  invertBorder = false,
}) {
  const classes = ["hero-transition-grid", "community-divider", className]
    .filter(Boolean)
    .join(" ");
  const template =
    columns === "site"
      ? GRID.site
      : columns === "transition"
        ? "7fr 1fr"
        : columns;
  const cellCount = columns === "site" ? 4 : 2;

  return (
    <div
      aria-hidden="true"
      className={classes}
      style={{
        height: TH,
        borderTop: border,
        ...(bottomBorder ? { borderBottom: border } : {}),
        display: "grid",
        gridTemplateColumns: template,
        background,
      }}
    >
      {Array.from({ length: cellCount }).map((_, index) => {
        const isLastCell = index === cellCount - 1;
        const shouldHaveBorder = invertBorder
          ? index > 0
          : index < cellCount - 1;
        const borderStyle = invertBorder
          ? { borderLeft: border }
          : { borderRight: border };

        return (
          <div
            key={index}
            className="hero-transition-grid__cell"
            style={shouldHaveBorder ? borderStyle : undefined}
          />
        );
      })}
    </div>
  );
}
