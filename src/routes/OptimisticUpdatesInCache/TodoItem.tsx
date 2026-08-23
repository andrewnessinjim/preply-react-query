import { useToggleTodo } from "./useTodos";
import type { TodoItemProps } from "./types";
import styles from "./OptimisticUpdatesInCache.module.css";

function TodoItem({ todo, simulateFailure }: TodoItemProps) {
  const toggleTodo = useToggleTodo();

  // No isPending trick needed here — onMutate already wrote the guessed
  // value into the cache, so todo.status is the optimistic value the
  // instant this re-renders. checked just reads it directly.
  function handleToggle() {
    toggleTodo.mutate({ id: todo.id, status: !todo.status, simulateFailure });
  }

  return (
    <li className={styles.todoItem}>
      <label className={styles.todoLabel}>
        <input type="checkbox" checked={todo.status} onChange={handleToggle} />
        <span className={todo.status ? styles.todoTitleDone : undefined}>
          {todo.title}
        </span>
      </label>
      {toggleTodo.isError && (
        <p className={styles.todoError}>Failed to save — rolled back.</p>
      )}
    </li>
  );
}

export default TodoItem;
