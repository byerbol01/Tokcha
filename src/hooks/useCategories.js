import { useEffect, useState } from "react";
import { api } from "../api/api";
import { getError } from "../utils/helpers";

let cache = null; // kategoriyalar bir marta yuklanadi

export default function useCategories() {
  const [categories, setCategories] = useState(cache ?? []);
  const [loading, setLoading] = useState(!cache);
  const [error, setError] = useState("");

  useEffect(() => {
    if (cache) return;
    let ignore = false;

    api
      .get("/categories")
      .then(({ data }) => {
        cache = data;
        if (!ignore) setCategories(data);
      })
      .catch((err) => !ignore && setError(getError(err)))
      .finally(() => !ignore && setLoading(false));

    return () => {
      ignore = true;
    };
  }, []);

  return { categories, loading, error };
}
