import { getPrometeoCtaButtonTokens } from "../../design/prometeoSystem";
import { typeStyle } from "../../design/typography";

function joinClassNames(...classNames) {
  return classNames.filter(Boolean).join(" ");
}

function SplitCtaArrow({ size }) {
  return (
    <svg
      className="ds-split-cta__arrow"
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3.5 10h11" />
      <path d="M10.5 4.5 16 10l-5.5 5.5" />
    </svg>
  );
}

export default function SplitCtaButton({
  as: Component = "button",
  label,
  color,
  iconBg,
  icon,
  fullWidth = false,
  className = "",
  style = {},
  ...props
}) {
  const tokens = getPrometeoCtaButtonTokens();
  const copyStyle = typeStyle("titleSm", {
    fontSize: tokens.fontSize,
    lineHeight: tokens.lineHeight,
    fontWeight: tokens.fontWeight,
  });
  const resolvedProps =
    Component === "button" && props.type === undefined
      ? { type: "button", ...props }
      : props;

  return (
    <Component
      className={joinClassNames(
        "ds-split-cta",
        fullWidth && "ds-split-cta--full",
        className,
      )}
      style={{
        "--ds-split-cta-border": color,
        "--ds-split-cta-color": color,
        "--ds-split-cta-min-height": `${tokens.minHeight}px`,
        "--ds-split-cta-icon-size": `${tokens.iconSize}px`,
        "--ds-split-cta-copy-padding": tokens.copyPadding,
        "--ds-split-cta-arrow-size": `${tokens.arrowSize}px`,
        "--ds-split-cta-transition": tokens.transition,
        "--ds-split-cta-icon-bg": iconBg,
        ...style,
      }}
      {...resolvedProps}
    >
      <span className="ds-split-cta__copy" style={copyStyle}>
        <span className="ds-split-cta__copy-text">{label}</span>
      </span>

      <span className="ds-split-cta__icon" aria-hidden="true">
        {icon ?? <SplitCtaArrow size={tokens.arrowSize} />}
      </span>
    </Component>
  );
}