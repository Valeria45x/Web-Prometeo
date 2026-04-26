import { COLORS, FONTS } from "../../design/tokens";

const SURFACE_MAP = {
  dark: {
    text: COLORS.textOnDark,
    border: COLORS.grid,
    panel: COLORS.canvasDark,
    panelActive: "#111111",
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
    fontSize: "7px",
    letterSpacing: "0.08em",
    padding: "6px 14px",
  },
  sm: {
    fontSize: "8px",
    letterSpacing: "0.1em",
    padding: "10px 20px",
  },
  md: {
    fontSize: "10px",
    letterSpacing: "0.1em",
    padding: "12px 24px",
  },
  lg: {
    fontSize: "12px",
    letterSpacing: "0.18em",
    padding: "16px 22px",
    minHeight: "60px",
  },
  tab: {
    fontSize: "9px",
    letterSpacing: "0.08em",
    padding: "12px 16px",
  },
};

function joinClassNames(...classNames) {
  return classNames.filter(Boolean).join(" ");
}

function getPalette({ variant, surface, emphasis, active, underline }) {
  const surfaceTokens = SURFACE_MAP[surface] ?? SURFACE_MAP.dark;
  const accentMode = emphasis === "accent";

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
      hoverTranslate: "-2px",
      opacity: 1,
      hoverOpacity: 1,
    };
  }

  if (variant === "outline") {
    const border = accentMode ? COLORS.accent : surfaceTokens.border;
    const color = accentMode ? COLORS.accent : surfaceTokens.text;

    return {
      bg: "transparent",
      border,
      color,
      hoverBg: COLORS.accent,
      hoverBorder: COLORS.accentDeep,
      hoverColor: COLORS.footerText,
      hoverTranslate: "-2px",
      opacity: 1,
      hoverOpacity: 1,
    };
  }

  if (variant === "tab") {
    return {
      bg: active ? surfaceTokens.panelActive : surfaceTokens.panel,
      border: active ? COLORS.accent : surfaceTokens.border,
      color: active ? COLORS.accent : surfaceTokens.text,
      hoverBg: active ? surfaceTokens.panelActive : surfaceTokens.panel,
      hoverBorder: COLORS.accent,
      hoverColor: COLORS.accent,
      hoverTranslate: "0",
      opacity: active ? 1 : surfaceTokens.mutedOpacity,
      hoverOpacity: 1,
    };
  }

  const color = active || accentMode ? COLORS.accent : surfaceTokens.text;
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
        ? COLORS.accent
        : "transparent",
    hoverColor: COLORS.accent,
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
  font = "mono",
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
  const fontFamily = font === "sans" ? FONTS.sans : FONTS.mono;
  const fontWeight =
    weight ??
    (variant === "ghost" || variant === "inline" || variant === "tab"
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
        "--ds-button-font-size": sizeTokens.fontSize,
        "--ds-button-font-weight": fontWeight,
        "--ds-button-letter-spacing": sizeTokens.letterSpacing,
        "--ds-button-hover-translate": palette.hoverTranslate,
        ...style,
      }}
      {...resolvedProps}
    >
      {children}
    </Component>
  );
}
