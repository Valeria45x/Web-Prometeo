import { useEffect, useRef, useState } from "react";
import { COLORS, FONTS } from "../../design/tokens";
import TextReveal from "../system/TextReveal";
import { DARK_GRID, EASE, LIGHT_GRID, PAGE_LIGHT_BG } from "./theme";
import "./prometeoScroll.css";

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function smoothstep(value) {
  const x = clamp(value, 0, 1);
  return x * x * (3 - 2 * x);
}

const PROMETEO_MOVES = [
  {
    index: "01",
    title: "Entender",
    body: "Traducir permisos, cookies y políticas a un lenguaje que permita decidir.",
  },
  {
    index: "02",
    title: "Conversar",
    body: "Abrir una conversación colectiva sobre algo que casi siempre se vive en silencio.",
  },
  {
    index: "03",
    title: "Hacer visible",
    body: "Convertir la privacidad en señales, objetos y experiencias reconocibles.",
  },
  {
    index: "04",
    title: "Demostrar",
    body: "Ayudar a empresas a sostener la confianza con evidencias verificables.",
  },
];

export default function PrometeoScrollSection({ light = false }) {
  const scrollRef = useRef(null);
  const stageRef = useRef(null);
  const frameRef = useRef(0);
  const [state, setState] = useState({
    progress: 0,
    stageWidth: 0,
    stageHeight: 0,
  });

  const bg = light ? PAGE_LIGHT_BG : COLORS.canvasDark;
  const bd = light ? LIGHT_GRID : DARK_GRID;
  const titleColor = light ? COLORS.textOnLight : COLORS.textOnDark;
  const mutedColor = light ? COLORS.textMutedLight : COLORS.textMutedDark;
  const maskColor = light ? PAGE_LIGHT_BG : COLORS.canvasDark;

  useEffect(() => {
    const section = scrollRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return undefined;

    const update = () => {
      frameRef.current = 0;

      const sectionRect = section.getBoundingClientRect();
      const stageRect = stage.getBoundingClientRect();
      const scrollRange = Math.max(1, sectionRect.height - window.innerHeight);
      const progress = clamp(-sectionRect.top / scrollRange, 0, 1);

      setState({
        progress,
        stageWidth: stageRect.width,
        stageHeight: stageRect.height,
      });
    };

    const requestUpdate = () => {
      if (frameRef.current) return;
      frameRef.current = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const progress = smoothstep(state.progress);
  const stageWidth = state.stageWidth || 1024;
  const stageHeight = state.stageHeight || 640;
  const startSquare = 16;
  const revealWidth = startSquare + (stageWidth - startSquare) * progress;
  const revealHeight = startSquare + (stageHeight - startSquare) * progress;
  const clipLeft = Math.max(0, (stageWidth - revealWidth) / 2);
  const clipRight = clipLeft;
  const clipTop = Math.max(0, (stageHeight - revealHeight) / 2);
  const clipBottom = clipTop;
  const textShift = progress * (stageWidth < 768 ? 18 : 24);
  const textOpacity = 1 - clamp((progress - 0.62) / 0.28, 0, 1);
  const mediaLabelOpacity = clamp((progress - 0.46) / 0.32, 0, 1);

  return (
    <section
      className="prometeo-scroll"
      style={{
        "--prometeo-scroll-bg": bg,
        "--prometeo-scroll-border": bd,
        "--prometeo-scroll-title": titleColor,
        "--prometeo-scroll-muted": mutedColor,
        "--prometeo-scroll-progress": progress,
        "--prometeo-scroll-text-opacity": textOpacity,
        "--prometeo-scroll-text-shift": `${textShift}vw`,
        "--prometeo-scroll-media-label": mediaLabelOpacity,
        background: bg,
        color: titleColor,
      }}
    >
      <div ref={scrollRef} className="prometeo-scroll__sticky-wrap">
        <div ref={stageRef} className="prometeo-scroll__stage">
          <div className="prometeo-scroll__meta">
            <span>Sobre Prometeo</span>
            <span>Scroll para entrar</span>
          </div>

          <div
            className="prometeo-scroll__media"
            style={{
              "--prometeo-scroll-media-clip": `inset(${clipTop}px ${clipRight}px ${clipBottom}px ${clipLeft}px)`,
            }}
          >
            <div className="prometeo-scroll__media-fill">
              <span>Prometeo</span>
            </div>
          </div>

          <div className="prometeo-scroll__headline" aria-hidden="true">
            <h2
              style={{
                transform: `translateX(calc(var(--prometeo-scroll-text-shift) * -1))`,
              }}
            >
              Prometeo no es solo
            </h2>
            <h2
              style={{
                transform: "translateX(var(--prometeo-scroll-text-shift))",
              }}
            >
              información.
            </h2>
          </div>
        </div>
      </div>

      <div className="prometeo-scroll__explain">
        <div className="prometeo-scroll__explain-copy">
          <span className="meta-label" style={{ color: mutedColor }}>
            Qué hace
          </span>
          <TextReveal
            as="h2"
            lines={["Convierte privacidad", "en claridad accionable."]}
            maskColor={maskColor}
            style={{
              fontFamily: FONTS.display,
              fontSize: 64,
              fontWeight: 900,
              lineHeight: "64px",
              color: titleColor,
              margin: 0,
              textTransform: "uppercase",
            }}
          />
        </div>

        <div className="prometeo-scroll__moves">
          {PROMETEO_MOVES.map((move) => (
            <article key={move.index} className="prometeo-scroll__move">
              <span>{move.index}</span>
              <div>
                <h3>{move.title}</h3>
                <p>{move.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
