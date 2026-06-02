import { COLORS } from "../../design/tokens";
import Button from "./Button";

function joinClassNames(...classNames) {
  return classNames.filter(Boolean).join(" ");
}

export default function NavigationButton({
  as: Component = "button",
  label,
  description,
  surface = "light",
  active = false,
  fullWidth = true,
  align = "start",
  className = "",
  contentClassName = "",
  titleClassName = "",
  descriptionClassName = "",
  style = {},
  contentStyle = {},
  titleStyle = {},
  descriptionStyle = {},
  ...props
}) {
  const hoverText = surface === "light" ? COLORS.textOnDark : COLORS.textOnLight;
  const mutedText =
    surface === "light" ? COLORS.textMutedLight : COLORS.textMutedDark;

  return (
    <Button
      as={Component}
      variant="navigation"
      surface={surface}
      active={active}
      fullWidth={fullWidth}
      align={align}
      className={joinClassNames(
        "ds-navigation-button",
        description && "ds-navigation-button--stacked",
        className,
      )}
      style={{
        "--ds-navigation-description-color": active
          ? COLORS.accent
          : mutedText,
        "--ds-navigation-description-hover-color": active
          ? COLORS.accent
          : hoverText,
        ...style,
      }}
      {...props}
    >
      <span
        className={joinClassNames(
          "ds-navigation-button__content",
          contentClassName,
        )}
        style={contentStyle}
      >
        <span
          className={joinClassNames(
            "ds-navigation-button__title",
            titleClassName,
          )}
          style={titleStyle}
        >
          {label}
        </span>
        {description ? (
          <span
            className={joinClassNames(
              "ds-navigation-button__description",
              descriptionClassName,
            )}
            style={descriptionStyle}
          >
            {description}
          </span>
        ) : null}
      </span>
    </Button>
  );
}