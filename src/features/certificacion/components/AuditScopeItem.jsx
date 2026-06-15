export default function AuditScopeItem({ item, index, open, onOpen }) {
  const panelId = `cert-audit-scope-panel-${index}`;

  return (
    <article
      className={[
        "cert-audit-scope__item",
        open && "cert-audit-scope__item--open",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <button
        type="button"
        className="cert-audit-scope__question"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onOpen}
      >
        <strong className="cert-audit-scope__title">{item.title}</strong>
        <span className="cert-audit-scope__symbol" aria-hidden="true">
          {open ? "−" : "+"}
        </span>
      </button>

      <div
        id={panelId}
        className={[
          "cert-audit-scope__panel",
          open && "cert-audit-scope__panel--open",
        ]
          .filter(Boolean)
          .join(" ")}
        aria-hidden={!open}
      >
        <div className="cert-audit-scope__panel-inner">
          <p>{item.body}</p>
          <p className="cert-audit-scope__outcome">
            <strong>Qué obtiene tu equipo:</strong> {item.outcome}
          </p>
        </div>
      </div>
    </article>
  );
}
