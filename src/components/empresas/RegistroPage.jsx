import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { COLORS, FONTS } from "../../design/tokens";
import { useScrollTextReveal } from "../../hooks/useScrollTextReveal";
import { scrollToTopImmediate } from "../../lib/lenis";
import { Page } from "../Page";
import LandingTransitionSection from "../landing/transition/LandingTransitionSection";
import Label from "../system/Label";
import SplitCtaButton from "../system/SplitCtaButton";
import { Grid, GridCell } from "../system/Grid";
import FilterOption from "../system/FilterOption";
import { REGISTRO_EMPRESAS } from "../../data/registro";

function ChevronIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
import heroImage from "../../../Instagram Feed USB v1.png";
import "../landing/shared/scrollTextReveal.css";
import "./registro.css";

const UI = {
  text: COLORS.textOnLight,
};

export default function RegistroPage() {
  const pageRef = useRef(null);
  const [activeSector, setActiveSector] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);
  useScrollTextReveal(pageRef);

  const sectors = useMemo(
    () => [...new Set(REGISTRO_EMPRESAS.map((company) => company.sector))],
    [],
  );

  const sectorCounts = useMemo(() => {
    const counts = {};
    for (const company of REGISTRO_EMPRESAS) {
      counts[company.sector] = (counts[company.sector] ?? 0) + 1;
    }
    return counts;
  }, []);

  const filtered = useMemo(
    () =>
      activeSector
        ? REGISTRO_EMPRESAS.filter((company) => company.sector === activeSector)
        : REGISTRO_EMPRESAS,
    [activeSector],
  );

  return (
    <Page light>
      <div ref={pageRef} className="registro-page">
        {/* ── Hero ── */}
        <section className="registro-hero">
          <div className="registro-hero__bg" aria-hidden="true">
            <img src={heroImage} alt="" className="registro-hero__bg-img" />
            <div className="registro-hero__overlay" />
          </div>

          <Grid
            columns="site"
            className="registro-hero__content"
            style={{ gridTemplateRows: "auto auto" }}
          >
            <GridCell
              span={2}
              collapseSpanOnTablet
              collapseSpanOnMobile
              className="registro-hero__copy"
            >
              <div className="registro-hero__heading">
                <Label color={COLORS.textOnLight} className="registro-hero__kicker">
                  Registro Prometeo
                </Label>
                <h1
                  className="registro-hero__title"
                  style={{ fontFamily: FONTS.display, color: UI.text, margin: 0 }}
                >
                  <span>El registro</span>
                  <span className="registro-accent">público.</span>
                </h1>
              </div>
            </GridCell>
            <GridCell
              span={2}
              className="registro-hero__copy-aside"
              aria-hidden="true"
            />
            <GridCell
              span={2}
              collapseSpanOnTablet
              collapseSpanOnMobile
              className="registro-hero__desc-spacer"
              aria-hidden="true"
            />
            <GridCell
              span={2}
              collapseSpanOnTablet
              collapseSpanOnMobile
              className="registro-hero__desc"
            >
              <div className="registro-hero__desc-inner">
                <p>
                  Cada certificación Prometeo es pública. No tienes que creer a
                  ninguna empresa: aquí puedes comprobar quién está certificado,
                  desde cuándo y hasta cuándo.
                </p>
                <SplitCtaButton
                  as={Link}
                  to="/certificacion"
                  label="Cómo se certifica"
                  color={COLORS.textOnLight}
                  iconBg={COLORS.pageLight}
                  className="registro-hero__cta"
                  style={{ "--ds-split-cta-width": "320px", maxWidth: "100%" }}
                  onClick={scrollToTopImmediate}
                />
              </div>
            </GridCell>
          </Grid>
        </section>

        {/* ── Filtro ── */}
        <div className="registro-transition">
          <LandingTransitionSection light title="Empresas certificadas" column={1} />
        </div>

        <div className="registro-filters">
          <button
            type="button"
            className="registro-filters__toggle"
            aria-expanded={filterOpen}
            aria-controls="registro-filters-body"
            onClick={() => setFilterOpen((v) => !v)}
          >
            <span className="registro-filters__toggle-label">
              Filtrar por sector
            </span>
            {!filterOpen && activeSector && (
              <span className="registro-filters__toggle-active">
                {activeSector}
              </span>
            )}
            <span
              className={[
                "registro-filters__toggle-icon",
                filterOpen && "registro-filters__toggle-icon--open",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <ChevronIcon />
            </span>
          </button>

          <div
            id="registro-filters-body"
            className={[
              "registro-filters__body",
              !filterOpen && "registro-filters__body--collapsed",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <div
              className="registro-filters__options"
              role="group"
              aria-label="Filtrar empresas por sector"
            >
              <FilterOption
                name="Todas"
                count={REGISTRO_EMPRESAS.length}
                active={activeSector === null}
                onClick={() => setActiveSector(null)}
              />
              {sectors.map((sector) => (
                <FilterOption
                  key={sector}
                  name={sector}
                  count={sectorCounts[sector] ?? 0}
                  active={activeSector === sector}
                  onClick={() =>
                    setActiveSector(activeSector === sector ? null : sector)
                  }
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── Listado ── */}
        <ul className="registro-list">
          {filtered.map((company) => (
            <li key={company.id} className="registro-record">
              <div className="registro-record__body">
                <h2 className="registro-record__name">{company.name}</h2>
                <Label color={COLORS.textOnLight} className="registro-record__sector">
                  {company.sector}
                </Label>
                <p className="registro-record__summary">{company.summary}</p>
                <div className="registro-record__meta">
                  <span>{company.code}</span>
                  <span>Certificada por Prometeo · {company.certifiedOn}</span>
                  <span>Válida hasta {company.validUntil}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* ── CTA final ── */}
        <div className="registro-transition">
          <LandingTransitionSection light title="El siguiente paso" column={3} />
        </div>
        <section className="registro-final">
          <Grid
            columns="site"
            className="registro-final__content"
            style={{ gridTemplateRows: "auto auto" }}
          >
            <GridCell
              span={2}
              collapseSpanOnTablet
              collapseSpanOnMobile
              className="registro-final__intro"
            >
              <Label color={COLORS.textOnLight} className="registro-final__kicker">
                Siguiente paso
              </Label>
              <p>
                Estar en este registro es la forma más directa de que tus
                usuarios sepan que pueden confiar en ti.
              </p>
            </GridCell>
            <GridCell
              span={2}
              className="registro-final__intro-aside"
              aria-hidden="true"
            />
            <GridCell
              span={2}
              collapseSpanOnTablet
              collapseSpanOnMobile
              className="registro-final__cta-spacer"
              aria-hidden="true"
            />
            <GridCell
              span={2}
              collapseSpanOnTablet
              collapseSpanOnMobile
              className="registro-final__cta"
            >
              <div className="registro-final__cta-inner">
                <h2
                  className="registro-final__title"
                  style={{ fontFamily: FONTS.display, color: UI.text, margin: 0 }}
                >
                  Que tu empresa{" "}
                  <span className="registro-accent">esté aquí.</span>
                </h2>
                <SplitCtaButton
                  as={Link}
                  to="/contacto"
                  label="Solicitar certificación"
                  color={COLORS.textOnLight}
                  iconBg={COLORS.pageLight}
                  style={{ "--ds-split-cta-width": "320px", maxWidth: "100%" }}
                  onClick={scrollToTopImmediate}
                />
              </div>
            </GridCell>
          </Grid>
        </section>
      </div>
    </Page>
  );
}
