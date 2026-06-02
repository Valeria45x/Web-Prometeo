import { COLORS } from "../../design/tokens";
import { typeStyle } from "../../design/typography";

const SURFACE_MAP = {
  light: {
    muted: COLORS.textMutedLight,
    text: COLORS.textOnLight,
  },
  dark: {
    muted: COLORS.textMutedDark,
    text: COLORS.textOnDark,
  },
  accent: {
    muted: COLORS.textOnAccent,
    text: COLORS.textOnAccent,
  },
};

export default function Label({
  as: Component = "span",
  surface = "light",
  tone = "muted",
  color,
  style = {},
  children,
  ...props
}) {
  const surfaceTokens = SURFACE_MAP[surface] ?? SURFACE_MAP.light;
  const resolvedColor =
    color ??
    (tone === "accent"
      ? COLORS.accent
      : tone === "text"
        ? surfaceTokens.text
        : surfaceTokens.muted);

  return (
    <Component
      style={{
        ...typeStyle("eyebrow"),
        color: resolvedColor,
        ...style,
      }}
      {...props}
    >
      {children}
    </Component>
  );
}