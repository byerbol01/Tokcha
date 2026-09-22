const PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect width='400' height='400' fill='%23e8edf8'/%3E%3Cpath d='M130 270l50-70 40 50 25-30 45 50z' fill='%23c3cee8'/%3E%3Ccircle cx='150' cy='150' r='20' fill='%23c3cee8'/%3E%3C/svg%3E";

// escuelajs ba'zan rasmni '["https://..."]' ko'rinishida qaytaradi — toza URL ajratib olamiz
export function getImage(src) {
  const match = String(src ?? "").match(/https?:\/\/[^"'\]\s,]+/);
  return match ? match[0] : PLACEHOLDER;
}

export function onImgError(e) {
  e.currentTarget.onerror = null;
  e.currentTarget.src = PLACEHOLDER;
}

// API xabari string yoki massiv bo'lishi mumkin
export function getError(err, fallback = "Xatolik yuz berdi") {
  const msg = err?.response?.data?.message;
  if (Array.isArray(msg)) return msg.join(", ");
  if (typeof msg === "string") return msg;
  if (err?.code === "ERR_NETWORK") return "Internetga ulanib bo'lmadi";
  return fallback;
}

// API'da saralash yo'q — o'zimiz saralaymiz
export function sortProducts(list, sort) {
  if (sort === "price-asc") return [...list].sort((a, b) => a.price - b.price);
  if (sort === "price-desc") return [...list].sort((a, b) => b.price - a.price);
  return list;
}

export const emptyFilters = {
  title: "",
  categoryId: "",
  minPrice: "",
  maxPrice: "",
  sort: "",
};
