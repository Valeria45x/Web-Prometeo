import { useState } from "react";
import { TAGS } from "../../data/comunidad";
import { useComunidad } from "../../context/ComunidadContext";
import TagChip from "./TagChip";

const B = "1px solid #303030";

const OVERLAY = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.85)",
  zIndex: 200,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 24,
};

const PANEL = {
  background: "#0A0A0A",
  border: B,
  width: "100%",
  maxWidth: 640,
  maxHeight: "90vh",
  overflowY: "auto",
};

const INPUT_STYLE = {
  width: "100%",
  background: "#111",
  border: B,
  color: "#C8C8C8",
  fontFamily: "'Funnel Sans', sans-serif",
  fontSize: 14,
  padding: "10px 12px",
  outline: "none",
  boxSizing: "border-box",
  resize: "vertical",
};

const LABEL_STYLE = {
  fontFamily: "monospace",
  fontSize: 7,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  color: "#C8C8C8",
  opacity: 0.5,
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
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : prev.length < 3
          ? [...prev, tag]
          : prev,
    );
  }

  function handleSubmit(e) {
    e.preventDefault();

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
      setError("El título es obligatorio.");
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
      style={OVERLAY}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div style={PANEL}>
        {/* Header */}
        <div
          style={{
            borderBottom: B,
            padding: "20px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontFamily: "monospace",
              fontSize: 8,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "#C8C8C8",
            }}
          >
            Nuevo hilo
          </span>
          <span
            style={{
              fontFamily: "monospace",
              fontSize: 6,
              color: "#FF3C54",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            PRO-006
          </span>
        </div>

        {/* Body */}
        <form
          onSubmit={handleSubmit}
          style={{
            padding: 24,
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          {/* Not verified warning */}
          {currentUser && !currentUser.emailVerified && (
            <div style={{ borderLeft: "3px solid #FF3C54", paddingLeft: 12 }}>
              <p
                style={{
                  fontFamily: "'Funnel Sans', sans-serif",
                  fontSize: 13,
                  color: "#FF3C54",
                  margin: 0,
                }}
              >
                Confirma tu email para publicar.
              </p>
            </div>
          )}

          <div>
            <label style={LABEL_STYLE}>Título</label>
            <input
              style={INPUT_STYLE}
              placeholder="Formula una pregunta concreta..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={160}
            />
            <span
              style={{
                fontFamily: "monospace",
                fontSize: 6,
                color: "#C8C8C8",
                opacity: 0.3,
                marginTop: 4,
                display: "block",
              }}
            >
              {title.length}/160
            </span>
          </div>

          <div>
            <label style={LABEL_STYLE}>Contenido</label>
            <textarea
              style={{ ...INPUT_STYLE, minHeight: 140 }}
              placeholder="Describe tu pregunta con el contexto necesario..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </div>

          <div>
            <label style={{ ...LABEL_STYLE, marginBottom: 10 }}>
              Etiquetas <span style={{ opacity: 0.4 }}>(máx. 3)</span>
            </label>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {TAGS.map((tag) => (
                <TagChip
                  key={tag}
                  tag={tag}
                  active={selectedTags.includes(tag)}
                  onClick={() => toggleTag(tag)}
                  small
                />
              ))}
            </div>
          </div>

          {error && (
            <p
              style={{
                fontFamily: "monospace",
                fontSize: 7,
                color: "#FF3C54",
                margin: 0,
              }}
            >
              {error}
            </p>
          )}

          <div
            style={{
              display: "flex",
              gap: 12,
              alignItems: "center",
              marginTop: 8,
            }}
          >
            <button
              type="submit"
              style={{
                background: "#FF3C54",
                color: "#0A0A0A",
                border: "none",
                padding: "12px 24px",
                fontFamily: "monospace",
                fontSize: 8,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                cursor: "pointer",
              }}
            >
              Publicar hilo
            </button>
            <button
              type="button"
              onClick={onClose}
              style={{
                background: "none",
                border: B,
                padding: "12px 24px",
                fontFamily: "monospace",
                fontSize: 8,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#C8C8C8",
                cursor: "pointer",
              }}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
