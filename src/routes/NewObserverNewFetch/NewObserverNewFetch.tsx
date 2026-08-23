import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProfileViewer from "./ProfileViewer";
import Intro from "./Intro";
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
        <Intro />

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
