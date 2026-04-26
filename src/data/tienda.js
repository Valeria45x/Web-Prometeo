export const PRODUCTS = [
  {
    id: "pmt-g01-bk",
    code: "PMT-G01-BK",
    name: "Guía de Privacidad Digital",
    category: "guias",
    price: 3200,
    description:
      "Guía completa de privacidad digital en formato impreso. Metodología Prometeo aplicada paso a paso.",
    specs: [
      "200 páginas impresas",
      "Metodología Prometeo completa",
      "Hoja de ejercicios incluida",
      "Edición limitada numerada",
    ],
    variants: ["ES", "EN"],
    defaultVariant: "ES",
    inStock: true,
  },
  {
    id: "pmt-u01-bk",
    code: "PMT-U01-BK",
    name: "Pack de Herramientas",
    category: "herramientas",
    price: 8900,
    description:
      "USB con selección curada de herramientas de privacidad y seguridad. Preconfigurado y listo para usar.",
    specs: [
      "USB 3.0 — 64 GB",
      "Herramientas preconfiguradas",
      "Guía de inicio incluida",
      "Actualizaciones de por vida",
    ],
    variants: null,
    defaultVariant: null,
    inStock: true,
  },
  {
    id: "pmt-s01-bk",
    code: "PMT-S01-BK",
    name: "Sesión de Auditoría",
    category: "servicios",
    price: 15000,
    description:
      "Auditoría personalizada de privacidad digital. Una hora con el equipo Prometeo para revisar tu huella digital.",
    specs: [
      "Duración: 60 minutos",
      "Informe de resultados",
      "Plan de acción personalizado",
      "Seguimiento a 30 días",
    ],
    variants: null,
    defaultVariant: null,
    inStock: true,
  },
  {
    id: "pmt-c01-bk",
    code: "PMT-C01-BK",
    name: "Acceso Certificación",
    category: "digital",
    price: 5500,
    description:
      "Acceso completo al programa de certificación Prometeo. Aprende a proteger tu identidad digital desde cero.",
    specs: [
      "Acceso de por vida",
      "Certificado verificable",
      "Comunidad privada incluida",
      "Material actualizado",
    ],
    variants: null,
    defaultVariant: null,
    inStock: true,
  },
  {
    id: "pmt-t01-bk",
    code: "PMT-T01-BK",
    name: "Camiseta Prometeo",
    category: "merch",
    price: 2800,
    description:
      "Camiseta de algodón pesado con el símbolo Prometeo. Corte unisex, lavado a 30°.",
    specs: [
      "100% algodón 220g",
      "Serigrafía de alta durabilidad",
      "Corte unisex",
      "Edición limitada",
    ],
    variants: ["XS", "S", "M", "L", "XL", "XXL"],
    defaultVariant: "M",
    inStock: true,
  },
  {
    id: "pmt-h01-bk",
    code: "PMT-H01-BK",
    name: "Sudadera Prometeo",
    category: "merch",
    price: 5200,
    description:
      "Sudadera con capucha de algodón orgánico. Símbolo Prometeo bordado en pecho.",
    specs: [
      "80% algodón orgánico, 20% poliéster",
      "Bordado en pecho",
      "Cordón ajustable",
      "Interior perchado suave",
    ],
    variants: ["XS", "S", "M", "L", "XL"],
    defaultVariant: "M",
    inStock: true,
  },
  {
    id: "pmt-n01-bk",
    code: "PMT-N01-BK",
    name: "Cuaderno Prometeo",
    category: "merch",
    price: 1600,
    description:
      "Cuaderno A5 de papel de 120g con cuadrícula. Tapa rígida con el logotipo Prometeo.",
    specs: [
      "Formato A5",
      "Papel 120g cuadrícula",
      "192 páginas",
      "Tapa rígida",
    ],
    variants: null,
    defaultVariant: null,
    inStock: true,
  },
  {
    id: "pmt-p01-bk",
    code: "PMT-P01-BK",
    name: "Sticker Pack",
    category: "merch",
    price: 600,
    description:
      "Pack de 10 stickers con iconografía Prometeo. Vinilo resistente al agua y UV.",
    specs: [
      "10 stickers diferentes",
      "Vinilo resistente al agua",
      "Resistente a UV",
      "Acabado mate",
    ],
    variants: null,
    defaultVariant: null,
    inStock: true,
  },
];

export const CATEGORIES = [
  { id: null, label: "Todos" },
  { id: "guias", label: "Guías" },
  { id: "herramientas", label: "Herramientas" },
  { id: "servicios", label: "Servicios" },
  { id: "digital", label: "Digital" },
  { id: "merch", label: "Merch" },
];

export function formatPrice(amount) {
  return amount.toLocaleString("es-RS") + " RSD";
}

export function getProductById(id) {
  return PRODUCTS.find((p) => p.id === id) ?? null;
}
