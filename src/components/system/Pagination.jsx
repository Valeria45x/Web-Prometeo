export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  label = "Paginación",
  prevLabel = "Anterior",
  nextLabel = "Siguiente",
}) {
  return (
    <nav className="ds-pagination" aria-label={label}>
      <div className="ds-pagination__inner">
        <button
          type="button"
          className="ds-pagination__button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <span data-animate-text>{prevLabel}</span>
        </button>

        <span
          className="ds-pagination__status"
          aria-label={`Página ${currentPage} de ${totalPages}`}
        >
          <strong data-animate-text>{currentPage}</strong>
          <span data-animate-text>/ {totalPages}</span>
        </span>

        <button
          type="button"
          className="ds-pagination__button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <span data-animate-text>{nextLabel}</span>
        </button>
      </div>
    </nav>
  );
}
