import { TH } from "../../../constants";
import { COLORS } from "../../../design/tokens";
import { EASE, DARK_GRID, LIGHT_GRID, PAGE_LIGHT_BG } from "../shared/theme";
import NexoHeading from "./NexoHeading";
import { NEXO_COPY } from "./nexo.content";
import { useNexoProgress } from "./useNexoProgress";
import { useReveal } from "../../../hooks/useReveal";
import { useMediaQuery } from "../../../hooks/useMediaQuery";

export default function NexoSection({ light, setLight }) {
  const [rA, sA] = useReveal(0, false);
  const [rB, sB] = useReveal(160, false);
  const isMobileLayout = useMediaQuery("(max-width: 767px)");
  const { wrapperRef, progress, scrollDistance } = useNexoProgress({
    isMobileLayout,
    setLight,
  });

  const titleColor = light ? "#050505" : "#fcfcfc";
  const bd = light ? LIGHT_GRID : DARK_GRID;
  const CT = `background ${EASE}`;
  const headingSize = isMobileLayout ? 28 : 48;
  const headingLine = isMobileLayout ? "32px" : "56px";

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
            padding: isMobileLayout ? "32px 16px" : "64px",
            transition: CT,
          }}
        >
          <div ref={rA} style={sA}>
            <div style={{ opacity: 1 - rp * 0.65 }}>
              <NexoHeading
                isMobileLayout={isMobileLayout}
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
            padding: isMobileLayout ? "32px 16px" : "64px",
            transition: `opacity ${EASE}, transform ${EASE}`,
          }}
        >
          <div ref={rB} style={sB}>
            <NexoHeading
              isMobileLayout={isMobileLayout}
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
