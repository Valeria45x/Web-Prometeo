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
      className="community-hero"
      style={{
        background: COMMUNITY_COLORS.lightBackground,
        position: "relative",
        zIndex: 2,
      }}
    >
      {/* Left — title + search */}
      <GridCell
        span={3}
        collapseSpanOnTablet
        collapseSpanOnMobile
        className="community-hero__intro"
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
            sobre privacidad digital con otras personas.
          </p>
        </div>

        {/* Search */}
        <div
          className="community-hero__search"
          style={{
            border: COMMUNITY_BORDERS.soft,
            display: "flex",
            alignItems: "center",
            height: 52,
          }}
        >
          <input
            id="community-search"
            name="community-search"
            type="text"
            autoComplete="off"
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
        className="community-hero__panel"
        style={{
          minWidth: 0,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {currentUser ? (
          <>
            {/* User identity — split left/right, takes all available space above actions */}
            <div
              className="community-hero__identity"
              style={{ display: "flex", alignItems: "stretch", flex: 1, minWidth: 0 }}
            >
              {/* Left: name + role + stats */}
              <div
                className="community-hero__identity-main"
                style={{
                  flex: "0 0 calc(50% - 0.5px)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  padding: "72px 32px 32px",
                  minWidth: 0,
                }}
              >
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

                {/* Stats — minimal */}
                <div
                  className="community-hero__stats"
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
                              : COMMUNITY_COLORS.mutedText,
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

              {/* Vertical grid line */}
              <div
                className="community-hero__identity-divider"
                style={{
                  borderLeft: COMMUNITY_BORDERS.soft,
                  alignSelf: "stretch",
                  flexShrink: 0,
                  width: 1,
                }}
              />

              {/* Right: avatar large */}
              <div
                className="community-hero__avatar"
                style={{
                  flex: "0 0 calc(50% - 0.5px)",
                  alignSelf: "stretch",
                  background: COMMUNITY_COLORS.accent,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: 0,
                }}
              >
                <span
                  className="community-hero__avatar-letter"
                  style={{
                    fontFamily: COMMUNITY_FONTS.display,
                    fontSize: 40,
                    fontWeight: 900,
                    color: COMMUNITY_COLORS.accentDeep,
                    lineHeight: 1,
                  }}
                >
                  {currentUser.displayName?.[0]?.toUpperCase() ?? "?"}
                </span>
              </div>
            </div>

            {/* Full-width divider */}
            <div style={{ borderTop: COMMUNITY_BORDERS.soft }} />

            {/* Actions */}
            <div
              className="community-hero__actions"
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                gap: 8,
                padding: "32px 32px 64px",
              }}
            >
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
          <div
            className="community-hero__guest"
            style={{
              display: "flex",
              flex: 1,
              alignItems: "stretch",
              minWidth: 0,
            }}
          >
            <div
              className="community-hero__guest-copy"
              style={{
                flex: "0 0 calc(50% - 0.5px)",
                padding: "72px 32px 32px",
                display: "flex",
                alignItems: "flex-start",
                minWidth: 0,
              }}
            >
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
            </div>

            <div
              className="community-hero__guest-divider"
              style={{
                borderLeft: COMMUNITY_BORDERS.soft,
                alignSelf: "stretch",
                flexShrink: 0,
                width: 1,
              }}
            />

            <div
              className="community-hero__guest-action"
              style={{
                flex: "0 0 calc(50% - 0.5px)",
                padding: "72px 32px 64px",
                display: "flex",
                alignItems: "flex-end",
                minWidth: 0,
              }}
            >
              <Button
                fullWidth
                variant="outline"
                surface="light"
                emphasis="neutral"
                font="sans"
                size="md"
                align="start"
                onClick={onOpenAuth}
              >
                Unirse a la comunidad
              </Button>
            </div>
          </div>
        )}
      </GridCell>
    </Grid>
  );
}
