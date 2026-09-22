import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../api/api";
import { getError } from "../utils/helpers";

// Swagger'dagi filtrlar: title, categoryId, price_min, price_max, limit, offset
export default function useProducts({
  title = "",
  categoryId = "",
  minPrice = "",
  maxPrice = "",
  limit = 12,
  offset = 0,
} = {}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const params = { limit, offset };

    if (title.trim()) params.title = title.trim();
    if (categoryId) params.categoryId = categoryId;
    // API narx filtrini faqat ikkalasi bilan birga qabul qiladi
    if (minPrice !== "" || maxPrice !== "") {
      params.price_min = minPrice === "" ? 0 : minPrice;
      params.price_max = maxPrice === "" ? 1000000 : maxPrice;
    }

    setLoading(true);
    setError("");

    api
      .get("/products", { params, signal: controller.signal })
      .then(({ data }) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        setError(getError(err, "Mahsulotlarni yuklab bo'lmadi"));
        setProducts([]);
        setLoading(false);
      });

    return () => controller.abort();
  }, [title, categoryId, minPrice, maxPrice, limit, offset]);

  return { products, loading, error };
}
