import { useRef } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Page } from "../Page";
import Label from "../system/Label";
import NavigationButton from "../system/NavigationButton";
import TextReveal from "../system/TextReveal";
import { Grid, GridCell } from "../system/Grid";
import { BORDERS, COLORS, FONTS, TRANSITIONS } from "../../design/tokens";
import { getPrometeoTopbarTokens } from "../../design/prometeoSystem";
import { typeStyle } from "../../design/typography";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useScrollTextReveal } from "../../hooks/useScrollTextReveal";
import { scrollToTopImmediate } from "../../lib/lenis";
import { LEGAL_LINKS, getLegalPage } from "../../data/legal";
import "../landing/shared/scrollTextReveal.css";
import "./LegalPage.css";

const bd = BORDERS.light;

function LegalNav({ currentSlug, compact = false }) {
  const topbarTokens = getPrometeoTopbarTokens({ compact });

  return (
    <nav
      aria-label="Paginas legales"
      className="legal-page__nav"
    >
      {LEGAL_LINKS.map((item) => {
        const slug = item.to.split("/").at(-1);
        const active = slug === currentSlug;

        return (
          <NavigationButton
            key={item.to}
            as={Link}
            to={item.to}
            surface="light"
            active={active}
            className="legal-page__nav-link"
            titleClassName="legal-page__nav-label"
            aria-current={active ? "page" : undefined}
            onClick={scrollToTopImmediate}
            label={item.label}
            style={{
              "--ds-button-transition": TRANSITIONS.emphasis,
              "--ds-button-font-size": `${topbarTokens.navFontSize}px`,
              "--ds-button-line-height": topbarTokens.navLineHeight,
              "--ds-button-padding": topbarTokens.itemPadding,
              "--ds-button-border-width": "0 0 1px 0",
              "--ds-button-border": COLORS.gridLight,
              minHeight: "var(--prometeo-topbar-height)",
            }}
          />
        );
      })}
    </nav>
  );
}

export default function LegalPage() {
  const { slug } = useParams();
  const page = getLegalPage(slug);
  const isMobileLayout = useMediaQuery("(max-width: 767px)");
  const pageRef = useRef(null);
  useScrollTextReveal(pageRef, slug);

  if (!page) {
    return <Navigate to="/legal/politica-de-privacidad" replace />;
  }

  return (
    <Page light>
      <div key={slug} ref={pageRef} className="legal-page">
        <Grid columns="site">
        <GridCell
          style={{
            borderRight: bd,
            borderBottom: bd,
            padding: "32px 24px",
            display: "grid",
            alignContent: "end",
            gap: 8,
            minHeight: 220,
            background: COLORS.pageLight,
          }}
        >
          <Label tone="accent" data-animate-text>
            Actualizado
          </Label>
          <span
            data-animate-text
            style={{
              ...typeStyle("titleSm"),
              color: COLORS.textOnLight,
            }}
          >
            {page.updatedAt}
          </span>
        </GridCell>
        <GridCell
          span={3}
          collapseSpanOnTablet
          collapseSpanOnMobile
          style={{
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
              "--scroll-text-opacity": 0.72,
            }}
          >
            {page.summary}
          </p>
        </GridCell>
        </Grid>

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
                borderBottom: index === page.sections.length - 1 ? "none" : bd,
              }}
            >
              <TextReveal
                as="h2"
                lines={[section.title]}
                once={false}
                maskColor={COLORS.pageLight}
                className="legal-page__section-title"
                style={{
                  ...typeStyle("titleMd", { fontFamily: FONTS.display }),
                  margin: 0,
                  color: COLORS.textOnLight,
                }}
              />
              <div style={{ display: "grid", gap: 16 }}>
                {section.body.map((paragraph) => (
                  <p
                    key={paragraph}
                    style={{
                      ...typeStyle("body"),
                      margin: 0,
                      color: COLORS.textOnLight,
                      opacity: 0.78,
                      "--scroll-text-opacity": 0.78,
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
      </div>
    </Page>
  );
}
