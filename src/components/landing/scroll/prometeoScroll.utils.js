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
    return Math.round(
      empresasButton.getBoundingClientRect().right -
        containerLeft +
        MOVE_CENTER_LINE_NUDGE,
    );
  }

  const profileCell = document.querySelector(".topbar__profile-cell");

  if (profileCell) {
    return Math.round(
      profileCell.getBoundingClientRect().left -
        containerLeft +
        MOVE_CENTER_LINE_NUDGE,
    );
  }

  return null;
}

export function getSnappedGridLines(size, middleOverride = null) {
  const lines = MOVE_GRID_LINES.map((line) => Math.round((size * line) / 100));

  if (typeof middleOverride === "number") {
    lines[1] = Math.max(0, Math.min(size, Math.round(middleOverride)));
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

function addMoveSegment(segments, seen, segment) {
  const key = [
    segment.orientation,
    segment.coord,
    segment.start,
    segment.end,
  ].join(":");

  if (seen.has(key) || segment.end <= segment.start) return;

  seen.add(key);
  segments.push({ key, ...segment });
}

export function getMoveContourSegments(
  fieldWidth,
  fieldHeight,
  imageLayout,
) {
  if (!imageLayout) return [];

  const xLines = getSnappedGridLines(fieldWidth);
  const yLines = getSnappedGridLines(fieldHeight);
  const { left, top, right, bottom } = imageLayout;
  const seen = new Set();
  const segments = [];
  const isGridLine = (edge, snappedLines) =>
    snappedLines.includes(Math.round(edge));
  const alignLine = (edge, size, snappedLines) => {
    if (edge <= 0) return 0;
    if (edge >= size) return Math.max(0, size - 1);
    return isGridLine(edge, snappedLines) ? Math.max(0, edge - 1) : edge;
  };

  if (top > 0 && !isGridLine(top, yLines)) {
    addMoveSegment(segments, seen, {
      orientation: "horizontal",
      coord: alignLine(top, fieldHeight, yLines),
      start: Math.max(0, left),
      end: Math.min(fieldWidth, right),
    });
  }

  if (right < fieldWidth) {
    addMoveSegment(segments, seen, {
      orientation: "vertical",
      coord: alignLine(right, fieldWidth, xLines),
      start: Math.max(0, top),
      end: Math.min(fieldHeight, bottom),
    });
  }

  if (bottom < fieldHeight) {
    addMoveSegment(segments, seen, {
      orientation: "horizontal",
      coord: alignLine(bottom, fieldHeight, yLines),
      start: Math.max(0, left),
      end: Math.min(fieldWidth, right),
    });
  }

  if (left > 0 && !isGridLine(left, xLines)) {
    addMoveSegment(segments, seen, {
      orientation: "vertical",
      coord: alignLine(left, fieldWidth, xLines),
      start: Math.max(0, top),
      end: Math.min(fieldHeight, bottom),
    });
  }

  return segments;
}

export function getMoveInteriorMask(imageLayout) {
  if (!imageLayout) return null;

  const width = Math.max(0, imageLayout.right - imageLayout.left - 1);
  const height = Math.max(0, imageLayout.bottom - imageLayout.top - 1);

  if (!width || !height) return null;

  return {
    x: imageLayout.left + 1,
    y: imageLayout.top + 1,
    width,
    height,
  };
}
