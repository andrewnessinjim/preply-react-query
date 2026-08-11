import { useState } from "react";
import { Link } from "react-router-dom";
import { usePlayerRoster, usePlayerStats } from "./usePlayerComparison";
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
        <header className={styles.intro}>
          <h1 className={styles.title}>Dynamic Parallel Queries</h1>
          <p>
            Every other demo in this section fetches a fixed, known number
            of things — always the same one or two queries. Check boxes
            below instead: each one adds or removes a player from{" "}
            <code>selectedIds</code>, and{" "}
            <code>usePlayerStats(selectedIds)</code> fires one stats query
            per checked player. The array TanStack Query sees genuinely
            grows and shrinks at runtime, from zero players to however many
            you check.
          </p>
          <p>
            You could dodge the Rules of Hooks issue here just by
            extracting a <code>{"<PlayerStatCard playerId={id} />"}</code>{" "}
            component and letting each instance call its own{" "}
            <code>useQuery</code> — that's completely valid React, and
            simpler than this page. It works fine right up until something
            needs to know about the whole set of players at once. The{" "}
            <strong>🏆 Top Score</strong> badge below appears on exactly one
            card — whichever currently has the highest score among the
            players that have loaded so far — and that's computed by{" "}
            <code>usePlayerStats</code>'s own <code>combine</code> option,
            which reduces the whole results array down to a{" "}
            <code>topScoreId</code> alongside the individual results, before
            this component ever sees any of it. A list of independent child
            components, each hiding its own fetch inside itself, has no way
            to compare notes like that.
          </p>
          <p>
            Each card still has its own independent loading state,
            deliberately not combined into one — these are different
            people, not different pieces of one page, so it makes more
            sense for each to arrive on its own. The badge just shifts as
            results land. Uncheck a player and check them again: their card
            reappears instantly, because their query key —{" "}
            <code>["player-stats", id]</code> — never left the cache.
          </p>
        </header>

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
