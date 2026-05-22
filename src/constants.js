import { BORDERS, LAYOUT } from "./design/tokens";

export const B = BORDERS.dark;
export const TH = LAYOUT.topbarHeight;

export const NAV = [
  {
    label: "Para ti",
    items: [
      { label: "Vista general", to: "/para-ti", description: "Por dónde empezar" },
      { label: "Artículos", to: "/articulos", description: "Aprende sobre privacidad digital" },
      { label: "Comunidad", to: "/comunidad", description: "Comparte y habla con otros" },
      { label: "Tienda", to: "/tienda", description: "Lleva la privacidad al día a día" },
    ],
  },
  {
    label: "Para empresas",
    items: [
      { label: "Vista general", to: "/empresas", description: "Confianza que se ve" },
      { label: "Certificación", to: "/certificacion", description: "Demuestra tu compromiso" },
      { label: "Contacto", to: "/contacto", description: "Habla con el equipo" },
    ],
  },
];
