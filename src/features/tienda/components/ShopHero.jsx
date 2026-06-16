import { COLORS, FONTS } from "@/design/tokens";
import { placeholderImage } from "@/lib/media";
import Label from "@/shared/ui/Label";
import SplitCtaButton from "@/shared/ui/SplitCtaButton";
import { Grid, GridCell } from "@/shared/ui/Grid";
import {
  ACCOUNT_JOURNEY,
  getAccountHandleLine,
} from "@/shared/account/accountJourney";
import { formatPrice } from "@/data/tienda";
import { useShopHeroParallax } from "@/features/tienda/hooks/useShopHeroParallax";

export default function ShopHero({
  cartCount,
  cartTotal,
  currentUser,
  onOpenCart,
}) {
  const imgRef = useShopHeroParallax();

  return (
    <>
      <section className="shop-hero">
        <div className="shop-hero__bg" aria-hidden="true">
          <img
            ref={imgRef}
            src={placeholderImage}
            alt=""
            className="shop-hero__bg-img"
            fetchPriority="high"
            loading="eager"
            decoding="async"
          />
          <div className="shop-hero__overlay" />
          <div className="shop-hero__blackout" />
        </div>
        <Grid
          columns="site"
          className="shop-hero__content"
          style={{ gridTemplateRows: "auto auto" }}
        >
          <GridCell
            span={2}
            collapseSpanOnTablet
            collapseSpanOnMobile
            className="shop-hero__copy"
          >
            <div className="shop-hero__heading">
              <Label color={COLORS.textOnLight} className="shop-hero__kicker">
                Tienda
              </Label>
              <h1
                className="shop-hero__title"
                style={{
                  fontFamily: FONTS.display,
                  color: COLORS.textOnLight,
                  margin: 0,
                }}
              >
                <span>Para llevarlo</span>
                <span className="shop-accent">contigo.</span>
              </h1>
            </div>
          </GridCell>
          <GridCell
            span={2}
            className="shop-hero__copy-aside"
            aria-hidden="true"
          />
          <GridCell
            span={2}
            collapseSpanOnTablet
            collapseSpanOnMobile
            className="shop-hero__desc-spacer"
            aria-hidden="true"
          />
          <GridCell
            span={2}
            collapseSpanOnTablet
            collapseSpanOnMobile
            className="shop-hero__desc"
          >
            <p>
              Objetos que trasladan la conversación sobre privacidad digital al
              espacio cotidiano.
            </p>
          </GridCell>
        </Grid>
      </section>

      <Grid
        as="section"
        columns="site"
        className="shop-hero-utility"
        aria-label="Resumen de tienda"
      >
        <GridCell
          span={2}
          collapseSpanOnTablet
          collapseSpanOnMobile
          className="shop-hero-utility__panel shop-hero-utility__panel--cart"
        >
          <div className="shop-hero-utility__panel-header">
            <span className="shop-hero-utility__label">Carrito</span>
            <div className="shop-hero-utility__metric">
              <strong>{cartCount}</strong>
              <span>
                {cartCount === 1
                  ? "pieza seleccionada"
                  : "piezas seleccionadas"}
              </span>
            </div>
          </div>

          <div className="shop-hero-utility__panel-copy">
            <div className="shop-hero-utility__total">
              <span>Subtotal</span>
              <strong>{formatPrice(cartTotal)}</strong>
            </div>
            <p>
              Revisa tu selección y prepara el pedido desde el mismo flujo de
              cuenta.
            </p>
          </div>

          <SplitCtaButton
            label="Ver carrito"
            color={COLORS.textOnLight}
            iconBg={COLORS.pageLight}
            fullWidth
            className="shop-hero-utility__cta"
            onClick={onOpenCart}
          />
        </GridCell>

        <GridCell
          span={2}
          collapseSpanOnTablet
          collapseSpanOnMobile
          className="shop-hero-utility__panel"
        >
          <div className="shop-hero-utility__panel-header">
            <span className="shop-hero-utility__label">
              {ACCOUNT_JOURNEY.brand}
            </span>
            <div className="shop-hero-utility__account-copy">
              {currentUser ? (
                <>
                  <strong>{currentUser.displayName}</strong>
                  <span>{getAccountHandleLine(currentUser)}</span>
                </>
              ) : (
                <p>{ACCOUNT_JOURNEY.contexts.shop.guest}</p>
              )}
            </div>
          </div>

          <div className="shop-hero-utility__panel-copy">
            <p>
              {currentUser
                ? "Tu cuenta mantiene conectados pedidos, carrito y datos dentro del perfil."
                : "Activa tu cuenta Prometeo para conservar el carrito y seguir el pedido desde tu perfil."}
            </p>
          </div>
        </GridCell>
      </Grid>
    </>
  );
}
