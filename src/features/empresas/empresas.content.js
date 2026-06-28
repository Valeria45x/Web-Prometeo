// Contenido de la página Para Empresas.

// Vista general: panel derecho (2 tarjetas + titular).
export const OVERVIEW_CARDS = [
  {
    eyebrow: "Acompañamiento",
    title: "Diseñamos contigo",
    body: "Trabajamos cada punto de contacto donde la privacidad se vuelve visible para el usuario.",
    cta: "Conocer la certificación",
    to: "/certificacion",
  },
  {
    eyebrow: "Verificación",
    title: "Cualquiera lo comprueba",
    body: "Cada sello Prometeo es público y auditable. Tus usuarios no tienen que creerte: pueden verificarlo en segundos.",
    cta: "Ver el registro público",
    to: "/empresas/registro",
  },
];

// Proceso: tarjetas apiladas, cada una enlaza a su detalle.
export const STEPS = [
  {
    index: "01",
    title: "Auditoría",
    body: "Revisamos lo que tus usuarios ven y viven, y lo contrastamos con lo que el producto hace por detrás. No sustituimos a tu asesoría legal: hacemos verificable lo que prometes. Sin jerga, con criterio de diseño.",
    cta: "Solicitar una auditoría",
    to: "/contacto",
    imagePosition: "28% center",
  },
  {
    index: "02",
    title: "Diagnóstico",
    body: "Identificamos qué funciona, qué falta y qué puede mejorar. El informe es tuyo, con o sin certificación.",
    cta: "Qué evaluamos",
    to: "/certificacion#alcance",
    imagePosition: "48% center",
  },
  {
    index: "03",
    title: "Implementación",
    body: "Te marcamos qué cambiar y por dónde empezar, desde los flujos de consentimiento hasta la arquitectura de permisos. La ejecución es de tu equipo; nosotros ponemos el criterio.",
    cta: "Cómo trabajamos",
    to: "/certificacion#alcance",
    imagePosition: "64% center",
  },
  {
    index: "04",
    title: "Certificación",
    body: "Si cumples los estándares, recibes el sello Prometeo. Visible para tus usuarios, verificable para cualquiera.",
    cta: "Conocer el sello",
    to: "/certificacion#verificacion",
    imagePosition: "80% center",
  },
];

export const OUTCOMES = [
  {
    number: "01",
    title: "Confianza visible",
    body: "Un sello que tus usuarios reconocen, porque Prometeo también les enseña a buscarlo. No un PDF enterrado en el pie de página.",
  },
  {
    number: "02",
    title: "Diferenciación real",
    body: "En un mercado donde todos dicen lo mismo, demostrar es la nueva forma de competir.",
  },
  {
    number: "03",
    title: "Menos riesgo",
    body: "Anticiparte al endurecimiento regulatorio europeo —AI Act, ePrivacy, DSA— reduce sanciones, crisis de reputación y deuda técnica.",
  },
  {
    number: "04",
    title: "Comunidad",
    body: "Acceso a una red de empresas que comparten el mismo estándar. Visibilidad compartida.",
  },
];

// Experiencia: testimonios de empresas. Placeholder hasta tener los reales.
// Cada cita debe reflejar lo que la empresa dice de Prometeo, no sus métricas.
export const CASES = [
  {
    id: "case-1",
    person: "Nicol\u00e1s Leocata Lowe",
    role: "Responsable de Comunidad",
    company: "Parque Pari FC",
    quote:
      "Como en Parque Pari, la confianza empieza cuando todos conocen las reglas del juego.",
  },
  {
    id: "case-2",
    person: "Pablo Rodr\u00edguez Vallejo",
    role: "CEO y director creativo",
    company: "Bug Brawl",
    quote:
      "Prometeo nos ayud\u00f3 a quitarnos de encima los bugs inform\u00e1ticos; los bichos del juego, esos se quedan.",
  },
  {
    id: "case-3",
    person: "Aurora Marcos",
    role: "CEO",
    company: "TRACE",
    quote:
      "En TRACE cada bajada cuenta. Prometeo nos ayuda a que cada deportista conf\u00ede en los datos que marcan su progreso.",
  },
];
