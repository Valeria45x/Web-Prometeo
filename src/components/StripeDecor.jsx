export default function StripeDecor({ style = {} }) {
  return (
    <div
      style={{
        width: "100%",
        height: 4,
        background:
          "repeating-linear-gradient(90deg, #d9d9d6 0, #d9d9d6 1px, transparent 1px, transparent 8px)",
        ...style,
      }}
    />
  );
}
