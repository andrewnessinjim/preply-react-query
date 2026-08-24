import type { ConfigWidgetProps } from "./types";
import styles from "./QueryConfigurationLevels.module.css";

function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

function ConfigWidget({
  title,
  level,
  queryKey,
  staleTimeMs,
  explanation,
  result,
  now,
}: ConfigWidgetProps) {
  const { data, isLoading, isFetching, isStale, dataUpdatedAt, refetch } =
    result;

  const elapsedMs = dataUpdatedAt ? now - dataUpdatedAt : null;
  const remainingSeconds =
    elapsedMs !== null
      ? Math.max(0, Math.ceil((staleTimeMs - elapsedMs) / 1000))
      : null;

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <span className={styles.levelTag}>{level}</span>
        <h3 className={styles.cardTitle}>{title}</h3>
        <code className={styles.queryKey}>{JSON.stringify(queryKey)}</code>
      </div>

      <p className={styles.explanation}>{explanation}</p>

      {isLoading ? (
        <div className={styles.loading}>Loading…</div>
      ) : (
        <ul className={styles.plantList}>
          {data?.map((plant) => (
            <li key={plant.id} className={styles.plantRow}>
              <span>{plant.name}</span>
              <span className={styles.plantPrice}>
                {formatPrice(plant.price_cents)}
              </span>
            </li>
          ))}
        </ul>
      )}

      <div className={styles.cardFooter}>
        <span className={isStale ? styles.staleBadge : styles.freshBadge}>
          {isStale ? "Stale" : `Fresh — stale in ${remainingSeconds}s`}
        </span>
        <button
          type="button"
          className={styles.refetchButton}
          onClick={() => refetch()}
          disabled={isFetching}
        >
          {isFetching ? "Refetching…" : "Refetch"}
        </button>
      </div>
    </div>
  );
}

export default ConfigWidget;
