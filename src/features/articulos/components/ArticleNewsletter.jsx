import { useState } from "react";
import { COLORS } from "@/design/tokens";
import Label from "@/shared/ui/Label";
import { ArrowIcon } from "@/features/articulos/components/icons";

export default function ArticleNewsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    const normalizedEmail = email.trim();
    if (!normalizedEmail) return;

    try {
      window.localStorage.setItem("prometeo-newsletter-email", normalizedEmail);
    } catch {
      // La confirmación sigue funcionando aunque el almacenamiento falle.
    }

    setSubscribed(true);
  }

  return (
    <aside className="article-dialog__newsletter">
      <Label color={COLORS.textOnLight}>Newsletter gratis</Label>
      <h3>Una idea clara, una vez por semana.</h3>
      <p>
        Privacidad digital explicada sin ruido, con una acción útil para poner en
        práctica.
      </p>

      {subscribed ? (
        <p className="article-dialog__newsletter-success" role="status">
          Ya estás dentro. Gracias por leernos.
        </p>
      ) : (
        <form className="article-dialog__newsletter-form" onSubmit={handleSubmit}>
          <label htmlFor="article-newsletter-email">Tu correo</label>
          <input
            id="article-newsletter-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="tu@email.com"
            autoComplete="email"
            required
          />
          <button type="submit">
            <span>Suscribirme gratis</span>
            <ArrowIcon />
          </button>
        </form>
      )}
    </aside>
  );
}
