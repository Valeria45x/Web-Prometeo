import PreferenceToggle from "@/features/perfil/components/PreferenceToggle";

export default function PreferencePanel({
  section,
  open,
  onToggleOpen,
  prefs,
  onTogglePreference,
}) {
  return (
    <div className="profile-pref-panel">
      <button
        type="button"
        aria-expanded={open}
        className="profile-pref-panel__trigger"
        onClick={onToggleOpen}
      >
        <span className="profile-pref-panel__trigger-label">
          {section.title}
        </span>
        <span
          aria-hidden="true"
          className={[
            "profile-pref-panel__chevron",
            open && "profile-pref-panel__chevron--open",
          ]
            .filter(Boolean)
            .join(" ")}
        />
      </button>
      {open && (
        <div className="profile-pref-panel__body">
          {section.items.map((item) => (
            <PreferenceToggle
              key={item.key}
              item={item}
              checked={prefs[item.key]}
              onToggle={() => onTogglePreference(item.key)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
