import { useEffect, useRef } from "react";
import { TH } from "../../constants";
import { COLORS, FONTS } from "../../design/tokens";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import GridMeta from "../GridMeta";
import { DARK_GRID, EASE, LIGHT_GRID, PAGE_LIGHT_BG } from "./theme";

const MAX_SHIFT = 32;
const LERP = 0.08;

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export default function InteractiveGridSection({ light }) {
  const sectionRef = useRef(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef(null);
  const isCompactLayout = useMediaQuery("(max-width: 767px)");

  const bg = light ? PAGE_LIGHT_BG : COLORS.canvasDark;
  const bd = light ? LIGHT_GRID : DARK_GRID;
  const titleColor = light ? COLORS.textOnLight : COLORS.textOnDark;
  const bodyColor = light ? COLORS.textMutedLight : COLORS.textMutedDark;
  const panelTint = light ? "rgba(10, 10, 10, 0.035)" : "rgba(255, 255, 255, 0.035)";
  const gridTint = light ? "rgba(48, 48, 48, 0.24)" : "rgba(200, 200, 200, 0.13)";

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const writeVars = () => {
      const current = currentRef.current;
      node.style.setProperty("--interactive-grid-x", `${current.x}px`);
      node.style.setProperty("--interactive-grid-y", `${current.y}px`);
      node.style.setProperty("--interactive-grid-x-soft", `${current.x * 0.5}px`);
      node.style.setProperty("--interactive-grid-y-soft", `${current.y * 0.5}px`);
    };

    const tick = () => {
      const current = currentRef.current;
      const target = targetRef.current;

      current.x += (target.x - current.x) * LERP;
      current.y += (target.y - current.y) * LERP;
      writeVars();

      frameRef.current = window.requestAnimationFrame(tick);
    };

    const updateTarget = (event) => {
      const rect = node.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const x = ((event.clientX - centerX) / (rect.width / 2)) * MAX_SHIFT;
      const y = ((event.clientY - centerY) / (rect.height / 2)) * MAX_SHIFT;

      targetRef.current.x = clamp(x, -MAX_SHIFT, MAX_SHIFT);
      targetRef.current.y = clamp(y, -MAX_SHIFT, MAX_SHIFT);

      if (reducedMotion.matches) {
        currentRef.current = { ...targetRef.current };
        writeVars();
      }
    };

    const resetTarget = () => {
      targetRef.current = { x: 0, y: 0 };

      if (reducedMotion.matches) {
        currentRef.current = { x: 0, y: 0 };
        writeVars();
      }
    };

    node.addEventListener("pointermove", updateTarget);
    node.addEventListener("pointerleave", resetTarget);
    writeVars();

    if (!reducedMotion.matches) {
      frameRef.current = window.requestAnimationFrame(tick);
    }

    return () => {
      node.removeEventListener("pointermove", updateTarget);
      node.removeEventListener("pointerleave", resetTarget);

      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="interactive-grid-section"
      style={{
        "--interactive-grid-x": "0px",
        "--interactive-grid-y": "0px",
        "--interactive-grid-x-soft": "0px",
        "--interactive-grid-y-soft": "0px",
        minHeight: isCompactLayout ? "auto" : `calc(100svh - ${TH}px)`,
        borderTop: bd,
        borderLeft: bd,
        background: bg,
        color: titleColor,
        transition: `background ${EASE}, border-color ${EASE}, color ${EASE}`,
      }}
    >
      <GridMeta code="GRID-256" light={light} />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: isCompactLayout
            ? "minmax(0, 1fr)"
            : "repeat(4, minmax(0, 1fr))",
          borderTop: bd,
          minHeight: isCompactLayout ? "auto" : "512px",
        }}
      >
        <div
          style={{
            gridColumn: isCompactLayout ? "auto" : "span 1",
            borderRight: isCompactLayout ? "none" : bd,
            borderBottom: isCompactLayout ? bd : "none",
            padding: isCompactLayout ? "32px 16px" : "64px 32px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: 32,
            minHeight: isCompactLayout ? "auto" : "512px",
          }}
        >
          <div style={{ display: "grid", gap: 16 }}>
            <span className="meta-label" style={{ color: bodyColor }}>
              AES-256 / GRID SYSTEM
            </span>
            <h2
              className="section-title"
              style={{
                color: titleColor,
                lineHeight: isCompactLayout ? "32px" : "64px",
                margin: 0,
                maxWidth: "12ch",
              }}
            >
              La reticula tambien responde.
            </h2>
          </div>

          <p
            style={{
              fontFamily: FONTS.sans,
              fontSize: 16,
              lineHeight: "32px",
              color: bodyColor,
              margin: 0,
              maxWidth: "28ch",
            }}
          >
            Una muestra interactiva del sistema: cuatro columnas, borde visible,
            cero gutter y desplazamientos construidos sobre la unidad base de
            32px.
          </p>
        </div>

        <div
          style={{
            gridColumn: isCompactLayout ? "auto" : "span 3",
            position: "relative",
            minHeight: isCompactLayout ? "384px" : "512px",
            overflow: "hidden",
            backgroundColor: panelTint,
            backgroundImage: `
              linear-gradient(to right, ${gridTint} 1px, transparent 1px),
              linear-gradient(to bottom, ${gridTint} 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
            transition: `background-color ${EASE}`,
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            }}
          >
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                style={{
                  borderRight: index < 3 ? bd : "none",
                }}
              />
            ))}
          </div>

          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "25%",
              top: 0,
              bottom: 0,
              width: 1,
              background: COLORS.grid,
              transform: "translateX(var(--interactive-grid-x))",
              willChange: "transform",
            }}
          />
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "75%",
              top: 0,
              bottom: 0,
              width: 1,
              background: COLORS.grid,
              transform: "translateX(calc(var(--interactive-grid-x) * -1))",
              willChange: "transform",
            }}
          />
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "25%",
              left: 0,
              right: 0,
              height: 1,
              background: COLORS.grid,
              transform: "translateY(var(--interactive-grid-y))",
              willChange: "transform",
            }}
          />
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "75%",
              left: 0,
              right: 0,
              height: 1,
              background: COLORS.grid,
              transform: "translateY(calc(var(--interactive-grid-y) * -1))",
              willChange: "transform",
            }}
          />

          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: isCompactLayout ? 128 : 256,
              height: isCompactLayout ? 128 : 256,
              transform:
                "translate(calc(-50% + var(--interactive-grid-x-soft)), calc(-50% + var(--interactive-grid-y-soft)))",
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gridTemplateRows: "repeat(4, 1fr)",
              borderLeft: bd,
              borderTop: bd,
              willChange: "transform",
            }}
          >
            {Array.from({ length: 16 }).map((_, index) => (
              <div
                key={index}
                style={{
                  borderRight: bd,
                  borderBottom: bd,
                }}
              />
            ))}
          </div>

          <div
            style={{
              position: "absolute",
              right: 0,
              bottom: 0,
              width: isCompactLayout ? "100%" : 64,
              height: isCompactLayout ? 8 : 64,
              background: COLORS.accent,
            }}
          />
        </div>
      </div>
    </section>
  );
}
