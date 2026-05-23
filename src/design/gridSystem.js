import { SPACING } from "./tokens";

export const GRID_SYSTEM = {
  source: "AES-256",
  columns: 4,
  template: "repeat(4, minmax(0, 1fr))",
  tabletTemplate: "repeat(2, minmax(0, 1fr))",
  mobileTemplate: "minmax(0, 1fr)",
  gap: 0,
  borderWidth: 1,
  borderColor: "#303030",
  baseUnit: SPACING.s32,
  spacingScale: [
    SPACING.s4,
    SPACING.s8,
    SPACING.s16,
    SPACING.s32,
    SPACING.s64,
    SPACING.s128,
    SPACING.s256,
  ],
  interactive: {
    maxShift: SPACING.s32,
    lerp: 0.08,
    desktopModule: SPACING.s256,
    mobileModule: SPACING.s128,
    desktopHeight: SPACING.s256 * 2,
    mobileHeight: SPACING.s128 + SPACING.s256,
    backgroundModule: SPACING.s64,
    signatureSize: SPACING.s64,
    signatureBar: SPACING.s8,
  },
};

export const GRID_SYSTEM_COPY = {
  code: "GRID-256",
  eyebrow: "AES-256 / GRID SYSTEM",
  title: "El sistema también se mueve.",
  body:
    "La retícula de Prometeo no decora. Ordena, revela y responde sin salir de su escala: cuatro columnas, cero gutter y desplazamientos construidos sobre 32px.",
};
