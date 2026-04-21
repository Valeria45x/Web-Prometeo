import { TH } from "../../constants";
import { EASE, DARK_GRID, LIGHT_GRID, PAGE_LIGHT_BG } from "./theme";

export default function SectionTransition({ light = false, splitColumn = 2 }) {
  const bd = light ? LIGHT_GRID : DARK_GRID;
  const bg = light ? PAGE_LIGHT_BG : "#0a0a0a";
  const CT = `background ${EASE}, border-color ${EASE}`;

  return (
    <section
      aria-hidden="true"
      style={{
        height: TH,
        background: bg,
        borderTop: bd,
        borderLeft: bd,
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        transition: CT,
      }}
    >
      <div
        style={{
          gridColumn: `1 / span ${splitColumn}`,
          borderRight: bd,
          transition: CT,
        }}
      />
      <div style={{ gridColumn: `${splitColumn + 1} / -1` }} />
    </section>
  );
}
