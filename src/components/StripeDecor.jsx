export default function StripeDecor({ style = {} }) {
  return (
    <div
      style={{
        width: "100%",
        height: 4,
        background:
          "repeating-linear-gradient(90deg, #380615 0, #380615 1px, transparent 1px, transparent 8px)",
        ...style,
      }}
    />
  );
}
