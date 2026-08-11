import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProfileViewer from "./ProfileViewer";
import { WATCHED_STALE_TIME } from "./useWatchedProfile";
import styles from "./NewObserverNewFetch.module.css";

function NewObserverNewFetch() {
  const [showSecondViewer, setShowSecondViewer] = useState(false);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.page}>
      <Link to="/" className={styles.backLink}>
        ← All examples
      </Link>

      <div className={styles.content}>
        <header className={styles.intro}>
          <h1 className={styles.title}>New Observer, New Fetch</h1>
          <p>
            Viewer A below is always mounted and calls{" "}
            <code>useWatchedProfile()</code>, a <code>useQuery</code> with a{" "}
            {WATCHED_STALE_TIME / 1000} second <code>staleTime</code>. Open
            the <strong>TanStack Query Devtools</strong> (bottom of the
            screen) and expand the <code>["watched-profile", 3]</code> query
            to watch its status. Mount Viewer B while that status still says{" "}
            <strong>fresh</strong> and it renders instantly from cache with{" "}
            <strong>zero</strong> network requests — mounting a new observer
            is free when the data isn't stale. Wait for the status to flip to{" "}
            <strong>stale</strong>, then mount Viewer B: it still renders the
            cached data instantly, but a background refetch fires the moment
            it subscribes, because a new observer just asked for data that's
            past its <code>staleTime</code>. That's <code>refetchOnMount</code>{" "}
            deciding, per observer, whether cached data is good enough. Open
            your browser's <strong>Network tab</strong> too, to see exactly
            when a request fires.
          </p>
        </header>

        <div className={styles.viewers}>
          <ProfileViewer label="Viewer A (always mounted)" now={now} />

          {showSecondViewer && (
            <ProfileViewer label="Viewer B (toggled)" now={now} />
          )}
        </div>

        <button
          type="button"
          className={styles.toggleButton}
          onClick={() => setShowSecondViewer((value) => !value)}
        >
          {showSecondViewer ? "Unmount Viewer B" : "Mount Viewer B"}
        </button>
      </div>
    </div>
  );
}

export default NewObserverNewFetch;
