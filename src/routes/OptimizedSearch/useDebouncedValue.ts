import { useEffect, useState } from "react";

// Generic, feature-agnostic — this is the piece that keeps the queryKey
// from updating on every keystroke, so a fetch only fires once typing
// actually pauses.
export function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(timeout);
  }, [value, delayMs]);

  return debounced;
}
