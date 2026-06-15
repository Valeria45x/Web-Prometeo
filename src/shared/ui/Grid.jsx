import { GRID } from "@/design/tokens";

const TEMPLATE_MAP = {
  site: GRID.site,
  halves: GRID.halves,
  thirds: GRID.thirds,
};

function getGridModifier(columns) {
  return typeof columns === "string" && /^[a-z0-9-]+$/i.test(columns)
    ? `ds-grid--${columns}`
    : "";
}

function joinClassNames(...classNames) {
  return classNames.filter(Boolean).join(" ");
}

export function Grid({
  as: Component = "div",
  columns = "site",
  lined = false,
  className = "",
  style = {},
  children,
  ...props
}) {
  const template = TEMPLATE_MAP[columns] ?? columns;

  return (
    <Component
      className={joinClassNames(
        "ds-grid",
        getGridModifier(columns),
        lined && "ds-grid--lined",
        className,
      )}
      style={{ gridTemplateColumns: template, ...style }}
      {...props}
    >
      {children}
    </Component>
  );
}

export function GridCell({
  as: Component = "div",
  span = 1,
  rowSpan = 1,
  redSignature = false,
  collapseSpanOnTablet = false,
  collapseSpanOnMobile = false,
  collapseRowSpanOnTablet = false,
  collapseRowSpanOnMobile = false,
  className = "",
  style = {},
  children,
  ...props
}) {
  return (
    <Component
      className={joinClassNames(
        "ds-grid-cell",
        redSignature && "ds-grid-cell--red-signature",
        className,
        collapseSpanOnTablet &&
          span > 1 &&
          "ds-grid-cell--collapse-span-tablet",
        collapseSpanOnMobile &&
          span > 1 &&
          "ds-grid-cell--collapse-span-mobile",
        collapseRowSpanOnTablet &&
          rowSpan > 1 &&
          "ds-grid-cell--collapse-row-tablet",
        collapseRowSpanOnMobile &&
          rowSpan > 1 &&
          "ds-grid-cell--collapse-row-mobile",
      )}
      style={{
        ...(span > 1 ? { gridColumn: `span ${span}` } : {}),
        ...(rowSpan > 1 ? { gridRow: `span ${rowSpan}` } : {}),
        minWidth: 0,
        ...style,
      }}
      {...props}
    >
      {children}
    </Component>
  );
}
