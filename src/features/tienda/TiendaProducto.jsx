import { useParams, Link } from "react-router-dom";
import { Page } from "@/shared/layout/Page";
import { COLORS } from "@/design/tokens";
import { getProductById } from "@/data/tienda";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { S, bd, mono } from "@/features/tienda/productDetail.styles";
import ProductBackBar from "@/features/tienda/components/ProductBackBar";
import ProductImageViewer from "@/features/tienda/components/ProductImageViewer";
import ProductInfo from "@/features/tienda/components/ProductInfo";

export default function TiendaProducto() {
  const { id } = useParams();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const product = getProductById(id);

  if (!product) {
    return (
      <Page light>
        <div
          style={{
            padding: "80px 48px",
            ...mono,
            fontSize: 11,
            letterSpacing: "0.08em",
            color: S.muted,
          }}
        >
          Producto no encontrado.{" "}
          <Link
            to="/tienda"
            style={{ color: COLORS.textOnLight, textDecoration: "underline" }}
          >
            Volver a la tienda →
          </Link>
        </div>
      </Page>
    );
  }

  return (
    <Page light>
      <ProductBackBar />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "minmax(0, 1fr)" : "3fr 2fr",
          minHeight: isMobile ? "auto" : "calc(100vh - 52px - 44px)",
          borderBottom: bd,
          background: S.bg,
        }}
      >
        <ProductImageViewer />
        <ProductInfo product={product} />
      </div>
    </Page>
  );
}
