export const ARTICLES_PER_PAGE = 6;

const ARTICLE_MEDIA_POSITIONS = {
  "cookies-precios": "center 44%",
  "algoritmo-antes-buscar": "center 58%",
  "wifi-cafeterias": "center 52%",
  "dark-patterns-consentimiento": "center 38%",
  "tipos-cookies": "center 46%",
  "fijacion-dinamica-precios": "center 62%",
  "perfil-publicitario": "center 54%",
  "man-in-the-middle": "center 48%",
};

export const TOPIC_EXPLORER = {
  Todos: {
    title: "Todos los temas",
    description:
      "Explora la biblioteca completa: hábitos digitales, plataformas, decisiones de diseño, seguridad y derechos.",
  },
  Cookies: {
    title: "Cookies",
    description:
      "Entiende cómo una web reconoce tu visita, qué información conserva y cómo esos pequeños archivos pueden influir en la personalización, la publicidad y los precios.",
  },
  Algoritmos: {
    title: "Algoritmos",
    description:
      "Explora cómo las plataformas priorizan contenidos, anticipan intereses y toman decisiones automáticas a partir de señales sobre tu comportamiento.",
  },
  Redes: {
    title: "Redes",
    description:
      "Analiza qué ocurre con tus publicaciones, conexiones e interacciones cuando pasan a formar parte de los sistemas de una red social.",
  },
  Derechos: {
    title: "Derechos",
    description:
      "Aprende qué puedes consultar, corregir, limitar o eliminar y cómo ejercer mayor control sobre el uso que las organizaciones hacen de tus datos.",
  },
  "Dark patterns": {
    title: "Dark patterns",
    description:
      "Reconoce interfaces que ocultan opciones, añaden presión o hacen más difícil rechazar, cancelar y elegir con libertad.",
  },
  Seguridad: {
    title: "Seguridad",
    description:
      "Comprende amenazas habituales y adopta medidas claras para proteger tus cuentas, conexiones, dispositivos e información personal.",
  },
  Entrevistas: {
    title: "Entrevistas",
    description:
      "Conversaciones con voces del derecho, la investigación y el activismo digital. Perspectivas reales sobre privacidad, diseño y poder, explicadas sin jerga.",
  },
};

export function getArticleImagePosition(article) {
  return ARTICLE_MEDIA_POSITIONS[article.id] ?? "center 50%";
}

export function buildReadingSections(article) {
  return [
    ...article.sections.map((section, index) => ({
      id: `${article.id}-section-${index}`,
      label: section.heading,
      kind: "section",
      section,
    })),
    {
      id: `${article.id}-takeaways`,
      label: "Para llevar contigo",
      kind: "takeaways",
    },
  ];
}
