import { COLORS } from "@/design/tokens";
import LocalDemoNotice from "@/shared/LocalDemoNotice";
import SplitCtaButton from "@/shared/ui/SplitCtaButton";
import { ACCOUNT_JOURNEY } from "@/shared/account/accountJourney";

export default function ProfilePending({ email, onConfirm }) {
  return (
    <div className="profile-pending">
      <span className="profile-pending__label">{ACCOUNT_JOURNEY.brand}</span>
      <p className="profile-pending__desc">
        Email enviado a {email}. En esta demo puedes confirmar directamente.
      </p>
      <LocalDemoNotice style={{ maxWidth: 520 }}>
        Esta verificación no envía un email real. Es parte del prototipo frontend
        para mostrar el flujo de cuenta.
      </LocalDemoNotice>
      <SplitCtaButton
        label="Confirmar email"
        color={COLORS.textOnLight}
        iconBg={COLORS.pageLight}
        onClick={onConfirm}
      />
    </div>
  );
}
