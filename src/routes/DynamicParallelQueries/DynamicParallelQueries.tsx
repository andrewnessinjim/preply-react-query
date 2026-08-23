import { useState } from "react";
import { Link } from "react-router-dom";
import { usePlayerRoster, usePlayerStats } from "./usePlayerComparison";
import Intro from "./Intro";
import styles from "./DynamicParallelQueries.module.css";

function DynamicParallelQueries() {
  const { data: roster, isLoading: isRosterLoading } = usePlayerRoster();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const { results: statsResults, topScoreId } = usePlayerStats(selectedIds);

  function toggle(id: number) {
    setSelectedIds((previous) =>
      previous.includes(id)
        ? previous.filter((existing) => existing !== id)
        : [...previous, id],
    );
  }

  return (
    <div className={styles.page}>
      <Link to="/" className={styles.backLink}>
        ← All examples
      </Link>

      <div className={styles.content}>
        <Intro />

        {isRosterLoading || !roster ? (
          <p className={styles.message}>Loading player roster...</p>
        ) : (
          <div className={styles.checklist}>
            {roster.map((player) => (
              <label key={player.id} className={styles.checklistItem}>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(player.id)}
                  onChange={() => toggle(player.id)}
                />
                {player.gamertag}
              </label>
            ))}
          </div>
        )}

        {selectedIds.length === 0 ? (
          <p className={styles.message}>
            Check one or more players above to compare their stats.
          </p>
        ) : (
          <div className={styles.panels}>
            {selectedIds.map((id, index) => {
              const result = statsResults[index];
              const rosterEntry = roster?.find((player) => player.id === id);

              return (
                <div key={id} className={styles.panel}>
                  <div className={styles.panelHeader}>
                    <h2 className={styles.panelTitle}>
                      {rosterEntry?.gamertag ?? `Player #${id}`}
                    </h2>
                    {id === topScoreId && (
                      <span className={styles.loadBadge}>🏆 Top Score</span>
                    )}
                  </div>

                  {result.isLoading || !result.data ? (
                    // Same four rows as the loaded state below, just with
                    // placeholders instead of real values — so the card
                    // doesn't change size the moment its data lands.
                    <>
                      <p className={styles.statRow}>
                        <span>Country</span>
                        <span>…</span>
                      </p>
                      <p className={styles.statRow}>
                        <span>Games Played</span>
                        <span>…</span>
                      </p>
                      <p className={styles.statRow}>
                        <span>Best Score</span>
                        <span>…</span>
                      </p>
                      <p className={styles.statRow}>
                        <span>Avg. Accuracy</span>
                        <span>…</span>
                      </p>
                    </>
                  ) : (
                    <>
                      <p className={styles.statRow}>
                        <span>Country</span>
                        <span>{result.data.country}</span>
                      </p>
                      <p className={styles.statRow}>
                        <span>Games Played</span>
                        <span>{result.data.gamesPlayed}</span>
                      </p>
                      <p className={styles.statRow}>
                        <span>Best Score</span>
                        <span>{result.data.bestScore.toLocaleString()}</span>
                      </p>
                      <p className={styles.statRow}>
                        <span>Avg. Accuracy</span>
                        <span>{result.data.avgAccuracy}%</span>
                      </p>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default DynamicParallelQueries;
