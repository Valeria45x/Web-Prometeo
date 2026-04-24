import { useParams } from "react-router-dom";
import { Page } from "../components/Page";
import AuthModal from "../components/comunidad/AuthModal";
import ThreadView from "../components/comunidad/ThreadView";
import { COMMUNITY_BORDERS, COMMUNITY_COLORS } from "../components/comunidad/shared";
import { useComunidad } from "../context/ComunidadContext";

export default function ComunidadDetalle() {
  const { id } = useParams();
  const { posts, showAuthModal, setShowAuthModal } = useComunidad();
  const post = posts.find((item) => item.id === id);

  return (
    <Page light footerVariant="none">
      {post ? (
        <ThreadView post={post} />
      ) : (
        <div style={{ borderLeft: COMMUNITY_BORDERS.light, padding: "64px 32px" }}>
          <p
            style={{
              fontFamily: "monospace",
              fontSize: 10,
              color: COMMUNITY_COLORS.text,
              opacity: 0.25,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              margin: 0,
            }}
          >
            Hilo no encontrado.
          </p>
        </div>
      )}

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </Page>
  );
}
