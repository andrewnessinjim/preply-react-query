import { useTodo } from "./useTodos";
import styles from "./QueryKeyFactories.module.css";

function TodoDetail({ id }: { id: number }) {
  // Only mounted while its row is expanded, so this query — and the
  // todoKeys.detail(id) cache entry it reads and writes — only exists for
  // however long the panel is open.
  const { data, isLoading } = useTodo(id);

  return (
    <div className={styles.detailPanel}>
      {isLoading || !data ? (
        "Loading detail…"
      ) : (
        <>
          Added <code>{new Date(data.created_at).toLocaleString()}</code> ·
          cache key <code>{JSON.stringify(["todos", "detail", id])}</code>
        </>
      )}
    </div>
  );
}

export default TodoDetail;
