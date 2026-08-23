import { useState } from "react";
import { Link } from "react-router-dom";
import { useTodos } from "./useTodos";
import TodoItem from "./TodoItem";
import AddTodoForm from "./AddTodoForm";
import Intro from "./Intro";
import styles from "./OptimisticUpdatesInCache.module.css";

function OptimisticUpdatesInCache() {
  const { data: todos, isLoading } = useTodos();
  const [simulateFailure, setSimulateFailure] = useState(false);

  return (
    <div className={styles.page}>
      <Link to="/" className={styles.backLink}>
        ← All examples
      </Link>

      <div className={styles.content}>
        <Intro />

        <AddTodoForm />

        <label className={styles.simulateToggle}>
          <input
            type="checkbox"
            checked={simulateFailure}
            onChange={(event) => setSimulateFailure(event.target.checked)}
          />
          Simulate error when toggling
        </label>

        {isLoading || !todos ? (
          <p className={styles.message}>Loading todos...</p>
        ) : todos.length === 0 ? (
          <p className={styles.message}>No todos yet — add one above.</p>
        ) : (
          <ul className={styles.todoList}>
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                simulateFailure={simulateFailure}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default OptimisticUpdatesInCache;
