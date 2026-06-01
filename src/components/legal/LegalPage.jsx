import { Link, Navigate, useParams } from "react-router-dom";
import HeroTransitionGrid from "../HeroTransitionGrid";
import { Page } from "../Page";
import { Grid, GridCell } from "../system/Grid";
import { BORDERS, COLORS, FONTS } from "../../design/tokens";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { LEGAL_LINKS, getLegalPage } from "../../data/legal";

const bd = BORDERS.light;

function Label({ children }) {
  return (
    <span
      style={{
        fontFamily: FONTS.mono,
        fontSize: 8,
        lineHeight: "16px",
        letterSpacing: "0.1em",
        color: COLORS.accent,
      }}
    >
      {children}
    </span>
  );
}

function LegalNav({ currentSlug }) {
  return (
    <nav
      aria-label="Páginas legales"
      style={{
        display: "grid",
        borderTop: bd,
      }}
    >
      {LEGAL_LINKS.map((item) => {
        const slug = item.to.split("/").at(-1);
        const active = slug === currentSlug;

        return (
          <Link
            key={item.to}
            to={item.to}
            style={{
              minHeight: 52,
              display: "flex",
              alignItems: "center",
              padding: "0 24px",
              borderBottom: bd,
              color: active ? COLORS.footerText : COLORS.textOnLight,
              background: active ? COLORS.accent : COLORS.pageLight,
              textDecoration: "none",
              transition: "background 0.2s ease, color 0.2s ease",
            }}
          >
            <span
              style={{
                fontFamily: FONTS.sans,
                fontSize: 14,
                lineHeight: "20px",
                fontWeight: active ? 800 : 700,
              }}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

export default function LegalPage() {
  const { slug } = useParams();
  const page = getLegalPage(slug);
  const isMobileLayout = useMediaQuery("(max-width: 767px)");

  if (!page) {
    return <Navigate to="/legal/politica-de-privacidad" replace />;
  }

  return (
    <Page light>
      <Grid columns="site">
        <GridCell
          style={{
            borderRight: bd,
            borderBottom: bd,
            padding: "32px 24px",
            display: "flex",
            alignItems: "flex-end",
            minHeight: 220,
            background: COLORS.pageLight,
          }}
        >
          <Label>{page.index}</Label>
        </GridCell>
        <GridCell
          span={3}
          collapseSpanOnTablet
          collapseSpanOnMobile
          style={{
            borderRight: bd,
            borderBottom: bd,
            padding: "72px 48px 56px",
            minHeight: "var(--prometeo-hero-height)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            gap: 20,
            background: COLORS.pageLight,
          }}
        >
          <Label>Actualizado: {page.updatedAt}</Label>
          <h1
            className="section-title"
            style={{
              margin: 0,
              color: COLORS.textOnLight,
              maxWidth: "11ch",
            }}
          >
            {page.title}
          </h1>
          <p
            style={{
              margin: 0,
              maxWidth: "44rem",
              fontFamily: FONTS.sans,
              fontSize: 18,
              lineHeight: "28px",
              color: COLORS.textOnLight,
              opacity: 0.72,
            }}
          >
            {page.summary}
          </p>
        </GridCell>
      </Grid>

      <HeroTransitionGrid background={COLORS.pageLight} border={bd} />

      <Grid columns="site">
        <GridCell
          style={{
            borderRight: bd,
            borderBottom: bd,
            background: COLORS.pageLight,
          }}
        >
          <LegalNav currentSlug={slug} />
        </GridCell>

        <GridCell
          span={3}
          collapseSpanOnTablet
          collapseSpanOnMobile
          style={{
            borderRight: bd,
            borderBottom: bd,
            background: COLORS.pageLight,
          }}
        >
          {page.sections.map((section, index) => (
            <section
              key={section.title}
              style={{
                display: "grid",
                gridTemplateColumns: isMobileLayout
                  ? "1fr"
                  : "minmax(8rem, 0.65fr) minmax(0, 1.35fr)",
                gap: isMobileLayout ? 16 : 32,
                padding: isMobileLayout ? "28px 24px" : "36px 48px",
                borderBottom:
                  index === page.sections.length - 1 ? "none" : bd,
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontFamily: FONTS.display,
                  fontSize: 24,
                  lineHeight: "28px",
                  fontWeight: 800,
                  color: COLORS.textOnLight,
                }}
              >
                {section.title}
              </h2>
              <div style={{ display: "grid", gap: 16 }}>
                {section.body.map((paragraph) => (
                  <p
                    key={paragraph}
                    style={{
                      margin: 0,
                      fontFamily: FONTS.sans,
                      fontSize: 16,
                      lineHeight: "28px",
                      color: COLORS.textOnLight,
                      opacity: 0.78,
                      maxWidth: "60ch",
                    }}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </GridCell>
      </Grid>
    </Page>
  );
}
