import { useEffect, useState } from "react";
import { TH } from "../constants";
import {
  EASE,
  DARK_GRID,
  LIGHT_GRID,
  PAGE_LIGHT_BG,
} from "../components/landing/theme";
import Topbar from "../components/Topbar";
import SectionTransition from "../components/landing/SectionTransition";
import HeroSection from "../components/landing/HeroSection";
import MisionSection from "../components/landing/MisionSection";
import NexoSection from "../components/landing/NexoSection";
import FrentesSection from "../components/landing/FrentesSection";
import ContactSection from "../components/landing/ContactSection";
import LandingFooter from "../components/landing/LandingFooter";

export default function Landing() {
  const [light, setLight] = useState(false);
  const [showWordmark, setShowWordmark] = useState(false);

  // Wordmark en navbar aparece justo cuando el h2 del hero sale por arriba
  useEffect(() => {
    const el = document.getElementById("hero-title");
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        setShowWordmark(!e.isIntersecting && e.boundingClientRect.top < 0);
      },
      { threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // El fade to white lo controla S3_Nexo directamente via setLight

  // Sincroniza el fondo exterior con la sección visible del landing
  useEffect(() => {
    const background = light ? PAGE_LIGHT_BG : "#0a0a0a";
    const root = document.getElementById("root");

    document.documentElement.style.transition = `background ${EASE}`;
    document.documentElement.style.background = background;
    document.body.style.transition = `background ${EASE}`;
    document.body.style.background = background;

    if (root) {
      root.style.transition = `background ${EASE}`;
      root.style.background = background;
    }
  }, [light]);

  const frameBorder = light ? LIGHT_GRID : DARK_GRID;

  return (
    <div
      style={{
        maxWidth: "min(1600px, 92vw)",
        margin: "0 auto",
        borderLeft: frameBorder,
        borderRight: frameBorder,
        background: light ? PAGE_LIGHT_BG : "#0a0a0a",
        transition: `background ${EASE}, border-color ${EASE}`,
      }}
    >
      <Topbar light={light} showWordmark={showWordmark} />
      <HeroSection />
      <SectionTransition splitColumn={1} />
      <MisionSection />
      <SectionTransition splitColumn={3} />
      <NexoSection light={light} setLight={setLight} />
      <SectionTransition light={light} splitColumn={2} />
      <FrentesSection light={light} />
      {/* Reveal footer: footer sticky z-1 como fondo fijo,
           contacto absolute z-2 se desliza hacia arriba para revelarlo */}
      <div
        className="reveal-wrapper"
        style={{ position: "relative", height: `calc(2 * (100vh - ${TH}px))` }}
      >
        <LandingFooter light={light} />
        <ContactSection light={light} />
      </div>
    </div>
  );
}
