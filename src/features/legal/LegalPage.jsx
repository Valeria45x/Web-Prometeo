import { useRef } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Page } from "@/shared/layout/Page";
import { openCookieConsent } from "@/shared/cookies/CookieConsent";
import Button from "@/shared/ui/Button";
import Label from "@/shared/ui/Label";
import NavigationButton from "@/shared/ui/NavigationButton";
import TextReveal from "@/shared/ui/TextReveal";
import { Grid, GridCell } from "@/shared/ui/Grid";
import { BORDERS, COLORS, FONTS, TRANSITIONS } from "@/design/tokens";
import { getPrometeoTopbarTokens } from "@/design/prometeoSystem";
import { typeStyle } from "@/design/typography";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useScrollTextReveal } from "@/hooks/useScrollTextReveal";
import { useComunidad } from "@/context/ComunidadContext";
import { useTienda } from "@/context/TiendaContext";
import { LEGAL_LINKS, getLegalPage } from "@/data/legal";
import "@/shared/styles/scrollTextReveal.css";
import "@/features/legal/LegalPage.css";

const bd = BORDERS.light;

function LegalNav({ currentSlug, compact = false }) {
  const topbarTokens = getPrometeoTopbarTokens({ compact });

  return (
    <nav aria-label="Paginas legales" className="legal-page__nav">
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

  const { resetDemoData: resetCommunityDemoData } = useComunidad();
  const { resetDemoData: resetTiendaDemoData } = useTienda();

  function handleClearLocalData() {
    const confirmed = window.confirm(
      "¿Borrar los datos locales de esta demo? Se reiniciarán comunidad, perfil, carrito y pedidos guardados en este navegador.",
    );
    if (!confirmed) return;
    resetTiendaDemoData();
    resetCommunityDemoData();
  }

  if (!page) {
    return <Navigate to="/legal/politica-de-privacidad" replace />;
  }

  const showCookieAction = slug === "uso-de-cookies";
  const showDataAction =
    slug === "uso-de-cookies" || slug === "politica-de-privacidad";

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
                  borderBottom:
                    index === page.sections.length - 1 ? "none" : bd,
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

            {showCookieAction || showDataAction ? (
              <div
                style={{
                  padding: isMobileLayout ? "28px 24px" : "36px 48px",
                  borderTop: bd,
                  display: "grid",
                  gap: 24,
                }}
              >
                {showCookieAction ? (
                  <div style={{ display: "grid", gap: 12 }}>
                    <p
                      style={{
                        ...typeStyle("body"),
                        margin: 0,
                        color: COLORS.textOnLight,
                        opacity: 0.78,
                        maxWidth: "60ch",
                      }}
                    >
                      Puedes revisar o cambiar tus preferencias de cookies en
                      cualquier momento.
                    </p>
                    <Button
                      variant="outline"
                      surface="light"
                      size="sm"
                      onClick={openCookieConsent}
                      style={{ justifySelf: "start" }}
                    >
                      Ajustar preferencias de cookies
                    </Button>
                  </div>
                ) : null}

                {showDataAction ? (
                  <div style={{ display: "grid", gap: 12 }}>
                    <p
                      style={{
                        ...typeStyle("body"),
                        margin: 0,
                        color: COLORS.textOnLight,
                        opacity: 0.78,
                        maxWidth: "60ch",
                      }}
                    >
                      Borra ahora todos los datos locales de la demo (comunidad,
                      perfil, carrito y pedidos) guardados en este navegador,
                      sin salir de esta página.
                    </p>
                    <Button
                      variant="outline"
                      surface="light"
                      size="sm"
                      onClick={handleClearLocalData}
                      style={{ justifySelf: "start" }}
                    >
                      Borrar datos locales
                    </Button>
                  </div>
                ) : null}

                <p
                  style={{
                    ...typeStyle("bodySm"),
                    margin: 0,
                    color: COLORS.textOnLight,
                    opacity: 0.68,
                    maxWidth: "60ch",
                  }}
                >
                  {showCookieAction
                    ? "También puedes ajustar las cookies y borrar tus datos"
                    : "También puedes borrar tus datos"}{" "}
                  desde{" "}
                  <Link
                    to="/perfil"
                    style={{ color: COLORS.accent, fontWeight: 700 }}
                  >
                    tu cuenta
                  </Link>
                  .
                </p>
              </div>
            ) : null}
          </GridCell>
        </Grid>
      </div>
    </Page>
  );
}
