import { COLORS } from "../design/tokens";

export default function StripeDecor({ style = {} }) {
  return (
    <div
      style={{
        width: "100%",
        height: 4,
        background:
          `repeating-linear-gradient(90deg, ${COLORS.grid} 0, ${COLORS.grid} 1px, transparent 1px, transparent 8px)`,
        ...style,
      }}
    />
  );
}
