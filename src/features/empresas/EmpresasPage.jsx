import { useRef } from "react";
import { useScrollTextReveal } from "@/hooks/useScrollTextReveal";
import { Page } from "@/shared/layout/Page";
import TransitionSection from "@/shared/transition/TransitionSection";
import EnterpriseHero from "@/features/empresas/sections/EnterpriseHero";
import EnterpriseNarrative from "@/features/empresas/sections/EnterpriseNarrative";
import EnterpriseOverview from "@/features/empresas/sections/EnterpriseOverview";
import EnterpriseProcess from "@/features/empresas/sections/EnterpriseProcess";
import EnterpriseOutcomes from "@/features/empresas/sections/EnterpriseOutcomes";
import EnterpriseCases from "@/features/empresas/sections/EnterpriseCases";
import EnterpriseFinal from "@/features/empresas/sections/EnterpriseFinal";
import "@/shared/styles/scrollTextReveal.css";
import "@/features/empresas/empresas.css";

export default function EmpresasPage() {
  const pageRef = useRef(null);
  useScrollTextReveal(pageRef);

  return (
    <Page light>
      <div ref={pageRef} className="enterprise-page">
        <EnterpriseHero />

        <div className="enterprise-transition">
          <TransitionSection light title="El problema" column={1} />
        </div>
        <EnterpriseNarrative />

        <EnterpriseOverview />

        <div className="enterprise-transition">
          <TransitionSection light title="Cómo funciona" column={2} />
        </div>
        <EnterpriseProcess />

        {/* Cortina: todo lo posterior sube por encima del stack pineado. */}
        <div className="enterprise-curtain">
          <div className="enterprise-transition">
            <TransitionSection light title="Los resultados" column={3} />
          </div>
          <EnterpriseOutcomes />

          <div className="enterprise-transition">
            <TransitionSection light title="La experiencia" column={1} />
          </div>
          <EnterpriseCases />

          <div className="enterprise-transition">
            <TransitionSection light title="El siguiente paso" column={2} />
          </div>
          <EnterpriseFinal />
        </div>
      </div>
    </Page>
  );
}
