import { COLORS } from "@/design/tokens";
import LocalDemoNotice from "@/shared/components/LocalDemoNotice";
import SplitCtaButton from "@/shared/ui/SplitCtaButton";
import { ACCOUNT_JOURNEY } from "@/shared/account/accountJourney";

export default function ProfileGuest({ onActivate }) {
  return (
    <section className="profile-guest">
      <div className="profile-guest__main">
        <span className="profile-guest__eyebrow">{ACCOUNT_JOURNEY.brand}</span>
        <h1 className="profile-guest__heading">Tu centro de control.</h1>
        <p className="profile-guest__desc">
          {ACCOUNT_JOURNEY.contexts.profile.guest}
        </p>
        <LocalDemoNotice style={{ maxWidth: 520, marginBottom: 8 }}>
          Esta área es una simulación: los perfiles, hilos y pedidos se guardan
          solo en el navegador de la persona que visita la web.
        </LocalDemoNotice>
        <SplitCtaButton
          label={ACCOUNT_JOURNEY.guestCta}
          color={COLORS.textOnLight}
          iconBg={COLORS.pageLight}
          onClick={onActivate}
        />
      </div>
      <div className="profile-guest__accent">
        <span className="profile-guest__accent-label">
          {ACCOUNT_JOURNEY.navLabel}
        </span>
      </div>
    </section>
  );
}
