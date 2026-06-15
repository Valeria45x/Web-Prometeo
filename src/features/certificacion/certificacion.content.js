// Contenido de la página de Certificación. Separado de la UI para editarlo
// sin tocar el render.

export const SCOPE = [
  {
    title: "Políticas",
    body: "Comprobamos que cualquier persona pueda entender qué datos se recogen, para qué se usan, cuánto tiempo se conservan y con quién se comparten. Contrastamos esa explicación con el funcionamiento real del producto.",
    outcome:
      "una política clara, verificable y legible en menos de cinco minutos.",
  },
  {
    title: "Consentimiento",
    body: "Recorremos formularios y ajustes para verificar que cada permiso sea explícito, específico y reversible.",
    outcome:
      "un flujo equilibrado que permite decidir y cambiar de opinión sin obstáculos.",
  },
  {
    title: "Interfaz",
    body: "Analizamos jerarquía visual, tono, opciones preseleccionadas y número de pasos. Buscamos cualquier patrón que presione, confunda u oculte alternativas para orientar una decisión.",
    outcome:
      "un inventario priorizado de problemas y propuestas de rediseño accionables.",
  },
  {
    title: "Terceros",
    body: "Mapeamos qué proveedores y herramientas externas reciben información, para qué la necesitan y con qué base se comparte. Contrastamos documentación e integraciones para descubrir accesos que no están explicados.",
    outcome:
      "los accesos a terceros que no estaban declarados y dónde lo que dices no coincide con lo que tu producto comparte de verdad.",
  },
];

export const AUDIT_STORIES = [
  {
    title: "Antes del clic ya se ha decidido casi todo.",
    body: "Seguimos el recorrido real de una persona: qué encuentra, qué entiende y qué necesita para decidir. Comprobamos que la política y el consentimiento cuenten lo mismo, y que aceptar no resulte más fácil que rechazar.",
    outcome:
      "Detectamos dónde el usuario decide sin la información suficiente y lo dejamos por escrito, paso a paso, para que tu equipo lo corrija.",
    objectPosition: "24% center",
    reverse: false,
  },
  {
    title: "Después del clic, los datos siguen viajando.",
    body: "Luego miramos a dónde van los datos cuando el usuario ya no mira: qué proveedores los reciben y con qué base. Lo que el producto promete y lo que hace por detrás tienen que coincidir.",
    outcome:
      "Te entregamos un mapa de dónde acaba cada dato y una lista priorizada de lo que hay que arreglar para que la promesa se sostenga.",
    objectPosition: "76% center",
    reverse: true,
  },
];

export const LEVELS = [
  { number: "1", name: "Transparente" },
  { number: "2", name: "Íntegro" },
  { number: "3", name: "Soberano" },
];

export const FAQ = [
  {
    question: "¿Qué gana mi empresa al certificarse?",
    answer:
      "Una señal de confianza que el mercado puede comprobar, no solo creer. Te diferencia de quien dice cuidar la privacidad sin demostrarlo, reduce la fricción con usuarios y partners, y te deja un informe accionable para mejorar producto, diseño y legal.",
  },
  {
    question: "¿Y qué gana un usuario normal?",
    answer:
      "Poder distinguir, de un vistazo, a quién le respeta de quién no. El sello traduce prácticas invisibles en una prueba pública: cualquiera puede verificar qué se audita y qué cumple la empresa, sin leerse la letra pequeña.",
  },
  {
    question: "¿Qué pasa si no cumplimos el estándar?",
    answer:
      "Nada público. El registro solo se publica al certificar. El informe es vuestro y podéis volver a presentaros sin empezar de cero.",
  },
  {
    question: "¿Cuánto dura la certificación?",
    answer:
      "Doce meses. La renovación revisa solo los cambios del año, no es una auditoría completa.",
  },
  {
    question: "¿Accedéis a datos de nuestros usuarios?",
    answer:
      "Nunca. Trabajamos sobre entornos de prueba, documentación e interfaz.",
  },
  {
    question: "¿Quién os da autoridad para certificar?",
    answer:
      "La verificabilidad, no un título. El estándar y todas las certificaciones emitidas son públicas: cualquiera puede auditarnos a nosotros.",
  },
];
