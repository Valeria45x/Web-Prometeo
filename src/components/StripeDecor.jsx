export default function StripeDecor({ style = {} }) {
  return (
    <div
      style={{
        width: "100%",
        height: 2,
        background:
          "repeating-linear-gradient(90deg, #303030 0, #303030 1px, transparent 1px, transparent 8px)",
        ...style,
      }}
    />
  );
}
