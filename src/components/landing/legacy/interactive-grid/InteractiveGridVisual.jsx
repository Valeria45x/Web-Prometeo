const COLUMNS = Array.from({ length: 4 });
const MODULE_CELLS = Array.from({ length: 16 });

function MotionRail({ axis, position }) {
  return (
    <div
      aria-hidden="true"
      className={[
        "interactive-grid__rail",
        `interactive-grid__rail--${axis}`,
        `interactive-grid__rail--${position}`,
      ].join(" ")}
    />
  );
}

export default function InteractiveGridVisual() {
  return (
    <div className="interactive-grid__visual">
      <div aria-hidden="true" className="interactive-grid__columns">
        {COLUMNS.map((_, index) => (
          <div key={index} className="interactive-grid__column" />
        ))}
      </div>

      <MotionRail axis="vertical" position="left" />
      <MotionRail axis="vertical" position="right" />
      <MotionRail axis="horizontal" position="top" />
      <MotionRail axis="horizontal" position="bottom" />

      <div aria-hidden="true" className="interactive-grid__module">
        {MODULE_CELLS.map((_, index) => (
          <div key={index} className="interactive-grid__module-cell" />
        ))}
      </div>

      <div aria-hidden="true" className="interactive-grid__signature" />
    </div>
  );
}
