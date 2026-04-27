import { useMemo, useState } from "react";
import AuthModal from "../comunidad/AuthModal";
import HeroTransitionGrid from "../HeroTransitionGrid";
import Button from "../system/Button";
import { Grid, GridCell } from "../system/Grid";
import { Page } from "../Page";
import { useComunidad } from "../../context/ComunidadContext";
import { useTienda } from "../../context/TiendaContext";
import { BORDERS, COLORS, FONTS } from "../../design/tokens";
import { formatPrice } from "../../data/tienda";
import { getRoleLabel } from "../comunidad/shared";

const bd = BORDERS.dark;
const mono = { fontFamily: FONTS.mono };
const UI = {
  bg: COLORS.pageLight,
  panel: COLORS.pageLight,
  hover: COLORS.canvasLight,
  text: COLORS.textOnLight,
  muted: COLORS.textMutedLight,
  soft: "#e8e8e8",
};

function formatDate(iso) {
  if (!iso) return "-";
  return new Date(iso).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function Label({ children }) {
  return (
    <span
      style={{
        ...mono,
        fontSize: 8,
        color: UI.muted,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
      }}
    >
      {children}
    </span>
  );
}

function StatCell({ label, value, accent = false }) {
  return (
    <GridCell
      className="profile-stat-cell"
      style={{
        borderRight: bd,
        borderBottom: bd,
        padding: "24px",
        minHeight: 128,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: UI.bg,
      }}
    >
      <Label>{label}</Label>
      <strong
        style={{
          fontFamily: FONTS.display,
          fontSize: 34,
          lineHeight: 1,
          color: accent ? COLORS.accent : UI.text,
        }}
      >
        {value}
      </strong>
    </GridCell>
  );
}

function SectionTitle({ eyebrow, title, aside }) {
  return (
    <div
      className="profile-section-title"
      style={{
        borderBottom: bd,
        padding: "18px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        background: UI.bg,
      }}
    >
      <div>
        <Label>{eyebrow}</Label>
        <h2
          style={{
            fontFamily: FONTS.display,
            fontSize: 24,
            lineHeight: 1.05,
            color: UI.text,
            margin: "8px 0 0",
          }}
        >
          {title}
        </h2>
      </div>
      {aside}
    </div>
  );
}

function EmptyState({ children }) {
  return (
    <div
      style={{
        padding: 24,
        ...mono,
        fontSize: 9,
        color: UI.muted,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
      }}
    >
      {children}
    </div>
  );
}

function ThreadRow({ post, replies, currentUser }) {
  const postReplies = replies.filter((reply) => reply.postId === post.id);
  const externalReplies = postReplies.filter(
    (reply) => reply.authorId !== currentUser.id,
  );
  const latestReply = postReplies
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
  const hasUpdate = latestReply && latestReply.authorId !== currentUser.id;

  return (
    <div
      className="profile-thread-row"
      style={{
        borderBottom: bd,
        padding: "22px 24px",
        display: "grid",
        gridTemplateColumns: "minmax(0, 1fr) auto",
        gap: 18,
        alignItems: "start",
        background: hasUpdate ? "rgba(255,60,84,0.06)" : UI.bg,
      }}
    >
      <div style={{ minWidth: 0 }}>
        <div
          style={{
            fontFamily: FONTS.sans,
            fontSize: 15,
            fontWeight: 700,
            color: UI.text,
            lineHeight: 1.35,
            marginBottom: 10,
          }}
        >
          {post.title}
        </div>
        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            ...mono,
            fontSize: 9,
            color: UI.muted,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          <span>{postReplies.length} respuestas</span>
          <span>{externalReplies.length} de otros usuarios</span>
          <span>{post.isSolved ? "resuelto" : "abierto"}</span>
        </div>
      </div>
      <span
        style={{
          ...mono,
          fontSize: 8,
          color: hasUpdate ? COLORS.accent : UI.muted,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
        }}
      >
        {hasUpdate ? "update" : formatDate(post.createdAt)}
      </span>
    </div>
  );
}

function FollowedRow({ post, replies, currentUser }) {
  const latestReply = replies
    .filter((reply) => reply.postId === post.id)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
  const hasUpdate = latestReply && latestReply.authorId !== currentUser.id;

  return (
    <div
      className="profile-followed-row"
      style={{
        borderBottom: bd,
        padding: "18px 24px",
        display: "flex",
        justifyContent: "space-between",
        gap: 16,
        background: hasUpdate ? "rgba(255,60,84,0.06)" : UI.bg,
      }}
    >
      <span
        style={{
          fontFamily: FONTS.sans,
          fontSize: 14,
          color: UI.text,
          lineHeight: 1.35,
        }}
      >
        {post.title}
      </span>
      <span
        style={{
          ...mono,
          fontSize: 8,
          color: hasUpdate ? COLORS.accent : UI.muted,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
        }}
      >
        {hasUpdate ? "nuevo" : "sin cambios"}
      </span>
    </div>
  );
}

function OrderRow({ order }) {
  return (
    <div
      className="profile-order-row"
      style={{
        borderBottom: bd,
        padding: "20px 24px",
        display: "grid",
        gridTemplateColumns: "minmax(0, 1fr) auto",
        gap: 16,
      }}
    >
      <div>
        <div
          style={{
            fontFamily: FONTS.sans,
            fontSize: 15,
            fontWeight: 700,
            color: UI.text,
            marginBottom: 8,
          }}
        >
          Pedido {order.id.replace("ord_", "#")}
        </div>
        <div
          style={{
            ...mono,
            fontSize: 9,
            color: UI.muted,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          {formatDate(order.createdAt)} / {order.items.length} productos /{" "}
          {order.status}
        </div>
      </div>
      <strong
        style={{
          ...mono,
          fontSize: 12,
          color: COLORS.accent,
          whiteSpace: "nowrap",
        }}
      >
        {formatPrice(order.total)}
      </strong>
    </div>
  );
}

function EditProfileForm({ currentUser, onCancel, onSave }) {
  const [form, setForm] = useState({
    displayName: currentUser.displayName ?? "",
    handle: currentUser.handle ?? "",
    email: currentUser.email ?? "",
  });
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const result = onSave(form);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setError("");
  }

  const fieldStyle = {
    background: UI.bg,
    border: bd,
    color: UI.text,
    fontFamily: FONTS.sans,
    fontSize: 14,
    padding: "12px 14px",
    width: "100%",
  };

  return (
    <form
      className="profile-edit-form"
      onSubmit={handleSubmit}
      style={{
        borderBottom: bd,
        padding: 24,
        display: "grid",
        gridTemplateColumns: "repeat(3, minmax(0, 1fr)) auto auto",
        gap: 12,
        alignItems: "end",
        background: UI.panel,
      }}
    >
      {[
        ["displayName", "Nombre"],
        ["handle", "Handle"],
        ["email", "Email"],
      ].map(([key, label]) => (
        <label key={key} style={{ display: "grid", gap: 8 }}>
          <Label>{label}</Label>
          <input
            value={form[key]}
            onChange={(event) =>
              setForm((current) => ({ ...current, [key]: event.target.value }))
            }
            style={fieldStyle}
          />
        </label>
      ))}
      <Button type="submit" variant="primary" surface="light" size="md">
        Guardar
      </Button>
      <Button variant="outline" surface="light" size="md" onClick={onCancel}>
        Cancelar
      </Button>
      {error ? (
        <p
          style={{
            gridColumn: "1 / -1",
            margin: 0,
            ...mono,
            fontSize: 9,
            color: COLORS.accent,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          {error}
        </p>
      ) : null}
    </form>
  );
}

export default function PerfilPage() {
  const {
    currentUser,
    posts,
    replies,
    showAuthModal,
    setShowAuthModal,
    confirmEmail,
    pendingUser,
    updateCurrentUser,
  } = useComunidad();
  const { cart, cartCount, cartTotal, orders } = useTienda();
  const [editing, setEditing] = useState(false);

  const profileData = useMemo(() => {
    if (!currentUser) return null;

    const myPosts = posts.filter((post) => post.authorId === currentUser.id);
    const myReplies = replies.filter(
      (reply) => reply.authorId === currentUser.id,
    );
    const followedPosts = posts.filter((post) =>
      post.followerIds?.includes(currentUser.id),
    );
    const savedPosts = posts.filter((post) =>
      currentUser.savedPosts?.includes(post.id),
    );
    const answeredThreads = myPosts.filter((post) =>
      replies.some(
        (reply) =>
          reply.postId === post.id && reply.authorId !== currentUser.id,
      ),
    );
    const followedWithUpdates = followedPosts.filter((post) => {
      const latestReply = replies
        .filter((reply) => reply.postId === post.id)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
      return latestReply && latestReply.authorId !== currentUser.id;
    });
    const visibleOrders = orders.filter(
      (order) => !order.userId || order.userId === currentUser.id,
    );

    return {
      myPosts,
      myReplies,
      followedPosts,
      savedPosts,
      answeredThreads,
      followedWithUpdates,
      visibleOrders,
    };
  }, [currentUser, orders, posts, replies]);

  if (!currentUser && !pendingUser) {
    return (
      <Page light>
        <Grid columns="site" className="profile-guest">
          <GridCell
            span={3}
            collapseSpanOnTablet
            collapseSpanOnMobile
            style={{
              borderRight: bd,
              padding: "72px 48px",
              background: UI.bg,
            }}
          >
            <Label>Perfil Prometeo</Label>
            <h1
              className="section-title"
              style={{ color: UI.text, margin: "14px 0 18px" }}
            >
              Tu centro de control.
            </h1>
            <p
              style={{
                fontFamily: FONTS.sans,
                fontSize: 15,
                lineHeight: 1.6,
                color: UI.muted,
                margin: "0 0 28px",
                maxWidth: 560,
              }}
            >
              Accede para ver tus hilos, respuestas, seguimientos, compras y
              datos de cuenta desde un unico panel.
            </p>
            <Button
              variant="primary"
              surface="light"
              size="md"
              onClick={() => setShowAuthModal(true)}
            >
              Acceder / Registrarse
            </Button>
          </GridCell>
          <GridCell
            style={{
              background: COLORS.accent,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 220,
            }}
          >
            <span
              style={{
                writingMode: "vertical-rl",
                ...mono,
                fontSize: 8,
                fontWeight: 700,
                color: COLORS.footerText,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Perfil
            </span>
          </GridCell>
        </Grid>
        <HeroTransitionGrid background={UI.bg} border={bd} />
        {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
      </Page>
    );
  }

  if (pendingUser && !currentUser) {
    return (
      <Page light>
        <div style={{ padding: 32, borderBottom: bd, background: UI.bg }}>
          <Label>Confirma tu email</Label>
          <p
            style={{
              fontFamily: FONTS.sans,
              fontSize: 15,
              color: UI.muted,
              lineHeight: 1.6,
              margin: "14px 0 24px",
            }}
          >
            Email enviado a {pendingUser.email}. En esta demo puedes confirmar
            directamente.
          </p>
          <Button
            variant="primary"
            surface="light"
            size="md"
            onClick={confirmEmail}
          >
            Confirmar email
          </Button>
        </div>
      </Page>
    );
  }

  const {
    myPosts,
    myReplies,
    followedPosts,
    savedPosts,
    answeredThreads,
    followedWithUpdates,
    visibleOrders,
  } = profileData;

  const tabs = [
    { id: "comunidad", label: "Comunidad" },
    { id: "tienda", label: "Tienda" },
    { id: "cuenta", label: "Cuenta" },
  ];
  const [activeTab, setActiveTab] = useState("comunidad");

  return (
    <Page light>
      {/* Hero */}
      <Grid columns="site" className="profile-hero">
        <GridCell
          style={{
            borderRight: bd,
            minHeight: 220,
            background: COLORS.accent,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontFamily: FONTS.display,
              fontSize: 62,
              fontWeight: 900,
              color: COLORS.accentDeep,
              lineHeight: 1,
            }}
          >
            {currentUser.displayName?.[0]?.toUpperCase() ?? "?"}
          </span>
        </GridCell>

        <GridCell
          span={3}
          collapseSpanOnTablet
          collapseSpanOnMobile
          style={{
            borderRight: bd,
            padding: "36px 40px",
            background: UI.bg,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <Label>{getRoleLabel(currentUser.role)}</Label>
          <h1
            className="section-title"
            style={{ color: UI.text, margin: "8px 0 4px" }}
          >
            {currentUser.displayName}
          </h1>
          <p
            style={{
              ...mono,
              fontSize: 10,
              color: UI.muted,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            @{currentUser.handle} /{" "}
            {currentUser.emailVerified ? "email verificado" : "email pendiente"}
          </p>
        </GridCell>
      </Grid>

      <HeroTransitionGrid background={UI.bg} border={bd} columns="site" />

      {/* Tab bar */}
      <div
        style={{
          display: "flex",
          borderBottom: bd,
          background: UI.bg,
        }}
      >
        {tabs.map((tab) => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: active ? COLORS.accent : "transparent",
                border: "none",
                borderRight: bd,
                padding: "0 28px",
                height: 44,
                cursor: "pointer",
                fontFamily: FONTS.mono,
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: active ? COLORS.footerText : UI.muted,
                transition: "background 0.2s, color 0.2s",
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab: Comunidad */}
      {activeTab === "comunidad" && (
        <Grid columns="halves" className="profile-community-grid">
          <GridCell style={{ borderRight: bd, borderBottom: bd }}>
            <SectionTitle
              eyebrow="Mis hilos"
              title="Publicados"
              aside={<Label>{myPosts.length}</Label>}
            />
            {myPosts.length === 0 ? (
              <EmptyState>Todavía no has publicado ningún hilo.</EmptyState>
            ) : (
              myPosts
                .slice(0, 6)
                .map((post) => (
                  <ThreadRow
                    key={post.id}
                    post={post}
                    replies={replies}
                    currentUser={currentUser}
                  />
                ))
            )}
          </GridCell>

          <GridCell style={{ borderBottom: bd }}>
            <SectionTitle
              eyebrow="Seguimiento"
              title="Hilos que sigues"
              aside={<Label>{followedPosts.length}</Label>}
            />
            {followedPosts.length === 0 ? (
              <EmptyState>No sigues ningún hilo todavía.</EmptyState>
            ) : (
              followedPosts
                .slice(0, 6)
                .map((post) => (
                  <FollowedRow
                    key={post.id}
                    post={post}
                    replies={replies}
                    currentUser={currentUser}
                  />
                ))
            )}
            {savedPosts.length > 0 ? (
              <div style={{ padding: "16px 24px", borderTop: bd }}>
                <Label>Guardados: {savedPosts.length}</Label>
              </div>
            ) : null}
          </GridCell>
        </Grid>
      )}

      {/* Tab: Tienda */}
      {activeTab === "tienda" && (
        <Grid columns="halves" className="profile-shop-grid">
          <GridCell style={{ borderRight: bd, borderBottom: bd }}>
            <SectionTitle
              eyebrow="Carrito actual"
              title={formatPrice(cartTotal)}
              aside={<Label>{cart.length} líneas</Label>}
            />
            {cart.length === 0 ? (
              <EmptyState>Tu carrito está vacío.</EmptyState>
            ) : (
              cart.map((item) => (
                <div
                  key={`${item.productId}-${item.variant ?? "default"}`}
                  style={{
                    borderBottom: bd,
                    padding: "18px 24px",
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 16,
                  }}
                >
                  <span style={{ fontFamily: FONTS.sans, color: UI.text }}>
                    {item.product.name}
                  </span>
                  <Label>
                    {item.quantity} x {formatPrice(item.product.price)}
                  </Label>
                </div>
              ))
            )}
          </GridCell>

          <GridCell style={{ borderBottom: bd }}>
            <SectionTitle
              eyebrow="Historial"
              title="Pedidos anteriores"
              aside={<Label>{visibleOrders.length}</Label>}
            />
            {visibleOrders.length === 0 ? (
              <EmptyState>Aún no hay compras anteriores.</EmptyState>
            ) : (
              visibleOrders
                .slice(0, 6)
                .map((order) => <OrderRow key={order.id} order={order} />)
            )}
          </GridCell>
        </Grid>
      )}

      {/* Tab: Cuenta */}
      {activeTab === "cuenta" && (
        <div style={{ borderBottom: bd, background: UI.bg }}>
          {editing ? (
            <EditProfileForm
              currentUser={currentUser}
              onCancel={() => setEditing(false)}
              onSave={(form) => {
                const result = updateCurrentUser(form);
                if (result.ok) setEditing(false);
                return result;
              }}
            />
          ) : (
            <div
              style={{
                padding: "32px 40px",
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: 24,
                borderBottom: bd,
              }}
            >
              {[
                ["Nombre", currentUser.displayName],
                ["Handle", `@${currentUser.handle}`],
                ["Email", currentUser.email],
              ].map(([label, value]) => (
                <div key={label} style={{ display: "grid", gap: 8 }}>
                  <Label>{label}</Label>
                  <span
                    style={{
                      fontFamily: FONTS.sans,
                      fontSize: 15,
                      color: UI.text,
                    }}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>
          )}
          <div
            style={{
              padding: "20px 40px",
              display: "flex",
              gap: 12,
            }}
          >
            <Button
              variant="outline"
              surface="light"
              size="md"
              onClick={() => setEditing((current) => !current)}
            >
              {editing ? "Cancelar" : "Editar información"}
            </Button>
            {!currentUser.emailVerified ? (
              <Button
                variant="outline"
                surface="light"
                emphasis="accent"
                size="md"
                onClick={confirmEmail}
              >
                Confirmar email
              </Button>
            ) : null}
          </div>
        </div>
      )}

      <HeroTransitionGrid background={UI.bg} border={bd} />
    </Page>
  );
}
