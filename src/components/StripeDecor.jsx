export default function StripeDecor({ style = {} }) {
  return (
    <div
      style={{
        height: 2,
        width: "100%",
        background:
          "repeating-linear-gradient(90deg, #303030 0, #303030 1px, transparent 1px, transparent 8px)",
        ...style,
      }}
    />
  );
}
