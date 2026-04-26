import { useState } from "react";
import { TAGS } from "../../data/comunidad";
import { useComunidad } from "../../context/ComunidadContext";
import Button from "../system/Button";
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
  maxWidth: 560,
  maxHeight: "90vh",
  overflowY: "auto",
};

const INPUT_STYLE = {
  width: "100%",
  background: COMMUNITY_COLORS.lightBackground,
  border: COMMUNITY_BORDERS.soft,
  color: COMMUNITY_COLORS.text,
  fontFamily: COMMUNITY_FONTS.sans,
  fontSize: 14,
  padding: "10px 12px",
  outline: "none",
  boxSizing: "border-box",
  resize: "vertical",
};

const LABEL_STYLE = {
  fontFamily: COMMUNITY_FONTS.mono.fontFamily,
  fontSize: 7,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  color: COMMUNITY_COLORS.text,
  display: "block",
  marginBottom: 6,
};

export default function NewPostOverlay({ onClose, onCreated }) {
  const { currentUser, createPost, setShowAuthModal } = useComunidad();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [error, setError] = useState("");

  function toggleTag(tag) {
    setSelectedTags((currentTags) =>
      currentTags.includes(tag)
        ? currentTags.filter((t) => t !== tag)
        : currentTags.length < 3
          ? [...currentTags, tag]
          : currentTags,
    );
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!currentUser) {
      onClose();
      setShowAuthModal(true);
      return;
    }

    if (!currentUser.emailVerified) {
      setError("Debes confirmar tu email antes de publicar.");
      return;
    }

    if (!title.trim()) {
      setError("El titulo es obligatorio.");
      return;
    }

    if (!body.trim()) {
      setError("El contenido es obligatorio.");
      return;
    }

    if (selectedTags.length === 0) {
      setError("Selecciona al menos una etiqueta.");
      return;
    }

    const newPost = createPost(title.trim(), body.trim(), selectedTags);
    if (newPost) {
      onCreated?.(newPost);
      onClose();
    }
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
          style={{ borderBottom: COMMUNITY_BORDERS.soft, padding: "16px 24px", display: "flex", alignItems: "center" }}
        >
          <span style={{ ...COMMUNITY_FONTS.mono, fontSize: 11, fontWeight: 700, color: COMMUNITY_COLORS.text, letterSpacing: "0.14em", textTransform: "uppercase" }}>
            Nuevo hilo
          </span>
        </div>

        {/* Form body */}
        <form
          onSubmit={handleSubmit}
          className="community-modal__body"
          style={{ padding: 24, display: "flex", flexDirection: "column", gap: 20 }}
        >
          {currentUser && !currentUser.emailVerified && (
            <div style={{ borderLeft: `3px solid ${COMMUNITY_COLORS.accent}`, paddingLeft: 12 }}>
              <p style={{ fontFamily: COMMUNITY_FONTS.sans, fontSize: 13, color: COMMUNITY_COLORS.accent, margin: 0 }}>
                Confirma tu email para publicar.
              </p>
            </div>
          )}

          <div>
            <label htmlFor="community-new-post-title" style={LABEL_STYLE}>
              Titulo
            </label>
            <input
              id="community-new-post-title"
              name="title"
              autoComplete="off"
              style={INPUT_STYLE}
              placeholder="Formula una pregunta concreta..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={160}
            />
            <span style={{ fontFamily: COMMUNITY_FONTS.mono.fontFamily, fontSize: 6, color: COMMUNITY_COLORS.text, opacity: 0.55, marginTop: 4, display: "block" }}>
              {title.length}/160
            </span>
          </div>

          <div>
            <label htmlFor="community-new-post-body" style={LABEL_STYLE}>
              Contenido
            </label>
            <textarea
              id="community-new-post-body"
              name="body"
              autoComplete="off"
              style={{ ...INPUT_STYLE, minHeight: 140 }}
              placeholder="Describe tu pregunta con el contexto necesario..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </div>

          <div>
            <label style={{ ...LABEL_STYLE, marginBottom: 10 }}>
              Etiquetas <span style={{ opacity: 0.55 }}>(max. 3)</span>
            </label>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  style={{
                    background: selectedTags.includes(tag) ? COMMUNITY_COLORS.text : "transparent",
                    border: `1px solid ${COMMUNITY_COLORS.text}`,
                    color: selectedTags.includes(tag) ? COMMUNITY_COLORS.lightBackground : COMMUNITY_COLORS.text,
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

          {error && (
            <p style={{ fontFamily: COMMUNITY_FONTS.mono.fontFamily, fontSize: 7, color: COMMUNITY_COLORS.accent, margin: 0 }}>
              {error}
            </p>
          )}
        </form>

        {/* Footer */}
        <div
          className="community-modal__footer"
          style={{ borderTop: COMMUNITY_BORDERS.soft, padding: "16px 24px", display: "flex", gap: 8 }}
        >
          <Button
            type="submit"
            variant="outline"
            surface="light"
            emphasis="neutral"
            size="md"
            font="mono"
            fullWidth
            onClick={handleSubmit}
          >
            Publicar hilo
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
