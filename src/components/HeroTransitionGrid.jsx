import { TH } from "../constants";
import { BORDERS, COLORS, GRID } from "../design/tokens";

const TRANSITION_PATTERNS = {
  full: [1, 1, 1, 1],
  "stagger-right": [2, 1, 1],
  "stagger-left": [1, 1, 2],
  center: [1, 2, 1],
};

function getTrackCount(columns) {
  if (columns === "site" || columns === "transition") return 4;
  if (columns === "halves") return 2;
  if (columns === "thirds") return 3;

  return null;
}

function getSegments(columns, pattern) {
  const trackCount = getTrackCount(columns);

  if (!trackCount) {
    return [1, 1];
  }

  if (trackCount !== 4) {
    return Array.from({ length: trackCount }, () => 1);
  }

  const segments = TRANSITION_PATTERNS[pattern] ?? TRANSITION_PATTERNS.full;
  const spanTotal = segments.reduce((total, span) => total + span, 0);

  return spanTotal === trackCount ? segments : TRANSITION_PATTERNS.full;
}

export default function HeroTransitionGrid({
  className = "",
  background = COLORS.canvasLight,
  border = BORDERS.soft,
  columns = "transition",
  pattern = "full",
  topBorder = false,
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
        ? GRID.site
        : columns;
  const segments = getSegments(columns, pattern);

  return (
    <div
      aria-hidden="true"
      className={classes}
      style={{
        height: TH,
        ...(topBorder ? { borderTop: border } : {}),
        ...(bottomBorder ? { borderBottom: border } : {}),
        display: "grid",
        gridTemplateColumns: template,
        background,
      }}
    >
      {segments.map((span, index) => {
        const shouldHaveBorder = invertBorder
          ? index > 0
          : index < segments.length - 1;
        const borderStyle = invertBorder
          ? { borderLeft: border }
          : { borderRight: border };

        return (
          <div
            key={index}
            className="hero-transition-grid__cell"
            style={{
              ...(span > 1 ? { gridColumn: `span ${span}` } : {}),
              ...(shouldHaveBorder ? borderStyle : {}),
            }}
          />
        );
      })}
    </div>
  );
}
