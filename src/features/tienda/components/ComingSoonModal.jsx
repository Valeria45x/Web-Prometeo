export default function ComingSoonModal({ onClose }) {
  return (
    <div
      className="shop-modal"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="shop-coming-soon">
        <span>Próxima colección</span>
        <h2>Serie 002</h2>
        <p>
          La Serie 002 está en proceso. Próximamente anunciaremos fecha, piezas
          y acceso anticipado.
        </p>
        <button type="button" onClick={onClose}>
          Entendido
        </button>
      </div>
    </div>
  );
}
