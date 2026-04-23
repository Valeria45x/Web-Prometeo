import { GRID } from "../../design/tokens";

const TEMPLATE_MAP = {
  site: GRID.site,
  halves: GRID.halves,
  thirds: GRID.thirds,
};

function joinClassNames(...classNames) {
  return classNames.filter(Boolean).join(" ");
}

export function Grid({
  as: Component = "div",
  columns = "site",
  className = "",
  style = {},
  children,
  ...props
}) {
  const template = TEMPLATE_MAP[columns] ?? columns;

  return (
    <Component
      className={joinClassNames("ds-grid", `ds-grid--${columns}`, className)}
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
  className = "",
  style = {},
  children,
  ...props
}) {
  return (
    <Component
      className={className}
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
