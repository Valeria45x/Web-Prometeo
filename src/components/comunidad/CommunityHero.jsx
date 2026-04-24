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
      style={{ background: COMMUNITY_COLORS.lightBackground }}
    >
      {/* Left — title + search */}
      <GridCell
        span={3}
        style={{
          borderRight: COMMUNITY_BORDERS.soft,
          padding: "72px 48px 64px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 48,
        }}
      >
        <div>
          <h1
            className="section-title"
            style={{
              color: COMMUNITY_COLORS.text,
              lineHeight: 1.05,
              margin: 0,
              maxWidth: "16ch",
            }}
          >
            Comunidad
          </h1>
          <p
            style={{
              fontFamily: COMMUNITY_FONTS.sans,
              fontSize: 16,
              color: COMMUNITY_COLORS.text,
              opacity: 0.45,
              lineHeight: 1.65,
              margin: "20px 0 0",
              maxWidth: "100%",
            }}
          >
            Un espacio abierto para preguntar, debatir y compartir experiencias
            sobre privacidad digital con otras personas de la comunidad.
          </p>
        </div>

        {/* Search */}
        <div
          style={{
            border: COMMUNITY_BORDERS.soft,
            display: "flex",
            alignItems: "center",
            height: 52,
          }}
        >
          <input
            type="text"
            placeholder="Buscar hilos, temas o etiquetas..."
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            style={{
              flex: 1,
              background: "none",
              border: "none",
              outline: "none",
              fontFamily: COMMUNITY_FONTS.sans,
              fontSize: 16,
              color: COMMUNITY_COLORS.text,
              caretColor: COMMUNITY_COLORS.accent,
              padding: "0 16px",
            }}
          />
          {query ? (
            <button
              type="button"
              onClick={onClearQuery}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                ...COMMUNITY_FONTS.mono,
                fontSize: 9,
                color: COMMUNITY_COLORS.text,
                opacity: 0.3,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "0 4px",
                flexShrink: 0,
              }}
            >
              limpiar
            </button>
          ) : null}
        </div>
      </GridCell>

      {/* Right — user panel */}
      <GridCell
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 32px 64px",
        }}
      >
        {currentUser ? (
          <>
            {/* User identity */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
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
                      fontSize: 16,
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
                      color: COMMUNITY_COLORS.text,
                      lineHeight: 1.2,
                    }}
                  >
                    {currentUser.displayName}
                  </div>
                  <div
                    style={{
                      ...COMMUNITY_FONTS.mono,
                      fontSize: 9,
                      color: COMMUNITY_COLORS.text,
                      opacity: 0.35,
                      marginTop: 2,
                      letterSpacing: "0.06em",
                    }}
                  >
                    {getRoleLabel(currentUser.role)}
                  </div>
                </div>
              </div>

              {/* Stats — minimal */}
              <div
                style={{
                  display: "flex",
                  gap: 20,
                  marginTop: 8,
                  paddingTop: 16,
                }}
              >
                {[
                  { label: "Hilos", value: userPostCount },
                  { label: "Respuestas", value: userReplyCount },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <div
                      style={{
                        fontFamily: COMMUNITY_FONTS.display,
                        fontSize: 20,
                        fontWeight: 900,
                        color:
                          value > 0
                            ? COMMUNITY_COLORS.accent
                            : COMMUNITY_COLORS.text,
                        opacity: value > 0 ? 1 : 0.15,
                        lineHeight: 1,
                      }}
                    >
                      {value}
                    </div>
                    <div
                      style={{
                        ...COMMUNITY_FONTS.mono,
                        fontSize: 8,
                        color: COMMUNITY_COLORS.text,
                        opacity: 0.35,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        marginTop: 4,
                      }}
                    >
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Full-width divider */}
            <div
              style={{
                borderTop: COMMUNITY_BORDERS.soft,
                marginLeft: -32,
                marginRight: -32,
              }}
            />

            {/* Actions */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <Button
                fullWidth
                variant="outline"
                surface="light"
                emphasis="neutral"
                font="sans"
                size="md"
                align="start"
                onClick={onOpenNewThread}
              >
                Abrir nuevo hilo
              </Button>
              <Button
                fullWidth
                variant="outline"
                surface="light"
                emphasis="neutral"
                font="sans"
                size="md"
                align="start"
                onClick={onLogout}
              >
                Salir
              </Button>
            </div>
          </>
        ) : (
          <>
            {/* Value prop */}
            <p
              style={{
                fontFamily: COMMUNITY_FONTS.sans,
                fontSize: 15,
                color: COMMUNITY_COLORS.text,
                opacity: 0.45,
                lineHeight: 1.65,
                margin: 0,
                maxWidth: "28ch",
              }}
            >
              Un espacio para preguntar, compartir y aprender junto a otras
              personas de la comunidad.
            </p>

            {/* CTA */}
            <Button
              fullWidth
              variant="primary"
              surface="light"
              emphasis="accent"
              size="md"
              font="mono"
              onClick={onOpenAuth}
            >
              Unirse a la comunidad
            </Button>
          </>
        )}
      </GridCell>
    </Grid>
  );
}
