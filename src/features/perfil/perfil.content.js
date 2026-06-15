// Secciones de preferencias del perfil (demo).
export const PREFERENCE_SECTIONS = [
  {
    id: "notifications",
    title: "Notificaciones",
    items: [
      { key: "notifyReplies", label: "Respuestas en mis hilos" },
      { key: "notifyFollowed", label: "Actualizaciones en hilos seguidos" },
      { key: "notifyMessages", label: "Mensajes directos" },
      { key: "notifyOrders", label: "Actualizaciones de pedidos" },
    ],
  },
  {
    id: "privacy",
    title: "Privacidad",
    items: [
      { key: "profilePublic", label: "Perfil público" },
      { key: "showActivity", label: "Mostrar actividad en comunidad" },
      { key: "allowMessages", label: "Permitir mensajes directos" },
    ],
  },
  {
    id: "appearance",
    title: "Apariencia",
    items: [{ key: "darkTheme", label: "Modo oscuro (beta)" }],
  },
];

export const DEFAULT_PREFERENCES = {
  notifyReplies: true,
  notifyFollowed: true,
  notifyMessages: false,
  notifyOrders: true,
  profilePublic: true,
  showActivity: true,
  allowMessages: true,
  darkTheme: false,
};
