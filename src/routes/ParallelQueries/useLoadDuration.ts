import { useEffect, useRef, useState } from "react";

/**
 * Captures how long it took, in milliseconds, from this hook's first render
 * until `isReady` first became true. Used here purely to make the staggered
 * arrival of two independent queries visible without guesswork.
 */
export function useLoadDuration(isReady: boolean) {
  const startRef = useRef(performance.now());
  const [duration, setDuration] = useState<number | null>(null);

  useEffect(() => {
    if (isReady && duration === null) {
      setDuration(Math.round(performance.now() - startRef.current));
    }
  }, [isReady, duration]);

  return duration;
}
