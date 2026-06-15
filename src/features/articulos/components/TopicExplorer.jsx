import { COLORS } from "@/design/tokens";
import { Grid, GridCell } from "@/shared/ui/Grid";
import Label from "@/shared/ui/Label";
import { TOPIC_EXPLORER } from "@/features/articulos/articulos.content";

export default function TopicExplorer({ activeTopic }) {
  const topic = TOPIC_EXPLORER[activeTopic] ?? TOPIC_EXPLORER.Todos;

  return (
    <Grid
      as="section"
      columns="site"
      className="articles-topic"
      aria-labelledby="articles-topic-heading"
      aria-live="polite"
    >
      <GridCell className="articles-topic__heading">
        <Label color={COLORS.textOnLight}>Sobre el tema</Label>
        <h2 id="articles-topic-heading">{topic.title}</h2>
      </GridCell>

      <GridCell
        span={3}
        collapseSpanOnTablet
        collapseSpanOnMobile
        className="articles-topic__description"
      >
        <p>{topic.description}</p>
      </GridCell>
    </Grid>
  );
}
