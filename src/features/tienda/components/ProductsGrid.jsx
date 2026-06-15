import ProductCard from "@/features/tienda/components/ProductCard";

export default function ProductsGrid({ products }) {
  if (products.length === 0) {
    return (
      <div className="shop-grid--empty">Sin productos en esta categoría.</div>
    );
  }

  return (
    <div className="shop-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
