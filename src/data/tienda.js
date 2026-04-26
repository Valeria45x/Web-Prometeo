export const PRODUCTS = [
  {
    id: "pmt-g01-bk",
    code: "PMT-G01-BK",
    name: "Guia de Privacidad Digital",
    category: "guias",
    price: 3200,
    description:
      "Guia completa de privacidad digital en formato impreso. Metodologia Prometeo aplicada paso a paso.",
    specs: [
      "200 paginas impresas",
      "Metodologia Prometeo completa",
      "Hoja de ejercicios incluida",
      "Edicion limitada numerada",
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
      "USB con seleccion curada de herramientas de privacidad y seguridad. Preconfigurado y listo para usar.",
    specs: [
      "USB 3.0 - 64 GB",
      "Herramientas preconfiguradas",
      "Guia de inicio incluida",
      "Actualizaciones de por vida",
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
      "Camiseta de algodon pesado con el simbolo Prometeo. Corte unisex, lavado a 30 grados.",
    specs: [
      "100% algodon 220g",
      "Serigrafia de alta durabilidad",
      "Corte unisex",
      "Edicion limitada",
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
      "Sudadera con capucha de algodon organico. Simbolo Prometeo bordado en pecho.",
    specs: [
      "80% algodon organico, 20% poliester",
      "Bordado en pecho",
      "Cordon ajustable",
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
      "Cuaderno A5 de papel de 120g con cuadricula. Tapa rigida con el logotipo Prometeo.",
    specs: [
      "Formato A5",
      "Papel 120g cuadricula",
      "192 paginas",
      "Tapa rigida",
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
      "Pack de 10 stickers con iconografia Prometeo. Vinilo resistente al agua y UV.",
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
  { id: "guias", label: "Guias" },
  { id: "herramientas", label: "Herramientas" },
  { id: "merch", label: "Merch" },
];

export function formatPrice(amount) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  }).format(amount / 100);
}

export function getProductById(id) {
  return PRODUCTS.find((p) => p.id === id) ?? null;
}
