import LandingFooter from "@/features/landing/footer/LandingFooter";

export default function Footer({
  variant = "default",
  mobileReveal = false,
  light = true,
  mobileFlow = false,
  compact,
}) {
  if (variant === "none") return null;

  return (
    <LandingFooter
      light={light}
      mobileFlow={mobileFlow}
      mobileReveal={mobileReveal}
      compact={compact ?? (mobileFlow || mobileReveal)}
    />
  );
}
