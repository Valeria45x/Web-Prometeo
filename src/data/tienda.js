import jerseyBlanco from "@/assets/products/jersey-blanco.jpg";
import jerseyNegro from "@/assets/products/jersey-negro.jpg";
import jerseyRojo from "@/assets/products/jersey-rojo.jpg";
import jerseyModelo from "@/assets/products/jersey-modelo.jpg";
import bermudaBlanco from "@/assets/products/bermuda-blanco.jpg";
import bermudaNegro from "@/assets/products/bermuda-negro.jpg";
import camisaBlanco from "@/assets/products/camisa-blanco.jpg";
import camisaNegro from "@/assets/products/camisa-negro.jpg";
import camisaModelo from "@/assets/products/camisa-modelo.jpg";

export const DROP_NAME = "Serie 001";

export const PRODUCTS = [
  {
    id: "pmt-j01",
    code: "PMT-J01",
    name: "Jersey",
    category: "merch",
    price: 4200,
    description:
      "Jersey polo de punto con identidad gráfica Prometeo. Disponible en blanco, negro y rojo.",
    specs: [
      "Punto de algodón premium",
      "Bordado Prometeo al pecho",
      "Corte unisex",
      "Edición limitada",
    ],
    images: [jerseyBlanco, jerseyNegro, jerseyRojo, jerseyModelo],
    variants: ["XS", "S", "M", "L", "XL", "XXL"],
    defaultVariant: "M",
    inStock: true,
  },
  {
    id: "pmt-c01-usb",
    code: "PMT-C01-USB",
    name: "USB",
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
    images: [],
    variants: null,
    defaultVariant: null,
    inStock: true,
  },
  {
    id: "pmt-b01",
    code: "PMT-B01",
    name: "Bermuda",
    category: "merch",
    price: 3400,
    description:
      "Bermuda de tejido ligero con detalle Prometeo. Disponible en blanco y negro.",
    specs: [
      "Tejido ligero transpirable",
      "Detalle bordado lateral",
      "Corte unisex",
      "Edición limitada",
    ],
    images: [bermudaBlanco, bermudaNegro],
    variants: ["XS", "S", "M", "L", "XL", "XXL"],
    defaultVariant: "M",
    inStock: true,
  },
  {
    id: "pmt-t01-bk",
    code: "PMT-T01-BK",
    name: "Camisa",
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
    images: [camisaBlanco, camisaNegro, camisaModelo],
    variants: ["XS", "S", "M", "L", "XL", "XXL"],
    defaultVariant: "M",
    inStock: true,
  },
];

export const CATEGORIES = [
  { id: null, label: "Todos" },
  { id: "merch", label: DROP_NAME },
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
