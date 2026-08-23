import { useState, type FormEvent } from "react";
import { useAddTodo } from "./useTodos";
import styles from "./OptimisticUpdatesWithoutCache.module.css";

function AddTodoForm() {
  const [title, setTitle] = useState("");
  const addTodo = useAddTodo();

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    addTodo.mutate({ title: trimmed }, { onSuccess: () => setTitle("") });
  }

  return (
    <form className={styles.addForm} onSubmit={handleSubmit}>
      <input
        type="text"
        className={styles.addInput}
        placeholder="Add a todo…"
        value={title}
        disabled={addTodo.isPending}
        onChange={(event) => setTitle(event.target.value)}
      />
      <button
        type="submit"
        className={styles.addButton}
        disabled={addTodo.isPending || !title.trim()}
      >
        {addTodo.isPending ? "Adding…" : "Add"}
      </button>
    </form>
  );
}

export default AddTodoForm;
