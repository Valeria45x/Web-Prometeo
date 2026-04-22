import { useParams } from "react-router-dom";
import { Page } from "../components/Page";
import { ComunidadProvider, useComunidad } from "../context/ComunidadContext";
import ThreadView from "../components/comunidad/ThreadView";
import AuthModal from "../components/comunidad/AuthModal";

const B = "1px solid #D8D8D8";

function DetalleInner() {
  const { id } = useParams();
  const { posts, showAuthModal, setShowAuthModal } = useComunidad();

  const post = posts.find((p) => p.id === id);

  return (
    <Page light>
      {post ? (
        <ThreadView post={post} />
      ) : (
        <div style={{ borderLeft: B, padding: "64px 32px" }}>
          <p
            style={{
              fontFamily: "monospace",
              fontSize: 10,
              color: "#0A0A0A",
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

export default function ComunidadDetalle() {
  return (
    <ComunidadProvider>
      <DetalleInner />
    </ComunidadProvider>
  );
}
