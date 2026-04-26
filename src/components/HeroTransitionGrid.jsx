import { TH } from "../constants";
import { BORDERS, COLORS } from "../design/tokens";

export default function HeroTransitionGrid({
  className = "",
  background = COLORS.canvasLight,
  border = BORDERS.soft,
}) {
  const classes = ["hero-transition-grid", "community-divider", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      aria-hidden="true"
      className={classes}
      style={{
        height: TH,
        borderTop: border,
        display: "grid",
        gridTemplateColumns: "7fr 1fr",
        background,
      }}
    >
      <div style={{ borderRight: border }} />
      <div />
    </div>
  );
}
