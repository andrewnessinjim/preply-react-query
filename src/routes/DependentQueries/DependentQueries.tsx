import { useState } from "react";
import { Link } from "react-router-dom";
import DependentPanel from "./DependentPanel";
import CombinedPanel from "./CombinedPanel";
import styles from "./DependentQueries.module.css";

function DependentQueries() {
  const [simulateFailure, setSimulateFailure] = useState(false);

  return (
    <div className={styles.page}>
      <Link to="/" className={styles.backLink}>
        ← All examples
      </Link>

      <div className={styles.content}>
        <header className={styles.intro}>
          <h1 className={styles.title}>Dependent Queries</h1>
          <p>
            A leaderboard row only stores a <code>player_id</code> — showing
            who set the score takes a second request, and you can't make it
            until you know who to ask for. That's a dependent query: the
            second fetch needs data the first one returned. There are two
            ways to write it, and both panels below fetch the exact same
            score and player. Compare them side by side.
          </p>
          <ol className={styles.tradeoffs}>
            <li>
              <strong>One loading state.</strong> Reload this page and watch
              closely: the right panel shows nothing until both requests
              finish. The left panel shows the score immediately and lets
              the player line carry its own loading state.
            </li>
            <li>
              <strong>They succeed or fail together.</strong> Flip the
              switch below, then hit retry on each panel. On the left, only
              the player line errors — the score stays on screen. On the
              right, the one query fails as a whole and the score
              disappears too, even though it was never the problem.
            </li>
            <li>
              <strong>Retrying refetches everything.</strong> Watch your
              browser's <strong>Network tab</strong> while you retry each
              side: the right panel's retry re-issues both the score and
              player requests every time; the left panel's retry only
              re-issues the player request.
            </li>
            <li>
              <strong>The player ends up cached twice, and never
              deduped.</strong> On load, check the Network tab: two separate
              requests hit the players table for the same{" "}
              <code>player_id</code> — one from the standalone query, one
              buried inside the combined one, fired at the same time with no
              awareness of each other. Open the{" "}
              <strong>TanStack Query Devtools</strong> and you'll see why:{" "}
              <code>["score-with-player", 1]</code> and{" "}
              <code>["player", id]</code> are two separate cache entries.
              That same player's data lives in both, with nothing keeping
              them in sync.
            </li>
          </ol>

          <label className={styles.toggle}>
            <input
              type="checkbox"
              checked={simulateFailure}
              onChange={(event) => setSimulateFailure(event.target.checked)}
            />
            Simulate player service outage
          </label>
        </header>

        <div className={styles.panels}>
          <DependentPanel simulateFailure={simulateFailure} />
          <CombinedPanel simulateFailure={simulateFailure} />
        </div>
      </div>
    </div>
  );
}

export default DependentQueries;
