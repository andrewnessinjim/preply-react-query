import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGcProfile, { GC_TIME } from "./useGcProfile";
import styles from "./GarbageCollection.module.css";

function GcViewer() {
  const { data: manager, isLoading } = useGcProfile();

  if (isLoading) {
    return <div className={styles.viewer}>Loading contact card...</div>;
  }

  if (!manager) {
    return <div className={styles.viewer}>Could not load profile.</div>;
  }

  return (
    <div className={styles.viewer}>
      <h2 className={styles.cardName}>{manager.name}</h2>
      <p className={styles.cardRole}>
        {manager.role} · {manager.department}
      </p>
    </div>
  );
}

function GarbageCollection() {
  const [mounted, setMounted] = useState(true);
  const [unmountedAt, setUnmountedAt] = useState<number | null>(null);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(interval);
  }, []);

  function toggle() {
    if (mounted) {
      setUnmountedAt(Date.now());
      setMounted(false);
    } else {
      setMounted(true);
    }
  }

  const elapsedMs = unmountedAt !== null ? now - unmountedAt : null;
  const purged = elapsedMs !== null && elapsedMs >= GC_TIME;
  const remainingSeconds =
    elapsedMs !== null ? Math.max(0, Math.ceil((GC_TIME - elapsedMs) / 1000)) : null;

  return (
    <div className={styles.page}>
      <Link to="/" className={styles.backLink}>
        ← All examples
      </Link>

      <div className={styles.content}>
        <header className={styles.intro}>
          <h1 className={styles.title}>Garbage Collection</h1>
          <p>
            <code>useGcProfile()</code> sets <code>gcTime: {GC_TIME / 1000}s</code>,
            far shorter than the 5 minute default, plus a long{" "}
            <code>staleTime</code> so a remount never refetches just because the
            data went stale — that isolates <code>gcTime</code> from{" "}
            <code>staleTime</code>. Unmount the viewer below and it drops to zero
            observers, but TanStack Query doesn't delete the cache entry right
            away — it starts a {GC_TIME / 1000} second countdown. Remount before
            the countdown ends and the exact same data reappears instantly with{" "}
            <strong>no new request</strong>, because the entry survived. Wait past
            it, then remount: you'll see a loading state and a fresh request fire,
            because the entry was garbage collected while nothing was watching it.
            Open the <strong>TanStack Query Devtools</strong>:{" "}
            <code>["gc-demo-profile", 1]</code> stays listed as inactive right
            after you unmount, then disappears from the list the moment{" "}
            <code>gcTime</code> runs out.
          </p>
        </header>

        {mounted ? (
          <GcViewer />
        ) : (
          <div className={styles.unmountedNotice}>
            {purged
              ? "Viewer unmounted — the cache entry has been garbage collected."
              : `Viewer unmounted — ${remainingSeconds}s left before the cache entry is collected.`}
          </div>
        )}

        <button
          type="button"
          className={styles.toggleButton}
          onClick={toggle}
        >
          {mounted ? "Unmount viewer" : "Mount viewer"}
        </button>
      </div>
    </div>
  );
}

export default GarbageCollection;
