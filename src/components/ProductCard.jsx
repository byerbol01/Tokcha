import { getImage, onImgError } from "../utils/helpers";

export default function ProductCard({ product }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-line bg-white transition-colors hover:border-cobalt">
      <div className="aspect-square bg-paper">
        <img
          src={getImage(product.images?.[0])}
          onError={onImgError}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        {product.category?.name && (
          <span className="text-xs font-semibold text-turq">{product.category.name}</span>
        )}
        <h3 className="line-clamp-2 font-display text-base font-bold leading-snug">
          {product.title}
        </h3>
        <p className="mt-auto pt-2 text-lg font-bold text-cobalt">
          ${Number(product.price).toLocaleString("en-US")}
        </p>
      </div>
    </article>
  );
}
