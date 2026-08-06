import { useState } from "react";
import { Link } from "react-router-dom";
import useLeaderboard, { type SortField } from "./useLeaderboard";
import styles from "./Leaderboard.module.css";

const SORT_OPTIONS: { field: SortField; label: string }[] = [
  { field: "score", label: "Score" },
  { field: "combo", label: "Max Combo" },
  { field: "accuracy", label: "Accuracy" },
  { field: "played_at", label: "Last Played" },
];

function formatDate(value: string) {
  return new Date(value).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function Leaderboard() {
  const [sortField, setSortField] = useState<SortField>("score");
  const {
    data: rows,
    isLoading,
    isFetching,
    error,
  } = useLeaderboard(sortField);

  return (
    <div className={styles.page}>
      <Link to="/" className={styles.backLink}>
        ← All examples
      </Link>

      <div className={styles.content}>
        <header className={styles.intro}>
          <h1 className={styles.title}>Arcade Leaderboard</h1>
          <p>
            The <code>scores</code> table holds 1,000 rows. Each button below
            re-sorts and re-fetches the top 12 from Supabase — a genuinely
            different request every time. The active field is baked into the
            query key as <code>["scores", sortField]</code>, so TanStack
            Query knows to refetch instead of handing back the cached "top 12
            by score" when you switch to "Max Combo". Drop the sort field
            from the key and the table would silently stop updating.
          </p>
        </header>

        <div className={styles.controls}>
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.field}
              type="button"
              className={`${styles.sortButton} ${
                sortField === option.field ? styles.sortButtonActive : ""
              }`}
              onClick={() => setSortField(option.field)}
            >
              {option.label}
            </button>
          ))}
          {isFetching && (
            <span className={styles.fetchingHint}>Fetching…</span>
          )}
        </div>

        <div className={styles.tableWrap}>
          {error ? (
            <p className={styles.message}>Could not load the leaderboard.</p>
          ) : isLoading ? (
            <p className={styles.message}>Loading scores...</p>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Player</th>
                  <th>Game</th>
                  <th
                    className={
                      sortField === "score" ? styles.activeColumn : ""
                    }
                  >
                    Score
                  </th>
                  <th
                    className={
                      sortField === "combo" ? styles.activeColumn : ""
                    }
                  >
                    Max Combo
                  </th>
                  <th
                    className={
                      sortField === "accuracy" ? styles.activeColumn : ""
                    }
                  >
                    Accuracy
                  </th>
                  <th
                    className={
                      sortField === "played_at" ? styles.activeColumn : ""
                    }
                  >
                    Last Played
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows?.map((row, index) => (
                  <tr key={row.id}>
                    <td>{index + 1}</td>
                    <td>{row.players?.gamertag ?? "Unknown"}</td>
                    <td>{row.games?.title ?? "Unknown"}</td>
                    <td
                      className={
                        sortField === "score" ? styles.activeColumn : ""
                      }
                    >
                      {row.score.toLocaleString()}
                    </td>
                    <td
                      className={
                        sortField === "combo" ? styles.activeColumn : ""
                      }
                    >
                      {row.combo}x
                    </td>
                    <td
                      className={
                        sortField === "accuracy" ? styles.activeColumn : ""
                      }
                    >
                      {row.accuracy}%
                    </td>
                    <td
                      className={
                        sortField === "played_at" ? styles.activeColumn : ""
                      }
                    >
                      {formatDate(row.played_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
