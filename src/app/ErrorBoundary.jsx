import { Component } from "react";
import { COLORS, FONTS } from "@/design/tokens";

// Captura errores de render y fallos al cargar chunks lazy (red mala). Sin esto,
// un error deja la página en blanco. Se reinicia al cambiar de ruta porque en
// RouteTransition se le pasa `key={pathname}`.
export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    if (import.meta.env.DEV) {
      console.error("ErrorBoundary capturó:", error, info);
    }
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div
        role="alert"
        style={{
          minHeight: "100svh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
          padding: "0 24px",
          textAlign: "center",
          background: COLORS.grayDark,
          color: COLORS.grayWhite,
          fontFamily: FONTS.sans,
        }}
      >
        <p
          style={{
            margin: 0,
            fontFamily: FONTS.mono,
            fontSize: 13,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: COLORS.accent,
          }}
        >
          Error
        </p>
        <h1
          style={{
            margin: 0,
            fontSize: "clamp(28px, 5vw, 44px)",
            fontWeight: 800,
          }}
        >
          Algo no cargó.
        </h1>
        <p
          style={{
            margin: 0,
            maxWidth: "42ch",
            opacity: 0.72,
            lineHeight: 1.5,
          }}
        >
          No hemos podido mostrar esta parte. Puede ser una conexión inestable.
          Vuelve a intentarlo.
        </p>
        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <button
            type="button"
            onClick={() => window.location.reload()}
            style={{
              padding: "12px 24px",
              background: COLORS.grayWhite,
              color: COLORS.grayDark,
              border: 0,
              fontWeight: 800,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            Recargar
          </button>
          <a
            href="/"
            style={{
              padding: "12px 24px",
              border: "1px solid rgba(250, 250, 250, 0.4)",
              color: COLORS.grayWhite,
              textDecoration: "none",
              fontWeight: 800,
            }}
          >
            Ir al inicio
          </a>
        </div>
      </div>
    );
  }
}
