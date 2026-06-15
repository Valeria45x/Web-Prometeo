import { useState } from "react";
import Button from "@/shared/ui/Button";

const FIELDS = [
  { key: "displayName", label: "Nombre", autocomplete: "name" },
  { key: "handle", label: "Handle", autocomplete: "username" },
  { key: "email", label: "Email", autocomplete: "email", type: "email" },
];

export default function EditProfileForm({ currentUser, onCancel, onSave }) {
  const [form, setForm] = useState({
    displayName: currentUser.displayName ?? "",
    handle: currentUser.handle ?? "",
    email: currentUser.email ?? "",
  });
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const result = onSave(form);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setError("");
  }

  return (
    <form className="profile-edit-form" onSubmit={handleSubmit}>
      {FIELDS.map(({ key, label, autocomplete, type = "text" }) => (
        <div key={key} className="profile-edit-form__field">
          <label className="profile-edit-form__label" htmlFor={`edit-${key}`}>
            {label}
          </label>
          <input
            id={`edit-${key}`}
            className="profile-edit-form__input"
            type={type}
            autoComplete={autocomplete}
            value={form[key]}
            onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
          />
        </div>
      ))}
      <Button type="submit" variant="outline" surface="light" size="sm">
        Guardar
      </Button>
      <Button variant="ghost" surface="light" size="sm" onClick={onCancel}>
        Cancelar
      </Button>
      {error && (
        <p role="alert" className="profile-edit-form__error">
          {error}
        </p>
      )}
    </form>
  );
}
