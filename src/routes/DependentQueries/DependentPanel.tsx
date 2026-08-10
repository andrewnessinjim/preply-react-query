import { useScore, usePlayer } from "./useScorePlayer";
import styles from "./DependentQueries.module.css";

interface DependentPanelProps {
  simulateFailure: boolean;
}

function DependentPanel({ simulateFailure }: DependentPanelProps) {
  const scoreQuery = useScore();
  const playerQuery = usePlayer(scoreQuery.data?.player_id, simulateFailure);

  return (
    <div className={styles.panel}>
      <h2 className={styles.panelTitle}>Two queries (recommended)</h2>
      <p className={styles.panelCode}>
        useScore() → useQuery(["score", 1])
        <br />
        usePlayer(id) → useQuery(["player", id], {"{"} enabled: !!id {"}"})
      </p>

      {scoreQuery.isLoading ? (
        <p className={styles.message}>Loading score...</p>
      ) : scoreQuery.error || !scoreQuery.data ? (
        <p className={styles.message}>Could not load score.</p>
      ) : (
        <div className={styles.scoreRow}>
          <span className={styles.scoreValue}>
            {scoreQuery.data.score.toLocaleString()} pts
          </span>
          <span className={styles.scoreMeta}>
            {scoreQuery.data.combo}x combo · {scoreQuery.data.accuracy}%
            accuracy
          </span>
        </div>
      )}

      <div className={styles.playerBox}>
        {playerQuery.isLoading ? (
          <p className={styles.message}>Loading player...</p>
        ) : playerQuery.error ? (
          <p className={styles.message}>Could not load player.</p>
        ) : playerQuery.data ? (
          <p className={styles.playerLine}>
            Set by <strong>{playerQuery.data.gamertag}</strong> (
            {playerQuery.data.country})
          </p>
        ) : null}

        <button
          type="button"
          className={styles.retryButton}
          onClick={() => playerQuery.refetch()}
          disabled={playerQuery.isFetching || !scoreQuery.data}
        >
          {playerQuery.isFetching ? "Retrying…" : "Retry player"}
        </button>
      </div>
    </div>
  );
}

export default DependentPanel;
