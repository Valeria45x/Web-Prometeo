import { B } from "../constants";
import Topbar from "./Topbar";
import Footer from "./Footer";

export function Page({ children, light = false, footerVariant = "default" }) {
  return (
    <div
      style={{ minHeight: "100vh", background: light ? "#FFFFFF" : "#0a0a0a" }}
    >
      <div
        style={{
          maxWidth: "min(1600px, 92vw)",
          margin: "0 auto",
          borderLeft: B,
          borderRight: B,
          background: light ? "#FFFFFF" : "#0a0a0a",
          minHeight: "100vh",
        }}
      >
        <Topbar light={light} />
        {children}
        <Footer variant={footerVariant} />
      </div>
    </div>
  );
}

export function PageHeader({ index, title }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        borderLeft: B,
        height: "36vh",
      }}
    >
      <div
        style={{
          borderRight: B,
          borderBottom: B,
          display: "flex",
          alignItems: "flex-end",
          padding: "28px 24px",
        }}
      >
        <span className="small-label" style={{ color: "#333" }}>
          {index}
        </span>
      </div>
      <div
        style={{
          gridColumn: "span 3",
          borderRight: B,
          borderBottom: B,
          display: "flex",
          alignItems: "flex-end",
          padding: "44px 36px",
        }}
      >
        <h1 className="section-title" style={{ color: "#e0e0e0" }}>
          {title}
        </h1>
      </div>
    </div>
  );
}
