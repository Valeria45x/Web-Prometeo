import { COLORS } from "@/design/tokens";
import { PROMETEO_SYSTEM } from "@/design/prometeoSystem";
import { placeholderImage as placeholderImage } from "@/lib/media";

export const PROMETEO_SCROLL_COPY = {
  metaLabel: "La respuesta",
  transition: {
    title: "Cómo lo hacemos",
    column: 3,
  },
  methodKicker: "Mediante 4 pilares",
  statementLead: "Transformamos la privacidad digital en",
  statementAccent: "claridad accionable.",
};

export const PROMETEO_MOVES = [
  {
    index: "01",
    title: "Educación",
    visual: "articles",
    image: placeholderImage,
    body: "Creamos una conversación común, cercana y útil en torno a la privacidad.",
  },
  {
    index: "02",
    title: "Comunidad",
    visual: "community",
    image: placeholderImage,
    body: "Creamos un espacio para preguntar, contrastar y entender la privacidad desde experiencias reales.",
  },
  {
    index: "03",
    title: "Práctica",
    visual: "shop",
    image: placeholderImage,
    body: "Llevamos la privacidad al gesto cotidiano con recursos que ayudan a actuar con más intención en lo digital.",
  },
  {
    index: "04",
    title: "Confianza",
    visual: "certification",
    image: placeholderImage,
    body: "Certificamos a las empresas que cuidan tus datos de verdad y lo convertimos en un sello que cualquiera puede reconocer y verificar.",
  },
];

export const MOVE_IMAGE_BG = COLORS.canvasDark;
export const MOVE_CENTER_LINE_NUDGE = 0;
export const STAGE_DIVIDER_NUDGE = 0;
export const MOVE_GRID_LINES = [25, 50, 75];
export const MOVE_IMAGE_RECTS = {
  articles: { left: 0, top: 0, width: 50, height: 50 },
  community: { left: 0, top: 25, width: 75, height: 50 },
  shop: { left: 25, top: 25, width: 50, height: 50 },
  certification: { left: 50, top: 25, width: 50, height: 75 },
};

export const PROMETEO_SCROLL_MOTION = PROMETEO_SYSTEM.motion.pillars;
