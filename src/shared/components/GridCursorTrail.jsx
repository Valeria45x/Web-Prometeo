import { useEffect, useRef } from "react";
import "@/shared/components/grid-cursor-trail.css";

// Rastro de celdas de rejilla que se encienden al paso del cursor.
// Técnica: un único <canvas> a pantalla completa (sin crear DOM por celda).
const CELL = 32; // tamaño de celda en px
const COLOR = "255, 11, 58"; // rojo de marca (rgb)
const MAX_ALPHA = 0.12; // opacidad máxima de cada celda (sutil)
const DECAY = 0.045; // cuánto se desvanece por frame

export default function GridCursorTrail() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    // Sin efecto si no hay ratón (táctil) o si se pidió menos movimiento.
    if (reduced || !finePointer) return undefined;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = 0;
    let height = 0;
    const cells = new Map(); // "col,row" -> { x, y, life }
    let rafId = null;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function loop() {
      ctx.clearRect(0, 0, width, height);
      for (const [key, cell] of cells) {
        cell.life -= DECAY;
        if (cell.life <= 0) {
          cells.delete(key);
          continue;
        }
        const alpha = cell.life * MAX_ALPHA;
        ctx.fillStyle = `rgba(${COLOR}, ${alpha})`;
        ctx.fillRect(cell.x, cell.y, CELL, CELL);
        ctx.strokeStyle = `rgba(${COLOR}, ${alpha * 1.5})`;
        ctx.lineWidth = 1;
        ctx.strokeRect(cell.x + 0.5, cell.y + 0.5, CELL - 1, CELL - 1);
      }
      // El bucle solo vive mientras haya celdas; en reposo se apaga (0 CPU).
      if (cells.size > 0) {
        rafId = requestAnimationFrame(loop);
      } else {
        rafId = null;
        ctx.clearRect(0, 0, width, height);
      }
    }

    function onMove(event) {
      const col = Math.floor(event.clientX / CELL);
      const row = Math.floor(event.clientY / CELL);
      cells.set(`${col},${row}`, { x: col * CELL, y: row * CELL, life: 1 });
      if (rafId === null) rafId = requestAnimationFrame(loop);
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="grid-cursor-trail" aria-hidden="true" />
  );
}
