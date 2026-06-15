import { Fragment } from "react";
import { COLORS } from "@/design/tokens";
import Label from "@/shared/ui/Label";
import StepCard from "@/features/empresas/components/StepCard";
import { useStepStack } from "@/features/empresas/hooks/useStepStack";
import { STEPS } from "@/features/empresas/empresas.content";

export default function EnterpriseProcess() {
  const { stepAnchorsRef, revealStep } = useStepStack();

  return (
    <section className="enterprise-process">
      <div className="enterprise-process__header">
        <div className="enterprise-process__intro">
          <Label color={COLORS.textOnLight}>El proceso</Label>
          <h2>
            Cada paso, <span className="enterprise-accent">un servicio.</span>
          </h2>
        </div>
      </div>

      <div className="enterprise-process__stack">
        {STEPS.map((step, index) => (
          <Fragment key={step.index}>
            <div
              ref={(node) => {
                stepAnchorsRef.current[index] = node;
              }}
              className="enterprise-step-card__anchor"
              aria-hidden="true"
            />
            <StepCard item={step} index={index} onReveal={revealStep} />
          </Fragment>
        ))}
      </div>
    </section>
  );
}
