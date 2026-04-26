export const PRODUCTS = [
  {
    id: "pmt-t01-bk",
    code: "PMT-T01-BK",
    name: "Camisa Prometeo 001",
    category: "merch",
    price: 3200,
    description:
      "Camisa unisex de algodón pesado con identidad gráfica Prometeo. Diseñada para uso diario.",
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
    id: "pmt-g01-mc",
    code: "PMT-G01-MC",
    name: "Gorro Prometeo 001",
    category: "merch",
    price: 2400,
    description:
      "Gorro tejido de invierno con etiqueta Prometeo bordada al frente.",
    specs: [
      "Acrílico premium",
      "Bordado frontal",
      "Ajuste elástico",
      "Talla única",
    ],
    variants: null,
    defaultVariant: null,
    inStock: true,
  },
  {
    id: "pmt-b01-tb",
    code: "PMT-B01-TB",
    name: "Totebag Prometeo 001",
    category: "merch",
    price: 1800,
    description:
      "Bolsa de lona reforzada para uso diario con impresión Prometeo en alta definición.",
    specs: [
      "Lona de algodón",
      "Asas largas reforzadas",
      "Impresión frontal",
      "Capacidad 12L",
    ],
    variants: null,
    defaultVariant: null,
    inStock: true,
  },
  {
    id: "pmt-p01-bk",
    code: "PMT-P01-BK",
    name: "Pegatinas Prometeo 001",
    category: "merch",
    price: 800,
    description:
      "Pack de pegatinas con iconografía Prometeo para portátil, libreta o móvil.",
    specs: [
      "12 diseños diferentes",
      "Vinilo resistente al agua",
      "Resistente a UV",
      "Acabado mate",
    ],
    variants: null,
    defaultVariant: null,
    inStock: true,
  },
  {
    id: "pmt-c01-usb",
    code: "PMT-C01-USB",
    name: "Collar Usb Prometeo 001",
    category: "merch",
    price: 2600,
    description:
      "Collar porta-USB con memoria extraíble para llevar herramientas esenciales contigo.",
    specs: [
      "USB 3.0 de 32GB",
      "Cadena metálica ajustable",
      "Cuerpo aluminio anodizado",
      "Funda de protección incluida",
    ],
    variants: null,
    defaultVariant: null,
    inStock: true,
  },
];

export const CATEGORIES = [
  { id: null, label: "Todos" },
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
