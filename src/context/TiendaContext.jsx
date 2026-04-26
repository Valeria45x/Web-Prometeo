import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getProductById } from "../data/tienda";

const TiendaContext = createContext(null);
const CART_KEY = "prom_cart";
const ORDERS_KEY = "prom_orders";

function loadCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    const value = raw ? JSON.parse(raw) : [];
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch {
    // Storage can be unavailable in private browsing modes.
  }
}

function loadOrders() {
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    const value = raw ? JSON.parse(raw) : [];
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function saveOrders(orders) {
  try {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  } catch {
    // Storage can be unavailable in private browsing modes.
  }
}

export function TiendaProvider({ children }) {
  const [cartItems, setCartItems] = useState(loadCart);
  const [orders, setOrders] = useState(loadOrders);

  useEffect(() => {
    saveCart(cartItems);
  }, [cartItems]);

  useEffect(() => {
    saveOrders(orders);
  }, [orders]);

  const addItem = useCallback((product, quantity = 1, variant = null) => {
    if (!product || quantity <= 0) return;

    setCartItems((items) => {
      const existingIndex = items.findIndex(
        (item) => item.productId === product.id && item.variant === variant,
      );

      if (existingIndex === -1) {
        return [
          ...items,
          {
            productId: product.id,
            variant,
            quantity,
          },
        ];
      }

      return items.map((item, index) =>
        index === existingIndex
          ? { ...item, quantity: item.quantity + quantity }
          : item,
      );
    });
  }, []);

  const removeItem = useCallback((productId, variant = null) => {
    setCartItems((items) =>
      items.filter(
        (item) => item.productId !== productId || item.variant !== variant,
      ),
    );
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const cart = useMemo(
    () =>
      cartItems
        .map((item) => {
          const product = getProductById(item.productId);
          return product ? { ...item, product } : null;
        })
        .filter(Boolean),
    [cartItems],
  );

  const cartCount = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart],
  );

  const cartTotal = useMemo(
    () =>
      cart.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0,
      ),
    [cart],
  );

  const completeCheckout = useCallback((userId = null) => {
    if (cart.length === 0) return null;

    const order = {
      id: `ord_${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: "preparando",
      userId,
      total: cartTotal,
      items: cart.map((item) => ({
        productId: item.productId,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        variant: item.variant,
      })),
    };

    setOrders((currentOrders) => [order, ...currentOrders]);
    setCartItems([]);

    return order;
  }, [cart, cartTotal]);

  const value = useMemo(
    () => ({
      cart,
      cartCount,
      cartTotal,
      orders,
      addItem,
      removeItem,
      clearCart,
      completeCheckout,
    }),
    [
      addItem,
      cart,
      cartCount,
      cartTotal,
      clearCart,
      completeCheckout,
      orders,
      removeItem,
    ],
  );

  return (
    <TiendaContext.Provider value={value}>{children}</TiendaContext.Provider>
  );
}

export function useTienda() {
  const context = useContext(TiendaContext);

  if (!context) {
    throw new Error("useTienda must be used inside TiendaProvider");
  }

  return context;
}
