import { useComunidad } from "../../context/ComunidadContext";
import RoleBadge from "./RoleBadge";
import {
  COMMUNITY_BORDERS,
  COMMUNITY_COLORS,
  COMMUNITY_FONTS,
  formatCommunityDate,
} from "./shared";

export default function ReplyCard({ reply, postId }) {
  const { currentUser, getUserById, markSolution } = useComunidad();
  const author = getUserById(reply.authorId);
  const isTeam = currentUser?.role === "prometeo_team";
  const canMarkSolution = isTeam && !reply.isSolution;
  const canUnmarkSolution = isTeam && reply.isSolution;

  return (
    <div
      style={{
        borderBottom: COMMUNITY_BORDERS.light,
        borderLeft: reply.isSolution
          ? `2px solid ${COMMUNITY_COLORS.accent}`
          : "2px solid transparent",
        background: reply.isSolution ? "rgba(255,60,84,0.03)" : COMMUNITY_COLORS.lightBackground,
        padding: "24px 32px",
      }}
    >
      {reply.isSolution && (
        <div style={{ marginBottom: 12 }}>
          <span
            style={{
              ...COMMUNITY_FONTS.mono,
              fontSize: 9,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: COMMUNITY_COLORS.accent,
            }}
          >
            ✓ SOLUCIÓN VERIFICADA
          </span>
        </div>
      )}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 16,
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            ...COMMUNITY_FONTS.mono,
            fontSize: 11,
            fontWeight: 700,
            color: COMMUNITY_COLORS.text,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          @{author?.handle || "usuario"}
        </span>
        {author && <RoleBadge role={author.role} />}
        <span
          style={{
            ...COMMUNITY_FONTS.mono,
            fontSize: 9,
            color: COMMUNITY_COLORS.text,
            opacity: 0.25,
          }}
        >
          ·
        </span>
        <span
          style={{
            ...COMMUNITY_FONTS.mono,
            fontSize: 9,
            color: COMMUNITY_COLORS.text,
            opacity: 0.45,
          }}
        >
          {formatCommunityDate(reply.createdAt)}
        </span>
      </div>

      <p
        style={{
          fontFamily: COMMUNITY_FONTS.sans,
          fontSize: 15,
          color: COMMUNITY_COLORS.text,
          lineHeight: 1.7,
          margin: 0,
        }}
      >
        {reply.body}
      </p>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginTop: 16,
        }}
      >
        {canMarkSolution && (
          <button
            type="button"
            onClick={() => markSolution(reply.id, postId)}
            style={{
              ...COMMUNITY_FONTS.mono,
              fontSize: 8,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              background: "none",
              border: "none",
              color: COMMUNITY_COLORS.accent,
              borderBottom: `1px solid ${COMMUNITY_COLORS.accent}`,
              padding: "0 0 1px",
              cursor: "pointer",
            }}
          >
            Marcar solución
          </button>
        )}
        {canUnmarkSolution && (
          <button
            type="button"
            onClick={() => markSolution(reply.id, postId)}
            style={{
              ...COMMUNITY_FONTS.mono,
              fontSize: 8,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              background: "none",
              border: "none",
              color: COMMUNITY_COLORS.text,
              opacity: 0.35,
              borderBottom: "1px solid currentColor",
              padding: "0 0 1px",
              cursor: "pointer",
            }}
          >
            Desmarcar solución
          </button>
        )}
      </div>
    </div>
  );
}
