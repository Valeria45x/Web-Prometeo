import { useRef } from "react";
import { useScrollTextReveal } from "@/hooks/useScrollTextReveal";
import { Page } from "@/shared/layout/Page";
import TransitionSection from "@/shared/transition/TransitionSection";
import ParaTiHero from "@/features/para-ti/sections/ParaTiHero";
import ParaTiPath from "@/features/para-ti/sections/ParaTiPath";
import ParaTiAccess from "@/features/para-ti/sections/ParaTiAccess";
import "@/shared/styles/scrollTextReveal.css";
import "@/features/para-ti/para-ti.css";

export default function ParaTiPage() {
  const pageRef = useRef(null);
  useScrollTextReveal(pageRef);

  return (
    <Page light>
      <div ref={pageRef} className="para-ti-page">
        <ParaTiHero />

        <div className="para-ti-transition">
          <TransitionSection light title="Cómo funciona" column={1} />
        </div>
        <ParaTiPath />

        <div className="para-ti-transition">
          <TransitionSection light title="Los caminos" column={2} />
        </div>
        <ParaTiAccess />
      </div>
    </Page>
  );
}
