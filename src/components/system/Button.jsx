import { COLORS, FONTS } from "../../design/tokens";
import { typeStyle } from "../../design/typography";

const SURFACE_MAP = {
  dark: {
    text: COLORS.textOnDark,
    border: COLORS.grid,
    panel: COLORS.canvasDark,
    panelActive: "#050505",
    mutedOpacity: 0.4,
    fillText: COLORS.canvasDark,
  },
  light: {
    text: COLORS.textOnLight,
    border: COLORS.textOnLight,
    panel: COLORS.pageLight,
    panelActive: COLORS.canvasLight,
    mutedOpacity: 0.45,
    fillText: COLORS.canvasLight,
  },
};

const SIZE_MAP = {
  xs: {
    role: "meta",
    padding: "8px 16px",
  },
  sm: {
    role: "metaStrong",
    padding: "8px 16px",
  },
  md: {
    role: "metaStrong",
    padding: "16px 32px",
  },
  lg: {
    role: "bodyStrong",
    letterSpacing: "0.18em",
    padding: "16px 32px",
    minHeight: "64px",
  },
  tab: {
    role: "meta",
    padding: "16px",
  },
};

function joinClassNames(...classNames) {
  return classNames.filter(Boolean).join(" ");
}

function getPalette({ variant, surface, emphasis, active, underline }) {
  const surfaceTokens = SURFACE_MAP[surface] ?? SURFACE_MAP.dark;
  const accentMode = emphasis === "accent";
  const readableAccent =
    surface === "light" ? COLORS.textOnLight : COLORS.accent;

  if (variant === "primary") {
    const fill = accentMode ? COLORS.accent : surfaceTokens.text;
    const text = accentMode ? COLORS.footerText : surfaceTokens.fillText;

    return {
      bg: fill,
      border: fill,
      color: text,
      hoverBg: fill,
      hoverBorder: accentMode ? COLORS.footerText : fill,
      hoverColor: text,
      hoverTranslate: "-4px",
      opacity: 1,
      hoverOpacity: 1,
    };
  }

  if (variant === "outline") {
    const border = accentMode ? COLORS.accent : surfaceTokens.border;
    const color = accentMode ? readableAccent : surfaceTokens.text;

    return {
      bg: "transparent",
      border,
      color,
      hoverBg: COLORS.accent,
      hoverBorder: COLORS.textOnAccent,
      hoverColor: COLORS.footerText,
      hoverTranslate: "-4px",
      opacity: 1,
      hoverOpacity: 1,
    };
  }

  if (variant === "tab") {
    return {
      bg: active ? surfaceTokens.panelActive : surfaceTokens.panel,
      border: active ? COLORS.accent : surfaceTokens.border,
      color: active ? readableAccent : surfaceTokens.text,
      hoverBg: active ? surfaceTokens.panelActive : surfaceTokens.panel,
      hoverBorder: COLORS.accent,
      hoverColor: readableAccent,
      hoverTranslate: "0",
      opacity: active ? 1 : surfaceTokens.mutedOpacity,
      hoverOpacity: 1,
    };
  }

  if (variant === "navigation") {
    const hoverBg = surface === "light" ? COLORS.grayDark : COLORS.grayWhite;
    const hoverColor =
      surface === "light" ? COLORS.textOnDark : COLORS.textOnLight;

    return {
      bg: "transparent",
      border: "transparent",
      color: active ? COLORS.accent : surfaceTokens.text,
      hoverBg: active ? "transparent" : hoverBg,
      hoverBorder: "var(--ds-button-border)",
      hoverColor: active ? COLORS.accent : hoverColor,
      hoverTranslate: "0",
      opacity: 1,
      hoverOpacity: 1,
    };
  }

  const color = active || accentMode ? readableAccent : surfaceTokens.text;
  const underlineColor =
    underline === "always"
      ? color
      : underline === "active" && active
        ? color
        : "transparent";

  return {
    bg: "transparent",
    border: variant === "inline" ? underlineColor : "transparent",
    color,
    hoverBg: "transparent",
    hoverBorder:
      variant === "inline" && underline !== "none"
        ? readableAccent
        : "transparent",
    hoverColor: readableAccent,
    hoverTranslate: "0",
    opacity: active || accentMode ? 1 : surfaceTokens.mutedOpacity,
    hoverOpacity: 1,
  };
}

export default function Button({
  as: Component = "button",
  variant = "primary",
  surface = "dark",
  emphasis = "accent",
  size = "md",
  font,
  weight,
  active = false,
  underline = variant === "inline" ? "active" : "none",
  fullWidth = false,
  align = "center",
  className = "",
  style = {},
  children,
  ...props
}) {
  const palette = getPalette({ variant, surface, emphasis, active, underline });
  const sizeTokens = SIZE_MAP[size] ?? SIZE_MAP.md;
  const typeTokens = typeStyle(
    variant === "navigation" ? "titleSm" : (sizeTokens.role ?? "metaStrong"),
  );
  const fontFamily =
    font === "sans"
      ? FONTS.sans
      : font === "mono"
        ? FONTS.mono
        : variant === "navigation"
          ? FONTS.sans
          : FONTS.mono;
  const fontWeight =
    weight ??
    (variant === "navigation"
      ? 800
      : variant === "ghost" || variant === "inline" || variant === "tab"
        ? active
          ? 700
          : 400
        : 700);

  const resolvedProps =
    Component === "button" && props.type === undefined
      ? { type: "button", ...props }
      : props;

  return (
    <Component
      className={joinClassNames(
        "ds-button",
        `ds-button--${variant}`,
        fullWidth && "ds-button--full",
        align === "start" && "ds-button--start",
        className,
      )}
      data-active={active ? "true" : undefined}
      style={{
        "--ds-button-bg": palette.bg,
        "--ds-button-border": palette.border,
        "--ds-button-color": palette.color,
        "--ds-button-hover-bg": palette.hoverBg,
        "--ds-button-hover-border": palette.hoverBorder,
        "--ds-button-hover-color": palette.hoverColor,
        "--ds-button-opacity": palette.opacity,
        "--ds-button-hover-opacity": palette.hoverOpacity,
        "--ds-button-padding": sizeTokens.padding,
        "--ds-button-min-height": sizeTokens.minHeight ?? "auto",
        "--ds-button-font-family": fontFamily,
        "--ds-button-font-size": typeTokens.fontSize,
        "--ds-button-line-height": typeTokens.lineHeight,
        "--ds-button-font-weight": fontWeight,
        "--ds-button-letter-spacing":
          sizeTokens.letterSpacing ?? typeTokens.letterSpacing,
        "--ds-button-hover-translate": palette.hoverTranslate,
        ...style,
      }}
      {...resolvedProps}
    >
      {children}
    </Component>
  );
}
