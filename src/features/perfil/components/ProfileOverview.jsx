import { Link } from "react-router-dom";

const OVERVIEW_CARDS = [
  {
    to: "/comunidad",
    label: "Comunidad",
    title: "Tus conversaciones",
    body: "Abre hilos, sigue debates y responde con el mismo perfil. Sin crear otra cuenta.",
  },
  {
    to: "/articulos",
    label: "Artículos",
    title: "Tu lectura",
    body: "Lectura conectada a tu Cuenta Prometeo y a los hilos que guardas.",
  },
  {
    to: "/tienda",
    label: "Tienda",
    title: "Tus pedidos",
    body: "Carrito y pedidos quedan ligados a este mismo perfil, listos cuando vuelvas.",
  },
];

export default function ProfileOverview({ currentUser }) {
  return (
    <section className="profile-overview" aria-label="Vista general de la cuenta">
      <div className="profile-overview__header">
        <span className="profile-overview__eyebrow">Vista general</span>
        <h2 className="profile-overview__title">
          Todo conectado a tu <span>Cuenta Prometeo</span>
        </h2>
        <p className="profile-overview__lead">
          Comunidad, lectura y compras comparten un único perfil. Lo que haces en
          {" "}
          {currentUser.displayName ? `la cuenta de ${currentUser.displayName}` : "tu cuenta"}
          {" "}
          se mantiene conectado entre todas las secciones.
        </p>
      </div>

      <div className="profile-overview__grid">
        {OVERVIEW_CARDS.map((card) => (
          <Link key={card.to} to={card.to} className="profile-overview__card">
            <span className="profile-overview__card-eyebrow">{card.label}</span>
            <div className="profile-overview__card-copy">
              <h3 className="profile-overview__card-title">{card.title}</h3>
              <p className="profile-overview__card-body">{card.body}</p>
            </div>
            <span className="profile-overview__card-cta">
              Ir a {card.label} <span aria-hidden="true">→</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
