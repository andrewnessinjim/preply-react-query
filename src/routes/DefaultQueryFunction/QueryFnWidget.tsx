import type { QueryFnWidgetProps } from "./types";
import styles from "./DefaultQueryFunction.module.css";

function QueryFnWidget<TRow extends { id: number }>({
  title,
  queryKey,
  explanation,
  data,
  isLoading,
  isError,
  renderRow,
}: QueryFnWidgetProps<TRow>) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <code className={styles.queryKey}>{JSON.stringify(queryKey)}</code>
      </div>

      <p className={styles.explanation}>{explanation}</p>

      {isLoading && <div className={styles.loading}>Loading…</div>}
      {isError && <div className={styles.error}>Failed to load.</div>}

      {data && (
        <ul className={styles.rowList}>
          {data.map((row) => (
            <li key={row.id} className={styles.row}>
              {renderRow(row)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default QueryFnWidget;
