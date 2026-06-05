export const ARTICLE_TOPICS = [
  "Todos",
  "Cookies",
  "Algoritmos",
  "Redes",
  "Derechos",
  "Dark patterns",
  "Seguridad",
];

export const ARTICLES = [
  {
    id: "cookies-precios",
    issue: "A-001",
    title: "Cómo aceptar cookies afecta los precios que ves online",
    dek: "Aceptar no es gratis: algunas plataformas ajustan precios según tu historial de búsqueda, frecuencia de visita y perfil de comportamiento.",
    topic: "Cookies",
    author: "Equipo Prometeo",
    date: "2026-04-21",
    readTime: 7,
    featured: true,
    level: "Guía",
    sections: [
      {
        heading: "El precio no siempre es igual para todos",
        paragraphs: [
          "Cuando visitas una tienda, una plataforma puede registrar qué productos miras, desde qué dispositivo entras, cuántas veces vuelves y qué campañas te llevaron hasta allí. Esa información no cambia necesariamente el precio por sí sola, pero alimenta sistemas de segmentación y experimentación comercial.",
          "Dos personas pueden recibir ofertas, urgencias o descuentos distintos aunque estén consultando el mismo producto. A veces cambia la cifra; otras veces cambia la manera de presentarla y la presión para comprar.",
        ],
      },
      {
        heading: "Qué papel tienen las cookies",
        paragraphs: [
          "Las cookies permiten reconocer una sesión y relacionar visitas separadas. Las técnicas hacen funcionar la compra; las analíticas y publicitarias ayudan a construir un historial más amplio sobre intereses y comportamiento.",
          "El problema no es una cookie aislada, sino la combinación de identificadores, datos de navegación y perfiles procedentes de varias fuentes.",
        ],
      },
      {
        heading: "Cómo comparar con más control",
        paragraphs: [
          "Prueba a consultar el mismo producto sin iniciar sesión, desde una ventana privada o después de rechazar cookies opcionales. No es una garantía de precio neutro, pero permite detectar diferencias y reducir parte del seguimiento.",
          "Compara siempre el precio final, incluidos gastos, condiciones y descuentos condicionados. La transparencia empieza por mirar más allá de la primera cifra.",
        ],
      },
    ],
    takeaways: [
      "Rechaza las cookies opcionales cuando no aporten una función que necesites.",
      "Compara el precio desde más de un contexto antes de decidir.",
      "Desconfía de temporizadores y mensajes de escasez que no puedas comprobar.",
    ],
  },
  {
    id: "algoritmo-antes-buscar",
    issue: "A-002",
    title: "Por qué el algoritmo sabe lo que quieres antes de buscarlo",
    dek: "No necesita escucharte: le basta con tus pausas, tus clics y tus hábitos para predecir qué verás y qué decidirás después.",
    topic: "Algoritmos",
    author: "Equipo Prometeo",
    date: "2026-04-18",
    readTime: 6,
    level: "Análisis",
    sections: [
      {
        heading: "Predecir no significa leer la mente",
        paragraphs: [
          "Una plataforma observa señales pequeñas: cuánto tiempo permaneces en una publicación, qué repites, qué ignoras, a qué hora te conectas y qué hacen perfiles parecidos al tuyo. Con miles de interacciones, esas señales permiten estimar qué contenido tendrá más probabilidades de retenerte.",
          "La predicción puede sentirse personal aunque el sistema no sepa exactamente quién eres. Le basta con colocarte dentro de patrones de comportamiento útiles.",
        ],
      },
      {
        heading: "La recomendación también modifica la conducta",
        paragraphs: [
          "El algoritmo no solo adivina lo que quieres: decide qué opciones aparecen primero. Esa selección influye en lo que descubres, comparas y acabas considerando normal.",
          "Cuando una recomendación funciona, genera una interacción nueva que confirma el perfil anterior. Así se forma un círculo en el que predicción y conducta se refuerzan.",
        ],
      },
      {
        heading: "Recuperar variedad",
        paragraphs: [
          "Borrar el historial, pausar la personalización o usar feeds cronológicos puede reducir parte de esa inercia. También ayuda buscar fuentes de forma deliberada en lugar de depender siempre de la siguiente recomendación.",
          "La meta no es eliminar toda personalización, sino reconocer cuándo está decidiendo demasiado por ti.",
        ],
      },
    ],
    takeaways: [
      "Revisa y borra periódicamente tu historial de actividad.",
      "Desactiva la personalización cuando prefieras explorar sin perfilado.",
      "Busca voces y fuentes fuera de tus recomendaciones habituales.",
    ],
  },
  {
    id: "wifi-cafeterias",
    issue: "A-003",
    title: "Lo que nadie te dice sobre el wifi gratis de las cafeterías",
    dek: "En redes públicas no controlas la infraestructura: proteger contenido no siempre protege metadatos, sesiones ni contexto de navegación.",
    topic: "Redes",
    author: "Equipo Prometeo",
    date: "2026-04-15",
    readTime: 6,
    level: "Guía",
    sections: [
      {
        heading: "Una red compartida exige más confianza",
        paragraphs: [
          "En una red pública no sabes quién administra el punto de acceso ni si el nombre que aparece en tu dispositivo corresponde al establecimiento. Una red falsa puede imitar un nombre reconocible para atraer conexiones.",
          "El cifrado HTTPS protege el contenido de muchas comunicaciones, pero la red todavía puede observar datos de contexto como dominios consultados, horarios o volumen de tráfico.",
        ],
      },
      {
        heading: "El riesgo de las sesiones abiertas",
        paragraphs: [
          "Las aplicaciones mal configuradas, los dispositivos sin actualizar y las páginas sin cifrado aumentan el riesgo. También es fácil olvidar que el ordenador puede estar compartiendo archivos o buscando automáticamente otros dispositivos.",
          "Las operaciones sensibles, como acceder al banco o enviar documentación privada, merecen una conexión que controles.",
        ],
      },
      {
        heading: "Una rutina sencilla",
        paragraphs: [
          "Confirma el nombre de la red con el personal, desactiva la conexión automática y utiliza tus datos móviles para tareas delicadas. Una VPN fiable puede proteger el tráfico frente a la red local, aunque no convierte cualquier servicio en seguro.",
          "Cuando termines, olvida la red para evitar reconexiones futuras sin darte cuenta.",
        ],
      },
    ],
    takeaways: [
      "Verifica el nombre exacto de la red antes de conectarte.",
      "Evita operaciones sensibles o utiliza tus datos móviles.",
      "Desactiva compartir archivos y olvida la red al terminar.",
    ],
  },
  {
    id: "dark-patterns-consentimiento",
    issue: "A-004",
    title: "Qué son los dark patterns y cómo afectan tus decisiones online",
    dek: "No son errores de interfaz: son decisiones de diseño que te empujan a aceptar, ceder o permanecer donde no habrías elegido estar.",
    topic: "Dark patterns",
    author: "Equipo Prometeo",
    date: "2026-04-12",
    readTime: 8,
    level: "Criterios",
    sections: [
      {
        heading: "Diseñar también es dirigir",
        paragraphs: [
          "Un dark pattern utiliza jerarquía, color, lenguaje o fricción para favorecer una opción concreta. El botón de aceptar puede ser grande y visible mientras rechazar exige recorrer varias pantallas.",
          "La interfaz sigue ofreciendo una elección formal, pero distribuye el esfuerzo de manera desigual. Por eso el consentimiento puede existir sin ser realmente libre o informado.",
        ],
      },
      {
        heading: "Patrones frecuentes",
        paragraphs: [
          "La cancelación difícil, las casillas preseleccionadas, la urgencia artificial y las preguntas redactadas para confundir aparecen en compras, suscripciones y permisos de datos.",
          "También existe la obstrucción: pedir muchos pasos para retirar una decisión que se tomó con un solo clic.",
        ],
      },
      {
        heading: "Cómo responder",
        paragraphs: [
          "Lee la acción concreta de cada botón y no su color. Busca opciones como gestionar, configurar o continuar sin aceptar. Si cancelar parece deliberadamente difícil, documenta el proceso y utiliza los canales de reclamación disponibles.",
          "Una buena interfaz permite aceptar y rechazar con una claridad y un esfuerzo comparables.",
        ],
      },
    ],
    takeaways: [
      "Comprueba qué acción realiza cada botón, no solo cuál destaca.",
      "Revisa casillas activadas por defecto antes de continuar.",
      "Guarda pruebas cuando retirar el consentimiento resulte injustificadamente difícil.",
    ],
  },
  {
    id: "tipos-cookies",
    issue: "A-005",
    title: "Tipos de cookies: cuáles son necesarias y cuáles no",
    dek: "Distinguir entre cookies técnicas, analíticas y de terceros es la base para decidir con claridad qué compartes y qué no.",
    topic: "Cookies",
    author: "Marta G.",
    date: "2026-04-09",
    readTime: 5,
    level: "Checklist",
    sections: [
      {
        heading: "Las cookies técnicas",
        paragraphs: [
          "Mantienen una sesión, recuerdan el carrito o aplican una preferencia necesaria para que el servicio funcione. Normalmente no dependen del consentimiento cuando son imprescindibles para una acción solicitada.",
          "Eso no significa que cualquier cookie descrita como técnica lo sea: su finalidad real importa más que la etiqueta.",
        ],
      },
      {
        heading: "Analítica, personalización y publicidad",
        paragraphs: [
          "Las cookies analíticas miden el uso del sitio; las de personalización adaptan contenidos; las publicitarias siguen intereses y campañas. Pueden pertenecer al propio servicio o a terceros presentes en muchas páginas.",
          "Cuanto más se conectan esos identificadores entre sitios, más completo puede ser el perfil resultante.",
        ],
      },
      {
        heading: "Qué revisar en un banner",
        paragraphs: [
          "Busca una opción de rechazo tan accesible como aceptar, categorías desactivadas por defecto y una explicación concreta de proveedores y duración.",
          "Puedes cambiar de opinión después. La configuración de privacidad debería seguir disponible y no desaparecer tras la primera visita.",
        ],
      },
    ],
    takeaways: [
      "Acepta solo las categorías que entiendas y necesites.",
      "Revisa proveedores, finalidad y duración, no únicamente el nombre.",
      "Busca el enlace para modificar el consentimiento posteriormente.",
    ],
  },
  {
    id: "fijacion-dinamica-precios",
    issue: "A-006",
    title: "Qué es la fijación dinámica de precios",
    dek: "El precio puede cambiar según tu comportamiento digital. Comprender ese mecanismo permite comparar mejor y comprar con más control.",
    topic: "Algoritmos",
    author: "Nuria K.",
    date: "2026-04-06",
    readTime: 6,
    level: "Proceso",
    sections: [
      {
        heading: "Precios que responden al contexto",
        paragraphs: [
          "La fijación dinámica ajusta precios según demanda, disponibilidad, momento o condiciones del mercado. Es habitual en transporte y alojamiento, donde la capacidad cambia constantemente.",
          "El sistema puede actualizarse en minutos y producir diferencias legítimas sin utilizar información personal.",
        ],
      },
      {
        heading: "Cuándo entra el perfil del usuario",
        paragraphs: [
          "La personalización aparece cuando se incorporan ubicación, historial, dispositivo, fidelidad o respuesta previa a promociones. A veces no cambia el precio base, sino los descuentos y opciones que cada persona recibe.",
          "La falta de transparencia dificulta distinguir una variación de mercado de una decisión basada en el perfil.",
        ],
      },
      {
        heading: "Comparar antes de comprar",
        paragraphs: [
          "Anota el precio final y vuelve a consultarlo en otro momento o contexto. Evita repetir búsquedas impulsivamente cuando la interfaz utiliza urgencia y comprueba las condiciones de cancelación.",
          "Un precio dinámico no es necesariamente injusto, pero debería poder explicarse sin ocultar los factores esenciales.",
        ],
      },
    ],
    takeaways: [
      "Compara el precio final, no solo la cifra promocional.",
      "Prueba diferentes momentos y contextos antes de una compra importante.",
      "Distingue entre cambios por demanda y personalización basada en datos.",
    ],
  },
  {
    id: "perfil-publicitario",
    issue: "A-007",
    title: "Qué es el perfil publicitario que las plataformas tienen de ti",
    dek: "Tu perfil no nace de una sola acción: se construye por acumulación y determina qué ofertas, ideas y anuncios llegan primero a ti.",
    topic: "Derechos",
    author: "Elena V.",
    date: "2026-04-03",
    readTime: 7,
    level: "Guía",
    sections: [
      {
        heading: "Una representación, no una descripción exacta",
        paragraphs: [
          "El perfil publicitario agrupa intereses, probabilidades y segmentos inferidos a partir de actividad, ubicación aproximada, compras o relaciones entre dispositivos.",
          "Puede contener errores y aun así influir en qué anuncios recibes. Su objetivo no es comprenderte, sino predecir qué mensaje tendrá más posibilidades de funcionar.",
        ],
      },
      {
        heading: "Cómo se conecta la información",
        paragraphs: [
          "Píxeles, identificadores móviles, inicios de sesión y socios publicitarios ayudan a relacionar acciones que ocurren en servicios distintos. El resultado suele estar distribuido entre varias empresas.",
          "Por eso borrar una aplicación no elimina necesariamente todos los datos asociados al perfil.",
        ],
      },
      {
        heading: "Tus opciones",
        paragraphs: [
          "Muchas plataformas permiten consultar intereses, desactivar anuncios personalizados y limitar actividad externa. También puedes ejercer derechos de acceso, oposición o supresión según el servicio y la normativa aplicable.",
          "Desactivar personalización no elimina la publicidad, pero reduce el uso de tu comportamiento para seleccionarla.",
        ],
      },
    ],
    takeaways: [
      "Consulta la sección de intereses publicitarios de tus cuentas principales.",
      "Desactiva la personalización y la actividad externa que no necesites.",
      "Corrige o elimina información cuando la plataforma ofrezca esa posibilidad.",
    ],
  },
  {
    id: "man-in-the-middle",
    issue: "A-008",
    title: "Qué es un ataque man-in-the-middle",
    dek: "El atacante no rompe todo: se coloca en medio. Entender cómo funciona ayuda a prevenir riesgos en redes abiertas y entornos compartidos.",
    topic: "Seguridad",
    author: "Carlos M.",
    date: "2026-03-31",
    readTime: 7,
    level: "Seguridad",
    sections: [
      {
        heading: "Interponerse entre dos extremos",
        paragraphs: [
          "En un ataque man-in-the-middle, una tercera parte intenta observar o modificar una comunicación haciéndose pasar por cada extremo frente al otro. Puede ocurrir mediante una red falsa, manipulación local o certificados fraudulentos.",
          "El objetivo puede ser capturar credenciales, redirigir pagos o alterar la información que recibe la víctima.",
        ],
      },
      {
        heading: "Qué señales importan",
        paragraphs: [
          "Las alertas de certificado, los cambios inesperados de dominio, las páginas que pierden HTTPS y las solicitudes repetidas de acceso merecen atención. Ignorar una advertencia del navegador elimina una barrera diseñada precisamente para detectar esta situación.",
          "La autenticación en dos pasos reduce el daño de una contraseña capturada, aunque no sustituye una conexión segura.",
        ],
      },
      {
        heading: "Reducir el riesgo",
        paragraphs: [
          "Mantén sistema y navegador actualizados, verifica la dirección antes de introducir datos y evita instalar certificados o perfiles que no comprendas. En redes públicas, limita las operaciones sensibles.",
          "Si una página presenta una alerta de seguridad, detente y vuelve a acceder desde una conexión conocida.",
        ],
      },
    ],
    takeaways: [
      "No ignores advertencias de certificado o cambios de dominio.",
      "Activa autenticación en dos pasos en cuentas importantes.",
      "Evita introducir credenciales desde redes o enlaces dudosos.",
    ],
  },
];

export function formatArticleDate(date) {
  return new Date(date).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
