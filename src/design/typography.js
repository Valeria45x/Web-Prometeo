import { FONTS } from "./tokens";

const FAMILY = {
  sans: FONTS.sans,
  display: FONTS.display,
  mono: FONTS.mono,
};

export const TYPE_ROLES = {
  displayXl: {
    fontFamily: FAMILY.display,
    fontSize: "var(--type-display-xl-size)",
    lineHeight: "var(--type-display-xl-line)",
    fontWeight: 900,
    letterSpacing: 0,
    textWrap: "balance",
  },
  displayLg: {
    fontFamily: FAMILY.display,
    fontSize: "var(--type-display-lg-size)",
    lineHeight: "var(--type-display-lg-line)",
    fontWeight: 900,
    letterSpacing: 0,
    textWrap: "balance",
  },
  displayMd: {
    fontFamily: FAMILY.sans,
    fontSize: "var(--type-display-md-size)",
    lineHeight: "var(--type-display-md-line)",
    fontWeight: 900,
    letterSpacing: 0,
    textWrap: "balance",
  },
  displaySm: {
    fontFamily: FAMILY.display,
    fontSize: "var(--type-display-sm-size)",
    lineHeight: "var(--type-display-sm-line)",
    fontWeight: 900,
    letterSpacing: 0,
    textWrap: "balance",
  },
  titleMd: {
    fontFamily: FAMILY.sans,
    fontSize: "var(--type-title-md-size)",
    lineHeight: "var(--type-title-md-line)",
    fontWeight: 900,
    letterSpacing: 0,
  },
  titleSm: {
    fontFamily: FAMILY.sans,
    fontSize: "var(--type-title-sm-size)",
    lineHeight: "var(--type-title-sm-line)",
    fontWeight: 800,
    letterSpacing: 0,
  },
  eyebrow: {
    fontFamily: FAMILY.sans,
    fontSize: "var(--type-body-size)",
    lineHeight: "var(--type-body-line)",
    fontWeight: 700,
    letterSpacing: 0,
  },
  body: {
    fontFamily: FAMILY.sans,
    fontSize: "var(--type-body-size)",
    lineHeight: "var(--type-body-line)",
    fontWeight: 400,
    letterSpacing: 0,
  },
  bodyStrong: {
    fontFamily: FAMILY.sans,
    fontSize: "var(--type-body-size)",
    lineHeight: "var(--type-body-line)",
    fontWeight: 700,
    letterSpacing: 0,
  },
  bodySm: {
    fontFamily: FAMILY.sans,
    fontSize: "var(--type-body-sm-size)",
    lineHeight: "var(--type-body-sm-line)",
    fontWeight: 400,
    letterSpacing: 0,
  },
  caption: {
    fontFamily: FAMILY.sans,
    fontSize: "var(--type-caption-size)",
    lineHeight: "var(--type-caption-line)",
    fontWeight: 400,
    letterSpacing: 0,
  },
  meta: {
    fontFamily: FAMILY.mono,
    fontSize: "var(--type-meta-size)",
    lineHeight: "var(--type-meta-line)",
    fontWeight: 400,
    letterSpacing: "0.08em",
  },
  metaStrong: {
    fontFamily: FAMILY.mono,
    fontSize: "var(--type-meta-size)",
    lineHeight: "var(--type-meta-line)",
    fontWeight: 700,
    letterSpacing: "0.1em",
  },
  label: {
    fontFamily: FAMILY.mono,
    fontSize: "var(--type-label-size)",
    lineHeight: "var(--type-label-line)",
    fontWeight: 700,
    letterSpacing: "0.1em",
  },
  transitionLabel: {
    fontFamily: '"JetBrains Mono", monospace',
    fontSize: "var(--type-transition-label-size)",
    lineHeight: "var(--type-transition-label-line)",
    fontWeight: 400,
    letterSpacing: "0.08em",
  },
};

export function typeStyle(role, overrides = {}) {
  return {
    ...(TYPE_ROLES[role] ?? TYPE_ROLES.body),
    ...overrides,
  };
}
