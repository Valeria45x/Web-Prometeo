import {
  MOVE_CENTER_LINE_NUDGE,
  MOVE_GRID_LINES,
  MOVE_IMAGE_RECTS,
} from "./prometeoScroll.config";

export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export function smoothstep(value) {
  const normalizedValue = clamp(value, 0, 1);
  return normalizedValue * normalizedValue * (3 - 2 * normalizedValue);
}

export function getNavbarDividerX(containerLeft) {
  const empresasButton = Array.from(
    document.querySelectorAll(".topbar__nav-item"),
  ).find((element) => element.textContent?.includes("Para empresas"));

  if (empresasButton) {
    return Number(
      (
        empresasButton.getBoundingClientRect().right -
        containerLeft +
        MOVE_CENTER_LINE_NUDGE
      ).toFixed(3),
    );
  }

  const profileCell = document.querySelector(".topbar__profile-cell");

  if (profileCell) {
    return Number(
      (
        profileCell.getBoundingClientRect().left -
        containerLeft +
        MOVE_CENTER_LINE_NUDGE
      ).toFixed(3),
    );
  }

  return null;
}

export function getSnappedGridLines(size, middleOverride = null) {
  const lines = MOVE_GRID_LINES.map((line) => Math.round((size * line) / 100));

  if (typeof middleOverride === "number") {
    lines[1] = Math.max(0, Math.min(size, middleOverride));
  }

  return lines;
}

export function getAxisEdge(percent, size, snappedLines) {
  if (percent === 0) return 0;
  if (percent === 25) return snappedLines[0];
  if (percent === 50) return snappedLines[1];
  if (percent === 75) return snappedLines[2];
  if (percent === 100) return size;

  return Math.round((size * percent) / 100);
}

export function getMoveImageLayout(
  visual,
  fieldWidth,
  fieldHeight,
  isMobileLayout,
  centerLineX,
) {
  if (!fieldWidth || !fieldHeight) return null;

  if (isMobileLayout) {
    const inset = 16;
    return {
      left: inset,
      top: inset,
      right: Math.max(inset, fieldWidth - inset),
      bottom: Math.max(inset, fieldHeight - inset),
    };
  }

  const rect = MOVE_IMAGE_RECTS[visual] ?? MOVE_IMAGE_RECTS.articles;
  const xLines = getSnappedGridLines(fieldWidth, centerLineX);
  const yLines = getSnappedGridLines(fieldHeight);
  const rightPercent = rect.left + rect.width;
  const bottomPercent = rect.top + rect.height;

  return {
    left: getAxisEdge(rect.left, fieldWidth, xLines),
    top: getAxisEdge(rect.top, fieldHeight, yLines),
    right: getAxisEdge(rightPercent, fieldWidth, xLines),
    bottom: getAxisEdge(bottomPercent, fieldHeight, yLines),
  };
}

