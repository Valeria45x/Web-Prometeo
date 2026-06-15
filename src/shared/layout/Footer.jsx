import SiteFooter from "@/shared/layout/SiteFooter";

export default function Footer({
  variant = "default",
  mobileReveal = false,
  light = true,
  mobileFlow = false,
  compact,
}) {
  if (variant === "none") return null;

  return (
    <SiteFooter
      light={light}
      mobileFlow={mobileFlow}
      mobileReveal={mobileReveal}
      compact={compact ?? (mobileFlow || mobileReveal)}
    />
  );
}
