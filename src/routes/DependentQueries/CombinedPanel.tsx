import { useScoreWithPlayer } from "./useScorePlayer";
import styles from "./DependentQueries.module.css";

interface CombinedPanelProps {
  simulateFailure: boolean;
}

function CombinedPanel({ simulateFailure }: CombinedPanelProps) {
  const { data, isLoading, isFetching, error, refetch } =
    useScoreWithPlayer(simulateFailure);

  return (
    <div className={styles.panel}>
      <h2 className={styles.panelTitle}>One query, two requests inside</h2>
      <p className={styles.panelCode}>
        useScoreWithPlayer() → useQuery(["score-with-player", 1])
        <br />
        queryFn: fetch score, then fetch player, return both
      </p>

      {isLoading ? (
        <p className={styles.message}>Loading...</p>
      ) : error || !data ? (
        <p className={styles.message}>Could not load score &amp; player.</p>
      ) : (
        <>
          <div className={styles.scoreRow}>
            <span className={styles.scoreValue}>
              {data.score.score.toLocaleString()} pts
            </span>
            <span className={styles.scoreMeta}>
              {data.score.combo}x combo · {data.score.accuracy}% accuracy
            </span>
          </div>
          <p className={styles.playerLine}>
            Set by <strong>{data.player.gamertag}</strong> (
            {data.player.country})
          </p>
        </>
      )}

      <button
        type="button"
        className={styles.retryButton}
        onClick={() => refetch()}
        disabled={isFetching}
      >
        {isFetching ? "Retrying…" : "Retry"}
      </button>
    </div>
  );
}

export default CombinedPanel;
