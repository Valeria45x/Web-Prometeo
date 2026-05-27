import { GRID_SYSTEM_COPY } from "../../../../design/gridSystem";

export default function InteractiveGridIntro() {
  return (
    <div className="interactive-grid__intro">
      <div className="interactive-grid__intro-stack">
        <span className="meta-label interactive-grid__eyebrow">
          {GRID_SYSTEM_COPY.eyebrow}
        </span>
        <h2 className="section-title interactive-grid__title">
          {GRID_SYSTEM_COPY.title}
        </h2>
      </div>

      <p className="interactive-grid__body-copy">{GRID_SYSTEM_COPY.body}</p>
    </div>
  );
}
