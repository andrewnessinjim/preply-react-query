import Description from "../../components/Description";
import styles from "./QueryKeyFactories.module.css";

function Intro() {
  return (
    <header className={styles.intro}>
      <h1 className={styles.title}>Query Key Factories</h1>
      <Description>
        The rule this demo follows:{" "}
        <strong>
          create one factory per feature, and have all queryKeys in that
          factory start with the same prefix — usually the name of the
          feature
        </strong>
        . For the todo app, the feature is "todos", and{" "}
        <code>todoKeys.ts</code> is its factory:
      </Description>
      <pre>{`export const todoKeys = {
  all: ["todos"] as const,
  lists: () => [...todoKeys.all, "list"] as const,
  list: (filter: TodoFilter) => [...todoKeys.lists(), filter] as const,
  details: () => [...todoKeys.all, "detail"] as const,
  detail: (id: number) => [...todoKeys.details(), id] as const,
};`}</pre>
      <Description>
        Every key it produces — <code>["todos"]</code>,{" "}
        <code>["todos","list"]</code>, <code>["todos","list","active"]</code>,{" "}
        <code>["todos","detail",3]</code> — starts with the same{" "}
        <code>["todos"]</code> prefix, because each level spreads the one
        above it instead of writing its own array from scratch. No hook or
        component below ever types out a queryKey array by hand; they all
        call <code>todoKeys.list(filter)</code> or{" "}
        <code>todoKeys.detail(id)</code>, so there's exactly one place that
        can get the shape wrong.
      </Description>
      <Description>
        That hierarchy is what makes precise invalidation possible.{" "}
        <code>useAddTodo</code>'s <code>onSuccess</code> calls{" "}
        <code>invalidateQueries(&#123; queryKey: todoKeys.lists() &#125;)</code>{" "}
        — a new todo can only change which rows show up in a list, so only
        the "list" branch refetches, every filter tab at once, and no todo's
        cached detail panel is disturbed. <code>useToggleTodo</code>'s{" "}
        <code>onSettled</code> invalidates both{" "}
        <code>todoKeys.lists()</code> <em>and</em>{" "}
        <code>todoKeys.detail(id)</code> — toggling can move a todo across
        filters, so every list needs a recheck, but only that one todo's
        detail entry does, not the other 99 sitting untouched in the cache.
      </Description>
      <Description>
        Click <strong>Detail</strong> on a todo to open its{" "}
        <code>todoKeys.detail(id)</code> panel, then toggle its checkbox with{" "}
        <strong>Simulate error</strong> off: the panel's status updates too,
        because <code>onMutate</code> writes the optimistic value into both
        the list <em>and</em> the detail entry before the request even goes
        out. Turn simulation on and both roll back together.
      </Description>
    </header>
  );
}

export default Intro;
