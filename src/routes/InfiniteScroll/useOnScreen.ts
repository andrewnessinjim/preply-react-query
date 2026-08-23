import { useCallback, useEffect, useState } from "react";


export default function useOnScreen<T extends Element>(rootMargin = "0px") {
  // A callback ref, not useRef — the sentinel this gets attached to is
  // usually rendered behind a loading conditional, so it doesn't exist in
  // the DOM on first mount. useRef's .current would just be null forever in
  // that case, with nothing to tell an effect to go check it again once the
  // node actually shows up. A callback ref fires exactly when React attaches
  // or detaches the node, so storing that in state lets the effect below
  // re-run at the right moment no matter when the sentinel actually mounts.
  const [node, setNode] = useState<T | null>(null);
  const ref = useCallback((element: T | null) => setNode(element), []);

  const [isOnScreen, setIsOnScreen] = useState(false);

  useEffect(() => {
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsOnScreen(entry.isIntersecting),
      { rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [node, rootMargin]);

  return { ref, isOnScreen } as const;
}
