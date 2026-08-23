import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGcProfile, { GC_TIME } from "./useGcProfile";
import Intro from "./Intro";
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
        <Intro />

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
