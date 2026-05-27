export function getTransitionLineBackground({
  isMobileLayout,
  activeColumn,
  lineColor,
}) {
  if (isMobileLayout) return "none";

  const makeLine = (position) =>
    `linear-gradient(to right, transparent calc(${position} - 1px), ${lineColor} calc(${position} - 1px), ${lineColor} ${position}, transparent ${position})`;

  const linePositions = [
    activeColumn > 1 ? `${(activeColumn - 1) * 25}%` : null,
    activeColumn < 4 ? `${activeColumn * 25}%` : null,
  ].filter(Boolean);

  return linePositions.map(makeLine).join(", ") || "none";
}
