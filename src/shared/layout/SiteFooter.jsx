import { useState } from "react";
import { Link } from "react-router-dom";
import { TH } from "@/constants";
import { getPrometeoFooterTokens } from "@/design/prometeoSystem";
import { LEGAL_LINKS } from "@/data/legal";
import { EASE } from "@/shared/styles/theme";
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

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.5 3c.31 2.04 1.5 3.43 3.5 3.69v2.43c-1.28.12-2.46-.27-3.5-.98v6.18c0 3.3-2.46 5.68-5.57 5.68C7.99 19.95 6 18 6 15.32c0-2.61 2.11-4.7 4.93-4.5v2.53c-.41-.13-.84-.18-1.27-.12-1.07.14-1.83 1-1.78 2.06.05 1.13.97 1.96 2.07 1.92 1.15-.04 2.02-.96 2.02-2.32V3h2.53z" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
    Icon: InstagramIcon,
  },
  { label: "TikTok", href: "https://www.tiktok.com/", Icon: TikTokIcon },
];

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
  mobileFlow = false,
  mobileReveal = false,
  compact,
}) {
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
        // Solo medidas/animación; los COLORES viven en site-footer.css derivados
        // de las primitivas de marca (var(--brand-*)).
        "--site-footer-wordmark-size": footerTokens.wordmarkSize,
        "--site-footer-wordmark-line": footerTokens.wordmarkLineHeight,
        "--site-footer-transition": EASE,
        position: mobileFlow ? "relative" : "sticky",
        top: mobileFlow ? "auto" : `calc(${TH}px - 1px)`,
        height: mobileFlow ? "auto" : `calc(100svh - ${TH}px + 1px)`,
        borderTop: mobileFlow ? "1px solid var(--prometeo-structure)" : "none",
      }}
    >
      <div className="site-footer__top">
        <p className="site-footer__copyright site-footer__copyright--top">
          Copyright © 2026 Prometeo Inc. Reservados todos los derechos.
        </p>
        <div className="site-footer__social">
          {SOCIAL_LINKS.map(({ label, href, Icon }) => (
            <a
              key={label}
              className="site-footer__social-link"
              href={href}
              target="_blank"
              rel="noreferrer"
            >
              <Icon />
              <span>{label}</span>
            </a>
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
