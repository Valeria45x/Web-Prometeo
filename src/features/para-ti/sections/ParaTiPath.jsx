import { Grid, GridCell } from "@/shared/ui/Grid";
import PrincipleRow from "@/features/para-ti/components/PrincipleRow";
import { PRINCIPLES } from "@/features/para-ti/para-ti.content";

export default function ParaTiPath() {
  return (
    <Grid as="section" columns="site" className="para-ti-path">
      <GridCell className="para-ti-path__intro">
        <div className="para-ti-path__intro-inner">
          <h2 className="para-ti-path__heading">Por dónde empezar</h2>
          <p className="para-ti-path__statement">
            No necesitas saber de tecnología. Solo necesitas prestar atención.
          </p>
          <p>
            Cada paso parte de algo que ya reconoces. Y termina en algo que
            puedes hacer.
          </p>
        </div>
      </GridCell>

      <GridCell
        span={3}
        collapseSpanOnTablet
        collapseSpanOnMobile
        className="para-ti-path__steps-cell"
      >
        <div className="para-ti-path__narrative">
          <p>
            La privacidad digital se ha vuelto difícil de entender, casi siempre
            a propósito. Entre permisos, cookies y letra pequeña, decidir con
            criterio cuesta más de lo que debería.
          </p>
          <p className="para-ti-path__narrative-accent">
            No es que no te importe. Es que pocas veces te dieron la información
            para decidir de otra forma.
          </p>
          <p className="para-ti-path__narrative-resolve">
            Este recorrido cambia eso.
          </p>
        </div>
        <ol className="para-ti-path__steps">
          {PRINCIPLES.map((item) => (
            <PrincipleRow key={item.title} item={item} />
          ))}
        </ol>
      </GridCell>
    </Grid>
  );
}
