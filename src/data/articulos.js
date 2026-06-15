export const ARTICLE_TOPICS = [
  "Todos",
  "Cookies",
  "Algoritmos",
  "Redes",
  "Derechos",
  "Dark patterns",
  "Seguridad",
  "Entrevistas",
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
  {
    id: "entrevista-rgpd-elena-martin",
    issue: "E-001",
    title: "«Nunca te dijeron que podías decir que no»",
    dek: "Conversación con Elena Martín, abogada especializada en protección de datos, sobre por qué el consentimiento se volvió un trámite y cómo recuperar la negativa como una opción real.",
    topic: "Entrevistas",
    author: "Elena Martín",
    date: "2026-05-12",
    readTime: 8,
    level: "Entrevista",
    sections: [
      {
        heading: "El perfil",
        paragraphs: [
          "Elena Martín lleva más de una década asesorando a empresas y a particulares en protección de datos. Ha visto el RGPD desde los dos lados: el de quien tiene que cumplirlo y el de quien debería estar protegido por él.",
          "Su tesis es incómoda para ambos. «La ley está bien escrita», dice. «El problema es lo que pasó cuando llegó al diseño de las pantallas».",
        ],
      },
      {
        heading: "¿El RGPD ha mejorado algo para el usuario de a pie?",
        paragraphs: [
          "Sí, aunque no donde la gente cree. Ha obligado a las empresas a documentar qué hacen con los datos y a darte derechos concretos: acceder, rectificar, oponerte, que te borren. Eso antes no existía de forma exigible.",
          "Lo que no ha cambiado es la experiencia. El usuario sigue encontrándose un muro de botones y sigue pulsando «aceptar» para quitárselo de encima. La ley te dio derechos; el diseño te los escondió.",
        ],
      },
      {
        heading: "Dice que el consentimiento se volvió un trámite. ¿Por qué?",
        paragraphs: [
          "Porque se diseñó para parecer obligatorio cuando no lo es. El consentimiento, legalmente, tiene que ser libre, informado, específico e inequívoco. Si para rechazar tienes que hacer cinco clics y para aceptar uno, no es libre. Si la información está en tres páginas de jerga, no es informado.",
          "Las empresas cumplieron la letra y vaciaron el espíritu. El banner de cookies es el símbolo perfecto: técnicamente te pregunta, en la práctica te empuja.",
        ],
      },
      {
        heading: "¿Negarse cambia algo en la práctica?",
        paragraphs: [
          "Más de lo que la gente piensa. Cuando rechazas las cookies no esenciales, muchas plataformas dejan de construir parte de tu perfil. Cuando ejerces tu derecho de oposición, tienen que parar ciertos tratamientos.",
          "No es magia y no lo arregla todo, pero cada negativa es un dato menos en un sistema que vive de acumularlos. El problema no es que negarse no sirva. Es que casi nadie sabe que puede.",
        ],
      },
      {
        heading: "¿Qué haría distinto si pudiera reescribir cómo se pide el permiso?",
        paragraphs: [
          "Pondría rechazar y aceptar al mismo nivel: mismo número de clics, mismo tamaño. Obligaría a explicar, en una frase, qué gana la empresa con cada permiso, no solo qué pierdes tú. Y haría que cambiar de opinión estuviera siempre a un clic, no enterrado.",
          "Nada de eso es técnicamente difícil. Es una decisión de diseño. Por eso me interesa lo que propone Prometeo: tratar la privacidad como lo que es, un problema de diseño, no solo de cumplimiento.",
        ],
      },
      {
        heading: "La idea que se queda",
        paragraphs: [
          "Si algo deja claro Martín es que la ley hizo su parte y el diseño deshizo buena parte de ella. La buena noticia es que lo que se diseñó para confundir también puede diseñarse para aclarar. Empieza por saber que la negativa es una opción legítima y, casi siempre, disponible.",
        ],
      },
    ],
    takeaways: [
      "Tienes derecho a oponerte, acceder, rectificar y a que te borren, aunque la interfaz no los muestre.",
      "Rechazar cookies no esenciales reduce de verdad los datos que se usan para perfilarte.",
      "Si rechazar cuesta mucho más que aceptar, el consentimiento no es libre y puedes reclamarlo.",
    ],
  },
  {
    id: "entrevista-dark-patterns-bruno-vega",
    issue: "E-002",
    title: "«El diseño no es neutral, y eso no es una opinión»",
    dek: "Conversación con Bruno Vega, investigador de patrones de diseño engañoso, sobre cómo una interfaz decide por ti sin que lo notes y por qué reconocerlo basta para neutralizarlo.",
    topic: "Entrevistas",
    author: "Bruno Vega",
    date: "2026-05-26",
    readTime: 7,
    level: "Entrevista",
    sections: [
      {
        heading: "El perfil",
        paragraphs: [
          "Bruno Vega estudia patrones de diseño engañoso: las pequeñas decisiones de una interfaz que te empujan a hacer lo que beneficia a quien la diseñó. Los cataloga, los mide y los nombra.",
          "«Ponerles nombre es la mitad del trabajo», dice. «Lo que se puede nombrar, se puede reconocer. Y lo que se reconoce, deja de funcionar».",
        ],
      },
      {
        heading: "¿Qué es exactamente un dark pattern?",
        paragraphs: [
          "Es una decisión de diseño que aprovecha cómo funciona tu atención para que tomes una opción que no habrías elegido con la misma información presentada de forma neutral. No es engaño en el sentido de mentir; es engaño en el sentido de dirigir.",
          "El botón grande y de color frente al enlace gris diminuto. La casilla ya marcada. El «no, gracias, prefiero pagar más». Todo eso es diseño, y ninguno es accidental.",
        ],
      },
      {
        heading: "¿No es solo buen marketing?",
        paragraphs: [
          "Hay una línea, y es la asimetría. El marketing te persuade con argumentos que puedes evaluar. El dark pattern te quita la posibilidad de evaluar: esconde la opción, mete prisa falsa, hace que cancelar sea diez veces más difícil que suscribirte.",
          "Cuando el esfuerzo de elegir bien es mucho mayor que el de elegir lo que ellos quieren, ya no estás decidiendo tú.",
        ],
      },
      {
        heading: "¿Se pueden medir?",
        paragraphs: [
          "Sí, y es lo que hago. Medimos cuántos pasos cuesta rechazar frente a aceptar, cuánto se tarda en encontrar el botón de baja, cuánta gente termina marcando algo que no quería. Cuando lo pones en números, el patrón aparece clarísimo.",
          "Las empresas saben perfectamente lo que hacen: lo prueban, lo optimizan. No es descuido, es rendimiento.",
        ],
      },
      {
        heading: "¿Qué puede hacer una persona normal?",
        paragraphs: [
          "Lo primero, reconocerlos, porque pierden casi todo su poder cuando los ves venir. Lee la acción del botón, no su color. Desconfía de la urgencia que no puedes comprobar. Busca el enlace pequeño.",
          "Y exige lo contrario: las marcas que ponen rechazar tan fácil como aceptar lo hacen a propósito, igual que las otras. Esa diferencia debería poder verse. Por eso tiene sentido certificarla.",
        ],
      },
      {
        heading: "La idea que se queda",
        paragraphs: [
          "Vega insiste en que el problema no es tu fuerza de voluntad, es el campo de juego. Y un campo de juego se puede rediseñar. Reconocer un patrón es el primer movimiento; pedir que no esté, el segundo.",
        ],
      },
    ],
    takeaways: [
      "Lee qué hace cada botón, no cuál destaca: el color no es información.",
      "La urgencia que no puedes verificar casi siempre es una palanca, no un hecho.",
      "Que rechazar sea tan fácil como aceptar es una elección de diseño y una señal de confianza.",
    ],
  },
  {
    id: "entrevista-derechos-nadia-oromi",
    issue: "E-003",
    title: "«Tus datos no son solo tuyos: son de todos los que se parecen a ti»",
    dek: "Conversación con Nadia Oromí, activista de derechos digitales, sobre por qué la privacidad dejó de ser un asunto personal y qué cambia cuando el conocimiento se comparte.",
    topic: "Entrevistas",
    author: "Nadia Oromí",
    date: "2026-06-09",
    readTime: 7,
    level: "Entrevista",
    sections: [
      {
        heading: "El perfil",
        paragraphs: [
          "Nadia Oromí defiende los derechos digitales desde la organización colectiva. Su mensaje desplaza el foco de lo individual a lo común.",
          "«La privacidad se vendió como un asunto personal, lo que tú ocultas, y así es más fácil de ignorar», dice. «Pero tus datos hablan de mucha más gente que tú».",
        ],
      },
      {
        heading: "¿Por qué dice que la privacidad no es un asunto individual?",
        paragraphs: [
          "Porque los sistemas no te analizan a ti en aislamiento: te comparan con millones de personas parecidas. Cuando entregas tus datos, no entregas solo los tuyos; entregas pistas sobre todos los que se comportan como tú.",
          "Por eso «no tengo nada que esconder» es una trampa: aunque tú no tengas nada que esconder, tus datos ayudan a predecir y a influir en gente que sí necesita protección.",
        ],
      },
      {
        heading: "¿No es demasiado tarde? Ya lo aceptamos todo.",
        paragraphs: [
          "No lo creo. Lo aceptamos sin saber, y lo que se aceptó sin saber se puede revisar. Lo hemos visto: la presión pública cambió leyes, cambió productos, hizo que empresas enteras rediseñaran cómo piden permiso.",
          "La economía de datos parece inevitable porque es enorme, no porque sea intocable. Lo inevitable es una historia que cuenta quien se beneficia.",
        ],
      },
      {
        heading: "¿Qué cambia una persona sola?",
        paragraphs: [
          "Sola, poco. Pero nadie actúa solo cuando comparte lo que sabe. La privacidad funciona como la salud pública: tus decisiones protegen a otros y las de otros te protegen a ti.",
          "Cada persona que aprende a leer un permiso y se lo explica a alguien de su entorno mueve el listón. El conocimiento es lo único que no te pueden quitar una vez lo tienes.",
        ],
      },
      {
        heading: "¿Qué papel juega algo como Prometeo?",
        paragraphs: [
          "Hace dos cosas que hacen falta: traduce y señala. Traduce, porque pone en lenguaje normal algo diseñado para que no lo entiendas. Y señala, porque certificar a quien lo hace bien convierte la confianza en algo que se puede ver y comparar.",
          "La conciencia individual necesita herramientas colectivas. Si no, se queda en culpa.",
        ],
      },
      {
        heading: "La idea que se queda",
        paragraphs: [
          "Oromí devuelve la privacidad al plano donde cree que se gana: el de la gente que se pasa lo que sabe. No como obligación, sino como forma de cuidar. Lo personal, aquí, también es común.",
        ],
      },
    ],
    takeaways: [
      "«No tengo nada que esconder» ignora que tus datos predicen el comportamiento de gente que sí necesita protección.",
      "La economía de datos es enorme, no inevitable: la presión colectiva ya ha cambiado leyes y productos.",
      "Compartir lo que aprendes sobre privacidad protege a tu entorno, como la salud pública.",
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
