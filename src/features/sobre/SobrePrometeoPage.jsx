import { useRef } from "react";
import { Link } from "react-router-dom";
import { COLORS, FONTS } from "@/design/tokens";
import { useScrollTextReveal } from "@/hooks/useScrollTextReveal";
import { Page } from "@/shared/layout/Page";
import TransitionSection from "@/shared/transition/TransitionSection";
import Label from "@/shared/ui/Label";
import SplitCtaButton from "@/shared/ui/SplitCtaButton";
import { Grid, GridCell } from "@/shared/ui/Grid";
import { placeholderImage as heroImage } from "@/lib/media";
import "@/shared/styles/scrollTextReveal.css";
import "@/features/sobre/sobre.css";

const UI = {
  text: COLORS.textOnLight,
};

const BELIEFS = [
  "Aceptar no es elegir.",
  "El conocimiento no se guarda, se pasa.",
  "La privacidad no es esconderse. Es decidir.",
  "Si el problema se diseñó, la solución también se diseña.",
  "Entender es el primer acto de libertad.",
];

const DOORS = [
  {
    eyebrow: "Para ti",
    title: "Empieza por entender",
    body: "Guías, comunidad y recursos para reconocer qué pasa con tus datos y decidir por ti.",
    cta: "Entrar",
    to: "/para-ti",
  },
  {
    eyebrow: "Para empresas",
    title: "Demuéstralo",
    body: "Certificamos a las empresas que respetan de verdad la privacidad de sus usuarios.",
    cta: "Ver certificación",
    to: "/empresas",
  },
];

