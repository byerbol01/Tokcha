import { useEffect } from "react";

// Element tashqarisiga bosilganda yoki Escape bosilganda onDismiss chaqiriladi
export default function useDismiss(ref, onDismiss, active = true) {
  useEffect(() => {
    if (!active) return;

    const onPointer = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onDismiss();
    };
    const onKey = (e) => e.key === "Escape" && onDismiss();

    document.addEventListener("mousedown", onPointer);
    document.addEventListener("touchstart", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("touchstart", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [ref, onDismiss, active]);
}
