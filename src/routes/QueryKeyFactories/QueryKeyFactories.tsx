import { useState } from "react";
import { Link } from "react-router-dom";
import AddTodoForm from "./AddTodoForm";
import FilterTabs from "./FilterTabs";
import Intro from "./Intro";
import TodoItem from "./TodoItem";
import { useTodos } from "./useTodos";
import type { TodoFilter } from "./types";
import styles from "./QueryKeyFactories.module.css";

function QueryKeyFactories() {
  const [filter, setFilter] = useState<TodoFilter>("all");
  const [simulateFailure, setSimulateFailure] = useState(false);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const { data: todos, isLoading } = useTodos(filter);

  function toggleExpanded(id: number) {
    setExpandedId((current) => (current === id ? null : id));
  }

  return (
    <div className={styles.page}>
      <Link to="/" className={styles.backLink}>
        ← All examples
      </Link>

      <div className={styles.content}>
        <Intro />

        <AddTodoForm />

        <FilterTabs filter={filter} onChange={setFilter} />

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
          <p className={styles.message}>Nothing here for this filter.</p>
        ) : (
          <ul className={styles.todoList}>
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                filter={filter}
                simulateFailure={simulateFailure}
                isExpanded={expandedId === todo.id}
                onToggleExpanded={toggleExpanded}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default QueryKeyFactories;
