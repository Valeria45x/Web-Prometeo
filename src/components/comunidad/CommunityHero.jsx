import Button from "../system/Button";
import { Grid, GridCell } from "../system/Grid";
import {
  COMMUNITY_BORDERS,
  COMMUNITY_COLORS,
  COMMUNITY_FONTS,
  getRoleLabel,
} from "./shared";

export default function CommunityHero({
  currentUser,
  query,
  onQueryChange,
  onClearQuery,
  onOpenAuth,
  onOpenNewThread,
  onLogout,
  userPostCount,
  userReplyCount,
}) {
  return (
    <Grid
      as="section"
      columns="site"
      style={{
        background: COMMUNITY_COLORS.darkBackground,
      }}
    >
      <GridCell
        span={3}
        style={{
          borderRight: COMMUNITY_BORDERS.dark,
          padding: "60px 48px 56px",
          display: "flex",
          flexDirection: "column",
          gap: 44,
        }}
      >
        <div>
          <h1
            className="section-title"
            style={{
              color: COMMUNITY_COLORS.textOnDark,
              lineHeight: 1.05,
              margin: "0 0 20px",
            }}
          >
            La privacidad digital,{" "}
            <span style={{ color: COMMUNITY_COLORS.accent }}>discutida.</span>
          </h1>
          <p
            style={{
              fontFamily: COMMUNITY_FONTS.sans,
              fontSize: 17,
              color: COMMUNITY_COLORS.textOnDark,
              opacity: 0.5,
              lineHeight: 1.65,
              margin: 0,
              maxWidth: "56ch",
            }}
          >
            Pregunta, responde y aprende con la comunidad Prometeo. Cada hilo es
            una conversacion que importa.
          </p>
        </div>

        <div
          style={{
            border: COMMUNITY_BORDERS.dark,
            display: "flex",
            alignItems: "center",
            height: 60,
            background: "rgba(255,255,255,0.02)",
          }}
        >
          <span
            style={{
              ...COMMUNITY_FONTS.mono,
              fontSize: 16,
              color: COMMUNITY_COLORS.textOnDark,
              opacity: 0.2,
              padding: "0 22px",
              flexShrink: 0,
              userSelect: "none",
            }}
          >
            /
          </span>
          <input
            type="text"
            placeholder="Buscar hilos, temas, etiquetas..."
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            style={{
              flex: 1,
              background: "none",
              border: "none",
              outline: "none",
              fontFamily: COMMUNITY_FONTS.sans,
              fontSize: 17,
              color: COMMUNITY_COLORS.textOnDark,
              caretColor: COMMUNITY_COLORS.accent,
            }}
          />
          {query && (
            <Button
              variant="ghost"
              surface="dark"
              size="xs"
              font="mono"
              style={{ padding: "0 20px", opacity: 0.35, flexShrink: 0 }}
              onClick={onClearQuery}
            >
              x limpiar
            </Button>
          )}
          <div
            style={{
              borderLeft: COMMUNITY_BORDERS.dark,
              height: "100%",
              display: "flex",
              alignItems: "center",
              padding: "0 24px",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                ...COMMUNITY_FONTS.mono,
                fontSize: 9,
                color: COMMUNITY_COLORS.textOnDark,
                opacity: 0.3,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Buscar
            </span>
          </div>
        </div>
      </GridCell>

      <GridCell style={{ display: "flex", flexDirection: "column" }}>
        {currentUser ? (
          <>
            <div
              style={{
                borderBottom: COMMUNITY_BORDERS.dark,
                padding: "28px 28px 24px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  marginBottom: 16,
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    background: COMMUNITY_COLORS.accent,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      fontFamily: COMMUNITY_FONTS.display,
                      fontSize: 20,
                      fontWeight: 900,
                      color: COMMUNITY_COLORS.accentDeep,
                    }}
                  >
                    {currentUser.displayName?.[0]?.toUpperCase() ?? "?"}
                  </span>
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: COMMUNITY_FONTS.sans,
                      fontSize: 14,
                      fontWeight: 600,
                      color: COMMUNITY_COLORS.textOnDark,
                      lineHeight: 1.2,
                    }}
                  >
                    {currentUser.displayName}
                  </div>
                  <div
                    style={{
                      ...COMMUNITY_FONTS.mono,
                      fontSize: 9,
                      color: COMMUNITY_COLORS.textOnDark,
                      opacity: 0.4,
                      marginTop: 3,
                    }}
                  >
                    @{currentUser.handle}
                  </div>
                </div>
              </div>
              <div
                style={{
                  ...COMMUNITY_FONTS.mono,
                  fontSize: 9,
                  color: COMMUNITY_COLORS.accent,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  border: `1px solid ${COMMUNITY_COLORS.accentSoftBorder}`,
                  display: "inline-block",
                  padding: "4px 8px",
                }}
              >
                {getRoleLabel(currentUser.role)}
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              {[
                { label: "Hilos abiertos", value: userPostCount },
                { label: "Respuestas dadas", value: userReplyCount },
              ].map(({ label, value }, index) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "14px 28px",
                    borderBottom:
                      index < 1 ? "1px solid rgba(48,48,48,0.6)" : "none",
                  }}
                >
                  <span
                    style={{
                      ...COMMUNITY_FONTS.mono,
                      fontSize: 9,
                      color: COMMUNITY_COLORS.textOnDark,
                      opacity: 0.4,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {label}
                  </span>
                  <span
                    style={{
                      fontFamily: COMMUNITY_FONTS.display,
                      fontSize: 22,
                      fontWeight: 900,
                      color:
                        value > 0
                          ? COMMUNITY_COLORS.accent
                          : COMMUNITY_COLORS.textOnDark,
                      opacity: value > 0 ? 1 : 0.2,
                      lineHeight: 1,
                    }}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>

            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: "28px 28px 24px",
                gap: 12,
              }}
            >
              <p
                style={{
                  fontFamily: COMMUNITY_FONTS.sans,
                  fontSize: 13,
                  color: COMMUNITY_COLORS.textOnDark,
                  opacity: 0.45,
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                Tienes una pregunta o algo que compartir sobre privacidad
                digital?
              </p>
              <Button
                fullWidth
                variant="primary"
                surface="dark"
                emphasis="accent"
                size="md"
                font="mono"
                onClick={onOpenNewThread}
              >
                Abrir nuevo hilo
              </Button>
              <Button
                fullWidth
                variant="outline"
                surface="dark"
                emphasis="accent"
                size="md"
                font="mono"
                onClick={onLogout}
              >
                Salir
              </Button>
            </div>
          </>
        ) : (
          <>
            <div
              style={{
                borderBottom: COMMUNITY_BORDERS.dark,
                padding: "28px 28px 24px",
              }}
            >
              <div
                style={{
                  ...COMMUNITY_FONTS.mono,
                  fontSize: 9,
                  color: COMMUNITY_COLORS.accent,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: 12,
                }}
              >
                Tu espacio
              </div>
              <p
                style={{
                  fontFamily: COMMUNITY_FONTS.sans,
                  fontSize: 14,
                  color: COMMUNITY_COLORS.textOnDark,
                  opacity: 0.55,
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                Unete para abrir hilos y responder las mejores preguntas.
              </p>
            </div>

            <div
              style={{
                borderBottom: COMMUNITY_BORDERS.dark,
                display: "flex",
                flexDirection: "column",
                flex: 1,
              }}
            >
              {[
                "Abre hilos sobre privacidad",
                "Responde y gana reputacion",
                "Vota lo que mas te ayudo",
              ].map((item, index) => (
                <div
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 12,
                    padding: "14px 28px",
                    borderBottom:
                      index < 2 ? "1px solid rgba(48,48,48,0.6)" : "none",
                  }}
                >
                  <span
                    style={{
                      color: COMMUNITY_COLORS.accent,
                      fontSize: 10,
                      flexShrink: 0,
                      lineHeight: 1.5,
                      fontWeight: 700,
                    }}
                  >
                    -
                  </span>
                  <span
                    style={{
                      ...COMMUNITY_FONTS.mono,
                      fontSize: 9,
                      color: COMMUNITY_COLORS.textOnDark,
                      opacity: 0.45,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      lineHeight: 1.5,
                    }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div
              style={{
                padding: "24px 28px",
                marginTop: "auto",
              }}
            >
              <Button
                fullWidth
                variant="outline"
                surface="dark"
                emphasis="accent"
                size="md"
                font="mono"
                onClick={onOpenAuth}
              >
                Acceder
              </Button>
            </div>
          </>
        )}
      </GridCell>
    </Grid>
  );
}