export default function SobrePrometeoPage() {
  const pageRef = useRef(null);
  useScrollTextReveal(pageRef);

  return (
    <Page light>
      <div ref={pageRef} className="sobre-page">
        {/* ── Hero ── */}
        <section className="sobre-hero">
          <div className="sobre-hero__bg" aria-hidden="true">
            <img src={heroImage} alt="" className="sobre-hero__bg-img" />
            <div className="sobre-hero__overlay" />
          </div>

          <Grid
            columns="site"
            className="sobre-hero__content"
            style={{ gridTemplateRows: "auto auto" }}
          >
            <GridCell
              span={2}
              collapseSpanOnTablet
              collapseSpanOnMobile
              className="sobre-hero__copy"
            >
              <div className="sobre-hero__heading">
                <Label
                  color={COLORS.textOnLight}
                  className="sobre-hero__kicker"
                >
                  Sobre Prometeo
                </Label>
                <h1
                  className="sobre-hero__title"
                  style={{
                    fontFamily: FONTS.display,
                    color: UI.text,
                    margin: 0,
                  }}
                >
                  <span>Robar el fuego,</span>
                  <span className="sobre-accent">y pasarlo.</span>
                </h1>
              </div>
            </GridCell>
            <GridCell
              span={2}
              className="sobre-hero__copy-aside"
              aria-hidden="true"
            />
            <GridCell
              span={2}
              collapseSpanOnTablet
              collapseSpanOnMobile
              className="sobre-hero__desc-spacer"
              aria-hidden="true"
            />
            <GridCell
              span={2}
              collapseSpanOnTablet
              collapseSpanOnMobile
              className="sobre-hero__desc"
            >
              <p>
                En el mito, Prometeo le roba el fuego a los dioses para
                entregárselo a los humanos. El fuego es el conocimiento. Hoy ese
                conocimiento (el de cómo funcionan tus datos) lo tienen unos
                pocos. Prometeo existe para pasarlo.
              </p>
            </GridCell>
          </Grid>
        </section>

        {/* ── El mito ── */}
        <div className="sobre-transition">
          <TransitionSection light title="El origen" column={1} />
        </div>
        <section className="sobre-statement">
          <p>
            Prometeo no robó el fuego para él. Lo robó para dárselo a quienes no
            lo tenían.
          </p>
          <p className="sobre-statement__accent">
            Ese gesto, tomar algo reservado a unos pocos y repartirlo, es toda
            la marca.
          </p>
          <p className="sobre-statement__resolve">
            El fuego, hoy, es saber qué pasa con tus datos.
          </p>
        </section>

        {/* ── Por qué existimos ── */}
        <div className="sobre-transition">
          <TransitionSection light title="Por qué existimos" column={2} />
        </div>
        <section className="sobre-statement">
          <p>
            Hay una asimetría de conocimiento entre quienes gestionan los datos
            y quienes los generan.
          </p>
          <p className="sobre-statement__accent">
            No porque el tema sea difícil, sino porque el sistema está diseñado
            para que no lo entiendas.
          </p>
          <p className="sobre-statement__resolve">
            Prometeo nivela ese desequilibrio. Con claridad, no con miedo.
          </p>
        </section>

        {/* ── El problema es de diseño ── */}
        <div className="sobre-transition">
          <TransitionSection
            light
            title="El problema es de diseño"
            column={3}
          />
        </div>
        <section className="sobre-design">
          <div className="sobre-design__copy">
            <p>
              Si la privacidad digital se volvió confusa, fue por decisiones de
              diseño. Los dark patterns no son un accidente: son botones,
              jerarquías y palabras pensadas para que cedas sin darte cuenta.
            </p>
            <p className="sobre-design__accent">
              Si el problema se construyó con diseño, la respuesta también.
            </p>
            <p>
              Por eso todo en Prometeo enseña su estructura en lugar de
              esconderla, empezando por esta misma retícula, que nace del
              cifrado AES-256 y nunca oculta sus bordes.
            </p>
          </div>
        </section>

        {/* ── Lo que creemos ── */}
        <div className="sobre-transition">
          <TransitionSection light title="Lo que creemos" column={4} />
        </div>
        <section className="sobre-beliefs">
          <ol className="sobre-beliefs__list">
            {BELIEFS.map((belief, index) => (
              <li className="sobre-beliefs__item" key={belief}>
                <span className="sobre-beliefs__number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="sobre-beliefs__statement">{belief}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ── Cómo lo hacemos (puente B2B2C) ── */}
        <div className="sobre-transition">
          <TransitionSection light title="Cómo lo hacemos" column={1} />
        </div>
        <section className="sobre-bridge">
          <div className="sobre-bridge__intro">
            <Label color={COLORS.textOnLight}>El puente</Label>
            <h2>
              Dos cosas que son <span className="sobre-accent">la misma.</span>
            </h2>
            <p>
              Le damos a las personas el conocimiento para decidir. Y
              certificamos a las empresas que respetan esa decisión. El sello es
              el puente: lo que aprendes a reconocer es lo que las empresas se
              esfuerzan en merecer.
            </p>
          </div>

          <div className="sobre-bridge__doors">
            {DOORS.map((door) => (
              <article key={door.to} className="sobre-door">
                <div className="sobre-door__copy">
                  <Label
                    color={COLORS.textOnLight}
                    className="sobre-door__eyebrow"
                  >
                    {door.eyebrow}
                  </Label>
                  <h3>{door.title}</h3>
                  <p>{door.body}</p>
                </div>
                <SplitCtaButton
                  as={Link}
                  to={door.to}
                  label={door.cta}
                  color={COLORS.textOnLight}
                  iconBg={COLORS.pageLight}
                  className="sobre-door__cta"
                  style={{ "--ds-split-cta-width": "100%", maxWidth: "100%" }}
                />
              </article>
            ))}
          </div>
        </section>

        {/* ── CTA final ── */}
        <div className="sobre-transition">
          <TransitionSection light title="El siguiente paso" column={2} />
        </div>
        <section className="sobre-final">
          <Grid
            columns="site"
            className="sobre-final__content"
            style={{ gridTemplateRows: "auto auto" }}
          >
            <GridCell
              span={2}
              collapseSpanOnTablet
              collapseSpanOnMobile
              className="sobre-final__intro"
            >
              <Label color={COLORS.textOnLight} className="sobre-final__kicker">
                Toma el fuego
              </Label>
              <p>
                El conocimiento, una vez que lo tienes, no se devuelve. Empieza
                por el tuyo.
              </p>
            </GridCell>
            <GridCell
              span={2}
              className="sobre-final__intro-aside"
              aria-hidden="true"
            />
            <GridCell
              span={2}
              collapseSpanOnTablet
              collapseSpanOnMobile
              className="sobre-final__cta-spacer"
              aria-hidden="true"
            />
            <GridCell
              span={2}
              collapseSpanOnTablet
              collapseSpanOnMobile
              className="sobre-final__cta"
            >
              <div className="sobre-final__cta-inner">
                <h2
                  className="sobre-final__title"
                  style={{
                    fontFamily: FONTS.display,
                    color: UI.text,
                    margin: 0,
                  }}
                >
                  Pásalo <span className="sobre-accent">tú también.</span>
                </h2>
                <SplitCtaButton
                  as={Link}
                  to="/para-ti"
                  label="Empieza por entender"
                  color={COLORS.textOnLight}
                  iconBg={COLORS.pageLight}
                  style={{ "--ds-split-cta-width": "320px", maxWidth: "100%" }}
                />
              </div>
            </GridCell>
          </Grid>
        </section>
      </div>
    </Page>
  );
}
