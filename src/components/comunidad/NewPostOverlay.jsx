import { useState } from "react";
import { TAGS } from "../../data/comunidad";
import { useComunidad } from "../../context/ComunidadContext";
import TagChip from "./TagChip";
import { COMMUNITY_BORDERS, COMMUNITY_COLORS, COMMUNITY_FONTS } from "./shared";

const OVERLAY = {
  position: "fixed",
  inset: 0,
  background: COMMUNITY_COLORS.overlay,
  zIndex: 200,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 24,
};

const PANEL = {
  background: COMMUNITY_COLORS.darkBackground,
  border: COMMUNITY_BORDERS.dark,
  width: "100%",
  maxWidth: 640,
  maxHeight: "90vh",
  overflowY: "auto",
};

const INPUT_STYLE = {
  width: "100%",
  background: COMMUNITY_COLORS.inputBackground,
  border: COMMUNITY_BORDERS.dark,
  color: COMMUNITY_COLORS.textOnDark,
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
  color: COMMUNITY_COLORS.textOnDark,
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
    setSelectedTags((currentTags) =>
      currentTags.includes(tag)
        ? currentTags.filter((currentTag) => currentTag !== tag)
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
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div style={PANEL}>
        <div
          style={{
            borderBottom: COMMUNITY_BORDERS.dark,
            padding: "20px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontFamily: COMMUNITY_FONTS.mono.fontFamily,
              fontSize: 8,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: COMMUNITY_COLORS.textOnDark,
            }}
          >
            Nuevo hilo
          </span>
          <span
            style={{
              fontFamily: COMMUNITY_FONTS.mono.fontFamily,
              fontSize: 6,
              color: COMMUNITY_COLORS.accent,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            PRO-006
          </span>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            padding: 24,
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          {currentUser && !currentUser.emailVerified && (
            <div
              style={{
                borderLeft: `3px solid ${COMMUNITY_COLORS.accent}`,
                paddingLeft: 12,
              }}
            >
              <p
                style={{
                  fontFamily: COMMUNITY_FONTS.sans,
                  fontSize: 13,
                  color: COMMUNITY_COLORS.accent,
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
              onChange={(event) => setTitle(event.target.value)}
              maxLength={160}
            />
            <span
              style={{
                fontFamily: COMMUNITY_FONTS.mono.fontFamily,
                fontSize: 6,
                color: COMMUNITY_COLORS.textOnDark,
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
              onChange={(event) => setBody(event.target.value)}
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
                fontFamily: COMMUNITY_FONTS.mono.fontFamily,
                fontSize: 7,
                color: COMMUNITY_COLORS.accent,
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
                background: COMMUNITY_COLORS.accent,
                color: COMMUNITY_COLORS.darkBackground,
                border: "none",
                padding: "12px 24px",
                fontFamily: COMMUNITY_FONTS.mono.fontFamily,
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
                border: COMMUNITY_BORDERS.dark,
                padding: "12px 24px",
                fontFamily: COMMUNITY_FONTS.mono.fontFamily,
                fontSize: 8,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: COMMUNITY_COLORS.textOnDark,
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
