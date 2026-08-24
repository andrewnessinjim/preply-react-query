import styles from "./DefaultQueryFunction.module.css";

interface ClockWidgetProps {
  time: string | undefined;
}

function ClockWidget({ time }: ClockWidgetProps) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>Server Clock</h3>
        <code className={styles.queryKey}>{JSON.stringify(["server-clock"])}</code>
      </div>

      <p className={styles.explanation}>
        Outside the ["admin"] prefix — setQueryDefaults never matches this
        key, so it brings its own queryFn instead of borrowing the shared
        one.
      </p>

      <div className={styles.row}>{time ?? "Loading…"}</div>
    </div>
  );
}

export default ClockWidget;
