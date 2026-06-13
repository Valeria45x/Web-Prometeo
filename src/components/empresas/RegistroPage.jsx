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
import Chip from "../system/Chip";
import { REGISTRO_EMPRESAS } from "../../data/registro";
import heroImage from "../../../Instagram Feed USB v1.png";
import "../landing/shared/scrollTextReveal.css";
import "./registro.css";

const UI = {
  text: COLORS.textOnLight,
};

export default function RegistroPage() {
  const pageRef = useRef(null);
  const [activeSector, setActiveSector] = useState(null);
  useScrollTextReveal(pageRef);

  const sectors = useMemo(
    () => [...new Set(REGISTRO_EMPRESAS.map((company) => company.sector))],
    [],
  );

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
                  Para empresas · Registro
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

        <div className="registro-filterbar">
          <span className="registro-filterbar__label">Sector</span>
          <div className="registro-filterbar__options">
            <Chip
              label="Todas"
              active={activeSector === null}
              onClick={() => setActiveSector(null)}
            />
            {sectors.map((sector) => {
              const active = activeSector === sector;
              return (
                <Chip
                  key={sector}
                  label={sector}
                  active={active}
                  onClick={() => setActiveSector(active ? null : sector)}
                />
              );
            })}
          </div>
          <span className="registro-filterbar__count">
            {filtered.length}{" "}
            {filtered.length === 1 ? "empresa" : "empresas"}
          </span>
        </div>

        {/* ── Listado ── */}
        <ul className="registro-list">
          {filtered.map((company) => (
            <li key={company.id} className="registro-record">
              <div className="registro-record__seal" aria-hidden="true">
                <span className="registro-record__seal-mark">PRO ®</span>
                <span className="registro-record__seal-note">Sello</span>
              </div>

              <div className="registro-record__body">
                <div className="registro-record__head">
                  <h2 className="registro-record__name">{company.name}</h2>
                  <span className="registro-record__status">Vigente</span>
                </div>
                <Label color={COLORS.textOnLight} className="registro-record__sector">
                  {company.sector}
                </Label>
                <p className="registro-record__summary">{company.summary}</p>
                <div className="registro-record__meta">
                  <span>{company.code}</span>
                  <span>Certificada · {company.certifiedOn}</span>
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
