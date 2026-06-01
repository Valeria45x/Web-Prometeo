import { Link, Navigate, useParams } from "react-router-dom";
import HeroTransitionGrid from "../HeroTransitionGrid";
import { Page } from "../Page";
import { Grid, GridCell } from "../system/Grid";
import { BORDERS, COLORS, FONTS, TRANSITIONS } from "../../design/tokens";
import { getPrometeoTopbarTokens } from "../../design/prometeoSystem";
import { typeStyle } from "../../design/typography";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { scrollToTopImmediate } from "../../lib/lenis";
import { LEGAL_LINKS, getLegalPage } from "../../data/legal";
import "./LegalPage.css";

const bd = BORDERS.light;
const T = `background ${TRANSITIONS.emphasis}, color ${TRANSITIONS.emphasis}, border-color ${TRANSITIONS.emphasis}`;

function Label({ children }) {
  return (
    <span
      style={{
        ...typeStyle("metaStrong"),
        color: COLORS.accent,
      }}
    >
      {children}
    </span>
  );
}

function LegalNav({ currentSlug, compact = false }) {
  const topbarTokens = getPrometeoTopbarTokens({ compact });

  return (
    <nav
      aria-label="Paginas legales"
      className="legal-page__nav"
      style={{ borderTop: bd }}
    >
      {LEGAL_LINKS.map((item) => {
        const slug = item.to.split("/").at(-1);
        const active = slug === currentSlug;

        return (
          <Link
            key={item.to}
            to={item.to}
            className="legal-page__nav-link"
            data-active={active ? "true" : undefined}
            aria-current={active ? "page" : undefined}
            onClick={scrollToTopImmediate}
            style={{
              "--legal-hover-bg": COLORS.grayDark,
              "--legal-hover-text": COLORS.textOnDark,
              minHeight: "var(--prometeo-topbar-height)",
              padding: compact ? "0 16px" : topbarTokens.itemPadding,
              borderBottom: bd,
              color: active ? COLORS.footerText : COLORS.textOnLight,
              background: active ? COLORS.accent : COLORS.pageLight,
              transition: T,
            }}
          >
            <span
              className="legal-page__nav-label"
              style={{
                fontFamily: FONTS.sans,
                fontSize: topbarTokens.navFontSize,
                lineHeight: topbarTokens.navLineHeight,
                fontWeight: 800,
                letterSpacing: 0,
                color: active ? COLORS.footerText : COLORS.textOnLight,
                transition: T,
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
              ...typeStyle("body"),
              margin: 0,
              maxWidth: "44rem",
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
          <LegalNav currentSlug={slug} compact={isMobileLayout} />
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
                  ...typeStyle("titleMd", { fontFamily: FONTS.display }),
                  margin: 0,
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
                      ...typeStyle("body"),
                      margin: 0,
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
