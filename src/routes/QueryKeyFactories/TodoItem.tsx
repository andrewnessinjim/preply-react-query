import TodoDetail from "./TodoDetail";
import { useToggleTodo } from "./useTodos";
import type { TodoItemProps } from "./types";
import styles from "./QueryKeyFactories.module.css";

function TodoItem({
  todo,
  filter,
  simulateFailure,
  isExpanded,
  onToggleExpanded,
}: TodoItemProps) {
  const toggleTodo = useToggleTodo(filter);

  function handleToggle() {
    toggleTodo.mutate({ id: todo.id, status: !todo.status, simulateFailure });
  }

  return (
    <li className={styles.todoItem}>
      <div className={styles.todoRow}>
        <label className={styles.todoLabel}>
          <input
            type="checkbox"
            checked={todo.status}
            onChange={handleToggle}
          />
          <span className={todo.status ? styles.todoTitleDone : undefined}>
            {todo.title}
          </span>
        </label>
        <button
          type="button"
          className={styles.detailButton}
          onClick={() => onToggleExpanded(todo.id)}
        >
          {isExpanded ? "Hide detail" : "Detail"}
        </button>
      </div>
      {toggleTodo.isError && (
        <p className={styles.todoError}>Failed to save — rolled back.</p>
      )}
      {isExpanded && <TodoDetail id={todo.id} />}
    </li>
  );
}

export default TodoItem;
