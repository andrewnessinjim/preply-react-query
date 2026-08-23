import { useToggleTodo } from "./useTodos";
import type { TodoItemProps } from "./types";
import styles from "./OptimisticUpdatesWithoutCache.module.css";

function TodoItem({ todo, simulateFailure }: TodoItemProps) {
  const toggleTodo = useToggleTodo();

  // The naive optimistic trick: while this mutation is in flight, assume
  // it's going to succeed and show the flipped value — instead of waiting
  // for the round trip and rendering whatever the cache still says.
  //
  // Toggle several different todos in quick succession and you can watch
  // this fall apart for a moment on one of them. Every row reads from the
  // same shared ["todos"] query, so isPending here turns false as soon as
  // *this* row's own invalidateQueries() call settles — but with several
  // rows invalidating that same query around the same time, that doesn't
  // reliably line up with a refetch that actually captured this row's
  // fresh status yet. checked falls back to todo.status, and todo.status
  // is still whatever an earlier, now-stale refetch left in the cache —
  // so the row flips to the wrong value until a later refetch (kicked off
  // by whichever toggle invalidates next) catches it up.
  const checked = toggleTodo.isPending ? !todo.status : todo.status;

  function handleToggle() {
    toggleTodo.mutate({ id: todo.id, status: !todo.status, simulateFailure });
  }

  return (
    <li className={styles.todoItem}>
      <label className={styles.todoLabel}>
        <input type="checkbox" checked={checked} onChange={handleToggle} />
        <span className={checked ? styles.todoTitleDone : undefined}>
          {todo.title}
        </span>
      </label>
      {toggleTodo.isError && (
        // No rollback code runs here — isPending already went back to
        // false, so `checked` above fell straight back to todo.status the
        // instant the mutation settled. This message is just narration.
        <p className={styles.todoError}>Failed to save — reverted on its own.</p>
      )}
    </li>
  );
}

export default TodoItem;
