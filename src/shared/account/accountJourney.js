export const ACCOUNT_JOURNEY = {
  brand: "Cuenta Prometeo",
  navLabel: "Cuenta",
  guestCta: "Entrar o crear cuenta",
  profileCta: "Ver cuenta",
  logoutCta: "Cerrar sesión",
  auth: {
    registerTab: "Crear cuenta",
    accessTab: "Acceder",
    registerIntro:
      "Crea una Cuenta Prometeo para usar comunidad, artículos, tienda y perfil desde un único lugar.",
    accessIntro:
      "Selecciona una cuenta existente para continuar desde el mismo perfil Prometeo.",
    confirmIntro:
      "En un sistema real recibirías un enlace por email. Aquí puedes confirmar directamente para ver el flujo completo.",
  },
  contexts: {
    profile: {
      guest:
        "Accede para gestionar identidad, comunidad, lectura, pedidos y preferencias desde un único panel.",
    },
    community: {
      guest:
        "Tu Cuenta Prometeo te permite abrir hilos, seguir conversaciones y responder sin crear otro perfil.",
      guestCta: "Entrar para participar",
      primaryCta: "Abrir nuevo hilo",
    },
    shop: {
      guest:
        "Entra con tu Cuenta Prometeo para guardar pedidos y continuar tus compras desde el perfil central.",
      active:
        "La tienda usa la misma Cuenta Prometeo: pedidos, carrito y datos quedan conectados al perfil.",
    },
    articles: {
      guest:
        "Entra con tu Cuenta Prometeo para personalizar lectura y conectar artículos con tus hilos guardados.",
      active: "Lectura conectada a tu Cuenta Prometeo.",
    },
  },
};

export function getAccountHandleLine(user) {
  if (!user) return "Sin sesión iniciada.";
  return `Cuenta activa: @${user.handle}.`;
}
