// Registro público de empresas certificadas por Prometeo.
// Datos ficticios pero verosímiles para el TFG. Las 6 primeras coinciden con
// los casos de la página /empresas para mantener coherencia en todo el sitio.

export const REGISTRO_SECTORES = [
  "Fintech",
  "Salud digital",
  "E-commerce",
  "Edtech",
  "SaaS",
  "Movilidad",
  "Mensajería",
  "Media",
  "Citas",
  "Delivery",
];

export const REGISTRO_EMPRESAS = [
  {
    id: "nodo-pay",
    name: "Nodo Pay",
    sector: "Fintech",
    code: "PRO-2026-014",
    certifiedOn: "Marzo 2026",
    validUntil: "Marzo 2027",
    summary:
      "Pasarela de pagos que reescribió su flujo de consentimiento para que cada permiso fuera explícito y reversible.",
  },
  {
    id: "vita",
    name: "Vita",
    sector: "Salud digital",
    code: "PRO-2026-021",
    certifiedOn: "Abril 2026",
    validUntil: "Abril 2027",
    summary:
      "Plataforma de salud que documentó la trazabilidad completa de los datos clínicos que trata y con quién los comparte.",
  },
  {
    id: "raiz",
    name: "Raíz",
    sector: "E-commerce",
    code: "PRO-2026-027",
    certifiedOn: "Abril 2026",
    validUntil: "Abril 2027",
    summary:
      "Tienda online que eliminó los dark patterns de su banner de cookies y abrió un centro de privacidad legible.",
  },
  {
    id: "aula-abierta",
    name: "Aula Abierta",
    sector: "Edtech",
    code: "PRO-2026-033",
    certifiedOn: "Mayo 2026",
    validUntil: "Mayo 2027",
    summary:
      "Plataforma educativa que reescribió cada permiso para que familias y estudiantes entendieran qué datos usa y para qué.",
  },
  {
    id: "nexo-cloud",
    name: "Nexo Cloud",
    sector: "SaaS",
    code: "PRO-2026-040",
    certifiedOn: "Mayo 2026",
    validUntil: "Mayo 2027",
    summary:
      "Software B2B que convirtió meses de dudas internas sobre datos en una política pública clara y auditable.",
  },
  {
    id: "via",
    name: "Vía",
    sector: "Movilidad",
    code: "PRO-2026-046",
    certifiedOn: "Junio 2026",
    validUntil: "Junio 2027",
    summary:
      "App de movilidad que explica su uso de geolocalización con honestidad, sin enterrar la opción de rechazarla.",
  },
  {
    id: "cierzo",
    name: "Cierzo",
    sector: "Mensajería",
    code: "PRO-2026-052",
    certifiedOn: "Junio 2026",
    validUntil: "Junio 2027",
    summary:
      "Mensajería cifrada de extremo a extremo que publicó qué metadatos guarda y durante cuánto tiempo.",
  },
  {
    id: "faro",
    name: "Faro",
    sector: "Media",
    code: "PRO-2026-058",
    certifiedOn: "Julio 2026",
    validUntil: "Julio 2027",
    summary:
      "Medio digital que redujo a una sola capa los rastreadores de terceros y los declaró todos de forma comprensible.",
  },
  {
    id: "enlace",
    name: "Enlace",
    sector: "Citas",
    code: "PRO-2026-061",
    certifiedOn: "Julio 2026",
    validUntil: "Julio 2027",
    summary:
      "App de citas que separó los datos necesarios para el servicio de los que se usaban para publicidad, y los hizo opcionales.",
  },
  {
    id: "huerto",
    name: "Huerto",
    sector: "Delivery",
    code: "PRO-2026-067",
    certifiedOn: "Agosto 2026",
    validUntil: "Agosto 2027",
    summary:
      "Plataforma de delivery que dejó de compartir el historial de pedidos con terceros sin consentimiento explícito.",
  },
];
