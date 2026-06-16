import { useState } from "react";
import { Link } from "react-router-dom";
import { TH } from "@/constants";
import { getPrometeoFooterTokens } from "@/design/prometeoSystem";
import { LEGAL_LINKS } from "@/data/legal";
import { EASE, DARK_GRID, LIGHT_GRID } from "@/shared/styles/theme";
import "@/shared/layout/site-footer.css";

const FOOTER_NAV_GROUPS = [
  {
    title: "Prometeo",
    items: [
      { label: "Inicio", to: "/" },
      { label: "Sobre nosotros", to: "/sobre-prometeo" },
      { label: "Contacto", to: "/contacto" },
      { label: "Perfil", to: "/perfil" },
    ],
  },
  {
    title: "Para ti",
    items: [
      { label: "Vista general", to: "/para-ti" },
      { label: "Artículos", to: "/articulos" },
      { label: "Comunidad", to: "/comunidad" },
      { label: "Tienda", to: "/tienda" },
    ],
  },
  {
    title: "Para empresas",
    items: [
      { label: "Vista general", to: "/empresas" },
      { label: "Certificación", to: "/certificacion" },
      { label: "Registro público", to: "/empresas/registro" },
    ],
  },
  {
    title: "Legal",
    items: LEGAL_LINKS,
  },
];

const SOCIAL_LINKS = ["Instagram", "TikTok"];

function FooterLink({ item }) {
  if (!item.to) {
    return <span className="site-footer__link">{item.label}</span>;
  }

  return (
    <Link className="site-footer__link" to={item.to}>
      {item.label}
    </Link>
  );
}

function FooterGroup({ title, items }) {
  return (
    <nav className="site-footer__group" aria-label={title}>
      <h3 className="site-footer__group-title">{title}</h3>
      <div className="site-footer__links">
        {items.map((item) => (
          <FooterLink key={item.to ?? item.label} item={item} />
        ))}
      </div>
    </nav>
  );
}

function FooterNewsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    const normalized = email.trim();
    if (!normalized) return;

    try {
      window.localStorage.setItem("prometeo-newsletter-email", normalized);
    } catch {
      // Demo local: the visible confirmation should still work.
    }

    setSubscribed(true);
  }

  return (
    <section
      className="site-footer__newsletter"
      aria-labelledby="footer-newsletter-title"
    >
      <div className="site-footer__newsletter-copy">
        <p className="site-footer__eyebrow">Newsletter</p>
        <h3
          id="footer-newsletter-title"
          className="site-footer__newsletter-title"
        >
          Información sobre privacidad digital.
        </h3>
        <p className="site-footer__newsletter-text">
          Todos los lunes en tu correo.
        </p>
      </div>

      {subscribed ? (
        <p className="site-footer__form-status" role="status">
          Ya estás dentro. Gracias por leernos.
        </p>
      ) : (
        <form className="site-footer__form" onSubmit={handleSubmit}>
          <label
            className="site-footer__label"
            htmlFor="footer-newsletter-email"
          >
            Correo electrónico
          </label>
          <div className="site-footer__form-row">
            <input
              id="footer-newsletter-email"
              name="footer-newsletter-email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="tu@email.com"
              autoComplete="email"
              className="site-footer__input"
            />
            <button className="site-footer__submit" type="submit">
              Suscribirme
            </button>
          </div>
        </form>
      )}
    </section>
  );
}

export default function SiteFooter({
  light,
  mobileFlow = false,
  mobileReveal = false,
  compact,
}) {
  const bd = light ? LIGHT_GRID : DARK_GRID;
  const isCompactFooter = compact ?? (mobileFlow || mobileReveal);
  const footerTokens = getPrometeoFooterTokens({ compact: isCompactFooter });

  return (
    <footer
      className={[
        "landing-footer",
        "site-footer",
        mobileFlow ? "landing-footer--flow" : "",
        mobileReveal ? "landing-footer--mobile-reveal" : "",
        !mobileFlow && !mobileReveal ? "reveal-footer" : "",
        isCompactFooter ? "site-footer--compact" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        "--site-footer-bg": footerTokens.background,
        "--site-footer-text": footerTokens.text,
        "--site-footer-line": footerTokens.text,
        "--site-footer-border": bd,
        "--site-footer-wordmark-size": footerTokens.wordmarkSize,
        "--site-footer-wordmark-line": footerTokens.wordmarkLineHeight,
        "--site-footer-transition": EASE,
        position: mobileFlow ? "relative" : "sticky",
        top: mobileFlow ? "auto" : `calc(${TH}px - 1px)`,
        height: mobileFlow ? "auto" : `calc(100svh - ${TH}px + 1px)`,
        borderTop: mobileFlow ? bd : "none",
      }}
    >
      <div className="site-footer__top">
        <p className="site-footer__copyright site-footer__copyright--top">
          Copyright © 2026 Prometeo Inc. Reservados todos los derechos.
        </p>
        <div className="site-footer__social">
          {SOCIAL_LINKS.map((label) => (
            <span key={label} className="site-footer__social-link">
              {label}
            </span>
          ))}
        </div>
      </div>

      <div className="site-footer__main">
        <FooterNewsletter />

        <div className="site-footer__nav">
          {FOOTER_NAV_GROUPS.map((group) => (
            <FooterGroup
              key={group.title}
              title={group.title}
              items={group.items}
            />
          ))}
        </div>
      </div>

      <div className="site-footer__bottom">
        <h2 className="site-footer__wordmark">Prometeo</h2>
      </div>
    </footer>
  );
}
