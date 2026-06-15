export default function PreferenceToggle({ item, checked, onToggle }) {
  return (
    <div className="profile-toggle">
      <button
        type="button"
        aria-pressed={checked}
        aria-label={item.label}
        onClick={onToggle}
        className={[
          "profile-toggle__track",
          checked && "profile-toggle__track--on",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div
          className={[
            "profile-toggle__thumb",
            checked && "profile-toggle__thumb--on",
          ]
            .filter(Boolean)
            .join(" ")}
        />
      </button>
      <span className="profile-toggle__label">{item.label}</span>
    </div>
  );
}
