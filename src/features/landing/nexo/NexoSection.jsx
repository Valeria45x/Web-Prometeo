import { TH } from "@/constants";
import { COLORS } from "@/design/tokens";
import {
  EASE,
  DARK_GRID,
  LIGHT_GRID,
  PAGE_LIGHT_BG,
} from "@/features/landing/shared/theme";
import NexoHeading from "@/features/landing/nexo/NexoHeading";
import { NEXO_COPY } from "@/features/landing/nexo/nexo.content";
import { useNexoProgress } from "@/features/landing/nexo/useNexoProgress";
import { useReveal } from "@/hooks/useReveal";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function NexoSection({ light, setLight }) {
  const [rA, sA] = useReveal(0, false);
  const [rB, sB] = useReveal(160, false);
  const isPhoneLayout = useMediaQuery("(max-width: 767px)");
  const isTabletLayout = useMediaQuery(
    "(min-width: 768px) and (max-width: 1024px)",
  );
  const isCompactLayout = isPhoneLayout || isTabletLayout;
  const { wrapperRef, progress, scrollDistance } = useNexoProgress({
    isPhoneLayout,
    isTabletLayout,
    setLight,
  });

  const titleColor = light ? "#050505" : "#fcfcfc";
  const bd = light ? LIGHT_GRID : DARK_GRID;
  const CT = `background ${EASE}`;
  const headingSize = isPhoneLayout ? 28 : isTabletLayout ? 40 : 48;
  const headingLine = isPhoneLayout ? "32px" : isTabletLayout ? "44px" : "56px";
  const sectionPadding = isPhoneLayout
    ? "32px 16px"
    : isTabletLayout
      ? "48px 24px"
      : "64px";

  const rp = Math.max(0, Math.min(1, (progress - 0.05) / 0.95));
  const rightStyle = {
    opacity: rp,
    transform: `translateY(${(1 - rp) * 32}px)`,
  };

  return (
    <div
      ref={wrapperRef}
      style={{
        height: `calc(100svh - ${TH}px + ${scrollDistance}px)`,
        borderTop: bd,
      }}
    >
      <section
        id="nexo"
        style={{
          position: "sticky",
          top: TH,
          height: `calc(100svh - ${TH}px)`,
          background: light ? PAGE_LIGHT_BG : "#050505",
          display: "grid",
          gridTemplateRows: "1fr 1fr",
          alignItems: "stretch",
          overflow: "hidden",
          transition: CT,
        }}
      >
        <div
          style={{
            borderBottom: bd,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: sectionPadding,
            transition: CT,
          }}
        >
          <div ref={rA} style={sA}>
            <div style={{ opacity: 1 - rp * 0.65 }}>
              <NexoHeading
                isMobileLayout={isCompactLayout}
                titleColor={titleColor}
                headingSize={headingSize}
                headingLine={headingLine}
                mobileText={NEXO_COPY.first.mobile}
                desktopLines={NEXO_COPY.first.desktop}
              />
            </div>
          </div>
        </div>

        <div
          style={{
            ...rightStyle,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: sectionPadding,
            transition: `opacity ${EASE}, transform ${EASE}`,
          }}
        >
          <div ref={rB} style={sB}>
            <NexoHeading
              isMobileLayout={isCompactLayout}
              titleColor={titleColor}
              headingSize={headingSize}
              headingLine={headingLine}
              mobileText={NEXO_COPY.second.mobilePrefix}
              desktopLines={NEXO_COPY.second.desktopPrefix}
              accentText={NEXO_COPY.second.accent}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
