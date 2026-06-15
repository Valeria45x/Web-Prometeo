import { formatPrice } from "@/data/tienda";

export default function CartModal({
  cart,
  cartTotal,
  checkoutMessage,
  onCheckout,
  onRemove,
  onClear,
  onClose,
}) {
  return (
    <div
      className="shop-modal shop-modal--drawer"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <aside className="shop-cart" aria-label="Carrito">
        <div className="shop-cart__header">
          <div>
            <span className="shop-cart__eyebrow">Tu selección</span>
            <h2>Carrito</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shop-cart__close"
            aria-label="Cerrar carrito"
          >
            ×
          </button>
        </div>

        <div className="shop-cart__items">
          {cart.length === 0 ? (
            <p className="shop-cart__empty">
              El carrito está vacío. Explora la colección y guarda aquí tus
              piezas.
            </p>
          ) : (
            cart.map((item) => (
              <div
                key={`${item.productId}-${item.variant ?? "default"}`}
                className="shop-cart__item"
              >
                <div>
                  <strong>{item.product.name}</strong>
                  <span>
                    {item.quantity} x {formatPrice(item.product.price)}
                    {item.variant ? ` / ${item.variant}` : ""}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onRemove(item.productId, item.variant)}
                  className="shop-cart__remove"
                  aria-label={`Quitar ${item.product.name}`}
                >
                  Quitar
                </button>
              </div>
            ))
          )}
        </div>

        <div className="shop-cart__footer">
          {checkoutMessage && (
            <p className="shop-cart__message">{checkoutMessage}</p>
          )}
          <div className="shop-cart__total">
            <span>Total</span>
            <strong>{formatPrice(cartTotal)}</strong>
          </div>
          <button
            type="button"
            disabled={cart.length === 0}
            onClick={onCheckout}
            className="shop-cart__primary"
          >
            Finalizar pedido
          </button>
          <button
            type="button"
            disabled={cart.length === 0}
            onClick={onClear}
            className="shop-cart__secondary"
          >
            Vaciar carrito
          </button>
        </div>
      </aside>
    </div>
  );
}
