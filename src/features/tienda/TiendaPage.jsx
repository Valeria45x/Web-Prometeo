import { useMemo, useRef, useState } from "react";
import { Page } from "@/shared/layout/Page";
import AuthModal from "@/features/comunidad/components/AuthModal";
import LandingTransitionSection from "@/features/landing/transition/LandingTransitionSection";
import { PRODUCTS } from "@/data/tienda";
import { useComunidad } from "@/context/ComunidadContext";
import { useTienda } from "@/context/TiendaContext";
import { useScrollTextReveal } from "@/hooks/useScrollTextReveal";
import ShopHero from "@/features/tienda/components/ShopHero";
import FilterBar from "@/features/tienda/components/FilterBar";
import ProductsGrid from "@/features/tienda/components/ProductsGrid";
import CartModal from "@/features/tienda/components/CartModal";
import ComingSoonModal from "@/features/tienda/components/ComingSoonModal";
import "@/features/landing/shared/scrollTextReveal.css";
import "@/features/tienda/tienda.css";

export default function TiendaPage() {
  const pageRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [checkoutMessage, setCheckoutMessage] = useState("");
  const { currentUser, showAuthModal, setShowAuthModal } = useComunidad();
  const {
    cart,
    cartCount,
    cartTotal,
    removeItem,
    clearCart,
    completeCheckout,
  } = useTienda();

  useScrollTextReveal(pageRef);

  const filtered = useMemo(() => {
    if (!activeCategory) return PRODUCTS;
    return PRODUCTS.filter((product) => product.category === activeCategory);
  }, [activeCategory]);

  function handleCategoryChange(categoryId) {
    if (categoryId === "serie-002") {
      setShowComingSoon(true);
      return;
    }
    setActiveCategory(categoryId);
  }

  return (
    <Page light>
      <div ref={pageRef} className="shop-page">
        <ShopHero
          cartCount={cartCount}
          cartTotal={cartTotal}
          currentUser={currentUser}
          onOpenCart={() => setShowCart(true)}
        />
        <div className="shop-transition">
          <LandingTransitionSection light title="La colección" column={2} />
        </div>
        <FilterBar
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
          count={filtered.length}
        />
        <ProductsGrid products={filtered} />
      </div>

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
      {showCart && (
        <CartModal
          cart={cart}
          cartTotal={cartTotal}
          checkoutMessage={checkoutMessage}
          onCheckout={() => {
            const order = completeCheckout(currentUser?.id ?? null);
            if (order) {
              setCheckoutMessage(
                "Pedido preparado. Te contactaremos para finalizar el pago.",
              );
            }
          }}
          onRemove={removeItem}
          onClear={() => {
            clearCart();
            setCheckoutMessage("");
          }}
          onClose={() => {
            setShowCart(false);
            setCheckoutMessage("");
          }}
        />
      )}
      {showComingSoon && (
        <ComingSoonModal onClose={() => setShowComingSoon(false)} />
      )}
    </Page>
  );
}
