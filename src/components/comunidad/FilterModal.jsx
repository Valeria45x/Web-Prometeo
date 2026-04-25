import { useState } from "react";
import Button from "../system/Button";
import { TAGS } from "../../data/comunidad";
import { COMMUNITY_BORDERS, COMMUNITY_COLORS, COMMUNITY_FONTS } from "./shared";

const OVERLAY = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.35)",
  zIndex: 1000,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 24,
};

const PANEL = {
  background: COMMUNITY_COLORS.lightBackground,
  border: COMMUNITY_BORDERS.soft,
  width: "100%",
  maxWidth: 480,
};

export default function FilterModal({ activeTag, onTagChange, onClose }) {
  const [pending, setPending] = useState(activeTag);

  function handleSave() {
    onTagChange(pending);
    onClose();
  }

  return (
    <div
      className="community-modal"
      style={OVERLAY}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="community-modal__panel" style={PANEL}>
        {/* Header */}
        <div
          className="community-modal__header"
          style={{ borderBottom: COMMUNITY_BORDERS.soft, padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}
        >
          <span style={{ ...COMMUNITY_FONTS.mono, fontSize: 11, fontWeight: 700, color: COMMUNITY_COLORS.text, letterSpacing: "0.14em", textTransform: "uppercase" }}>
            Filtrar hilos
          </span>
          {pending && (
            <button
              onClick={() => setPending(null)}
              style={{ background: "none", border: "none", cursor: "pointer", ...COMMUNITY_FONTS.mono, fontSize: 8, color: COMMUNITY_COLORS.text, opacity: 0.4, letterSpacing: "0.08em", textTransform: "uppercase", padding: 0 }}
            >
              Deseleccionar todas
            </button>
          )}
        </div>

        {/* Tags */}
        <div className="community-modal__body" style={{ padding: 24 }}>
          <span style={{ ...COMMUNITY_FONTS.mono, fontSize: 7, color: COMMUNITY_COLORS.text, opacity: 0.4, textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 12 }}>
            Categoría
          </span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => setPending(pending === tag ? null : tag)}
                style={{
                  background: pending === tag ? COMMUNITY_COLORS.accent : "transparent",
                  border: `1px solid ${pending === tag ? COMMUNITY_COLORS.accent : "rgba(0,0,0,0.15)"}`,
                  color: pending === tag ? COMMUNITY_COLORS.lightBackground : COMMUNITY_COLORS.text,
                  ...COMMUNITY_FONTS.mono,
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding: "8px 14px",
                  cursor: "pointer",
                  transition: "background 0.12s, border-color 0.12s, color 0.12s",
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div
          className="community-modal__footer"
          style={{ borderTop: COMMUNITY_BORDERS.soft, padding: "16px 24px", display: "flex", gap: 8 }}
        >
          <Button
            variant="outline"
            surface="light"
            emphasis="neutral"
            size="md"
            font="mono"
            fullWidth
            onClick={handleSave}
          >
            Guardar cambios
          </Button>
          <Button
            variant="outline"
            surface="light"
            emphasis="neutral"
            size="md"
            font="mono"
            fullWidth
            onClick={onClose}
          >
            Cerrar
          </Button>
        </div>
      </div>
    </div>
  );
}
