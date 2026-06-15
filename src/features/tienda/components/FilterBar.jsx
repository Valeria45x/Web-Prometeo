import Chip from "@/shared/ui/Chip";
import { CATEGORIES } from "@/data/tienda";

export default function FilterBar({ activeCategory, onCategoryChange, count }) {
  return (
    <div className="shop-filterbar-modern">
      <span className="shop-filterbar-modern__label">Colección</span>
      <div className="shop-filterbar-modern__categories">
        {CATEGORIES.map((category) => {
          const active = activeCategory === category.id;
          return (
            <Chip
              key={String(category.id)}
              label={category.label}
              active={active}
              onClick={() => onCategoryChange(category.id)}
            />
          );
        })}
      </div>
      <span className="shop-filterbar-modern__count">
        {count} {count === 1 ? "producto" : "productos"}
      </span>
    </div>
  );
}
