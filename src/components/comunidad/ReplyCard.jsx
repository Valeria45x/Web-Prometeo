import { useComunidad } from "../../context/ComunidadContext";
import Button from "../system/Button";
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
      className="community-reply-card"
      style={{
        borderBottom: COMMUNITY_BORDERS.light,
        borderLeft: reply.isSolution
          ? `2px solid ${COMMUNITY_COLORS.accent}`
          : "2px solid transparent",
        background: reply.isSolution
          ? "rgba(255,60,84,0.03)"
          : COMMUNITY_COLORS.lightBackground,
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
            Solucion verificada
          </span>
        </div>
      )}

      <div
        className="community-reply-card__meta"
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
          className="community-reply-card__dot"
          style={{
            ...COMMUNITY_FONTS.mono,
            fontSize: 9,
            color: COMMUNITY_COLORS.text,
            opacity: 0.25,
          }}
        >
          &middot;
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
        className="community-reply-card__actions"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginTop: 16,
        }}
      >
        {canMarkSolution && (
          <Button
            variant="inline"
            surface="light"
            size="xs"
            font="mono"
            active
            underline="always"
            onClick={() => markSolution(reply.id, postId)}
          >
            Marcar solucion
          </Button>
        )}
        {canUnmarkSolution && (
          <Button
            variant="inline"
            surface="light"
            size="xs"
            font="mono"
            underline="always"
            style={{ opacity: 0.35 }}
            onClick={() => markSolution(reply.id, postId)}
          >
            Desmarcar solucion
          </Button>
        )}
      </div>
    </div>
  );
}
