import { LAYOUT } from "../design/tokens";

export default function Frame({ children, style = {} }) {
  return (
    <div
      style={{
        maxWidth: LAYOUT.frameWidth,
        margin: "0 auto",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
