export const LEGAL_LINKS = [
  { label: "Política de privacidad", to: "/legal/politica-de-privacidad" },
  { label: "Uso de cookies", to: "/legal/uso-de-cookies" },
  { label: "Condiciones de uso", to: "/legal/condiciones-de-uso" },
  { label: "Ventas y reembolsos", to: "/legal/ventas-y-reembolsos" },
  { label: "Avisos legales", to: "/legal/avisos-legales" },
  { label: "Accesibilidad", to: "/legal/accesibilidad" },
];

export const LEGAL_PAGES = {
  "politica-de-privacidad": {
    index: "Legal 01",
    title: "Política de privacidad",
    summary:
      "Prometeo se diseña desde una idea simple: pedir menos datos, explicar mejor cada uso y dar control real a la persona.",
    updatedAt: "1 de junio de 2026",
    sections: [
      {
        title: "Alcance",
        body: [
          "Esta política describe cómo se plantea el tratamiento de datos dentro del prototipo web de Prometeo.",
          "La comunidad, el perfil, el carrito y los pedidos funcionan como simulación local. Esos datos se guardan en el navegador mediante localStorage y no se envían a un servidor de Prometeo.",
        ],
      },
      {
        title: "Datos que puede introducir el usuario",
        body: [
          "En los flujos de demo puedes introducir nombre, handle, email, hilos, respuestas, preferencias, carrito y pedidos simulados.",
          "No introduzcas datos personales reales, contraseñas, información financiera ni contenido sensible. El objetivo de esta web es mostrar la experiencia, no operar un servicio de producción.",
        ],
      },
      {
        title: "Contacto",
        body: [
          "El formulario de contacto funciona como demo: el envío se simula en el navegador y no se transmite a ningún servidor.",
          "Los datos que escribas en él no se recopilan ni se almacenan en ningún sitio.",
        ],
      },
      {
        title: "Control",
        body: [
          "Puedes borrar los datos locales aquí mismo, con el botón de abajo, sin tener que ir a ningún otro sitio. También están disponibles desde el perfil.",
          "Y siempre puedes limpiarlos desde la configuración del navegador eliminando el almacenamiento del sitio.",
        ],
      },
    ],
  },
  "uso-de-cookies": {
    index: "Legal 02",
    title: "Uso de cookies",
    summary:
      "Prometeo no usa cookies para seguirte. La demo utiliza almacenamiento local para recordar interacciones del prototipo.",
    updatedAt: "1 de junio de 2026",
    sections: [
      {
        title: "Qué usa esta web",
        body: [
          "La web usa localStorage para mantener datos de comunidad, perfil, carrito y pedidos simulados en el navegador.",
          "localStorage no es una cookie, pero también guarda información en tu dispositivo. Por eso Prometeo lo explica de forma visible.",
        ],
      },
      {
        title: "Qué no usa",
        body: [
          "Esta versión no incorpora cookies publicitarias, píxeles de seguimiento ni analítica de terceros configurada desde el código del proyecto.",
          "Si en el futuro se añade medición, deberá explicarse antes de activarse y con opciones claras.",
        ],
      },
      {
        title: "Cómo borrar datos",
        body: [
          "Puedes borrar los datos locales aquí mismo, con el botón de abajo, o desde tu cuenta cuando prefieras. Ambas vías hacen lo mismo.",
          "Al borrar los datos locales, se reinician los hilos, usuarios, carrito y pedidos de demo guardados en ese navegador.",
        ],
      },
    ],
  },
  "condiciones-de-uso": {
    index: "Legal 03",
    title: "Condiciones de uso",
    summary:
      "Usar Prometeo en esta fase significa navegar un prototipo académico, no contratar un servicio digital final.",
    updatedAt: "1 de junio de 2026",
    sections: [
      {
        title: "Naturaleza del proyecto",
        body: [
          "Prometeo es un prototipo funcional desarrollado para un proyecto universitario de diseño.",
          "El contenido, los flujos de cuenta, la tienda, la certificación y la comunidad muestran una experiencia posible, pero no constituyen todavía un servicio comercial activo.",
        ],
      },
      {
        title: "Uso esperado",
        body: [
          "Puedes navegar la web, probar los flujos interactivos y usar datos ficticios para entender la propuesta.",
          "No debes usar la demo para publicar información sensible, suplantar identidades ni introducir datos de pago reales.",
        ],
      },
      {
        title: "Contenido",
        body: [
          "Los textos buscan explicar privacidad digital de forma clara. No sustituyen asesoramiento legal, técnico ni profesional.",
          "Las decisiones reales de privacidad deben contrastarse con fuentes oficiales o especialistas cuando el contexto lo requiera.",
        ],
      },
    ],
  },
  "ventas-y-reembolsos": {
    index: "Legal 04",
    title: "Ventas y reembolsos",
    summary:
      "La tienda de Prometeo es una simulación: muestra cómo podría funcionar la experiencia, pero no procesa compras reales.",
    updatedAt: "1 de junio de 2026",
    sections: [
      {
        title: "Tienda de demo",
        body: [
          "Los productos, precios, pedidos y estados de compra son parte del prototipo.",
          "No existe pasarela de pago conectada y no se genera una compraventa real desde esta versión.",
        ],
      },
      {
        title: "Pedidos",
        body: [
          "Los pedidos se guardan localmente en el navegador para mostrar el flujo posterior a una compra.",
          "Si borras los datos locales, esos pedidos de demo desaparecen.",
        ],
      },
      {
        title: "Reembolsos",
        body: [
          "Al no existir ventas reales, tampoco existen cobros ni reembolsos reales en esta versión.",
          "Si Prometeo llegara a operar una tienda real, esta página debería sustituirse por una política comercial completa y revisada.",
        ],
      },
    ],
  },
  "avisos-legales": {
    index: "Legal 05",
    title: "Avisos legales",
    summary:
      "Esta página recoge la información básica sobre el estado actual del proyecto y sus límites como prototipo.",
    updatedAt: "1 de junio de 2026",
    sections: [
      {
        title: "Identificación",
        body: [
          "Prometeo Inc. se utiliza aquí como identidad de marca dentro del prototipo académico.",
          "La web forma parte de un proyecto universitario y puede contener contenido, enlaces o servicios simulados.",
        ],
      },
      {
        title: "Propiedad intelectual",
        body: [
          "El sistema visual, textos, estructura de interfaz y recursos de marca pertenecen al proyecto Prometeo salvo indicación contraria.",
          "Los materiales se presentan para evaluación, documentación y muestra del proceso de diseño.",
        ],
      },
      {
        title: "Limitación",
        body: [
          "Prometeo no garantiza que los contenidos de esta demo sean suficientes para tomar decisiones legales, comerciales o técnicas.",
          "El objetivo es demostrar una experiencia de comunicación clara sobre privacidad digital.",
        ],
      },
    ],
  },
  accesibilidad: {
    index: "Legal 06",
    title: "Accesibilidad",
    summary:
      "La claridad no termina en el contenido: también debe estar en la navegación, el contraste, el foco y la estructura.",
    updatedAt: "1 de junio de 2026",
    sections: [
      {
        title: "Compromiso",
        body: [
          "Prometeo busca una interfaz legible, navegable y comprensible, evitando patrones que oculten información importante.",
          "El proyecto incluye navegación por teclado, enlace para saltar al contenido y jerarquías visuales pensadas para lectura clara.",
        ],
      },
      {
        title: "Estado actual",
        body: [
          "Esta versión sigue en desarrollo. Algunas áreas pueden necesitar revisión final de contraste, estados de foco, textos alternativos y comportamiento responsive.",
          "La accesibilidad se tratará como parte del diseño, no como un añadido al final.",
        ],
      },
      {
        title: "Mejoras previstas",
        body: [
          "Antes de la entrega final conviene revisar contenido no usado, etiquetas de formulario, orden de tabulación, contraste real y consistencia de estados interactivos.",
          "Cualquier cambio que haga la web más comprensible tendrá prioridad sobre efectos visuales innecesarios.",
        ],
      },
    ],
  },
};

export function getLegalPage(slug) {
  return LEGAL_PAGES[slug] ?? null;
}
