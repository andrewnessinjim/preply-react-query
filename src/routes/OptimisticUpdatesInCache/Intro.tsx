import { Link } from "react-router-dom";
import Description from "../../components/Description";
import styles from "./OptimisticUpdatesInCache.module.css";

function Intro() {
  return (
    <header className={styles.intro}>
      <h1 className={styles.title}>Optimistic Updates In Cache</h1>
      <Description>
        The same todo list as{" "}
        <Link
          to="/optimistic-updates-without-cache"
          className={styles.inlineLink}
        >
          Optimistic Updates Without Cache
        </Link>
        , fixed properly this time.{" "}
        <code>useToggleTodo()</code>'s <code>onMutate</code> runs
        synchronously, before the <code>PATCH</code> request even goes
        out, and writes the guessed value straight into the{" "}
        <code>["todos-in-cache"]</code> cache with{" "}
        <code>queryClient.setQueryData()</code>. <code>TodoItem</code>{" "}
        doesn't need an <code>isPending</code> trick anymore —{" "}
        <code>checked={"{"}todo.status{"}"}</code> is enough, because{" "}
        <code>todo.status</code> already <em>is</em> the optimistic value
        the instant this re-renders.
      </Description>
      <Description>
        That one change fixes both rough edges from the other demo at
        once. Because the write lands in the shared cache instead of a
        component-local <code>isPending</code> flag, any other part of the
        app reading <code>["todos-in-cache"]</code> sees it immediately
        too. And because every <code>onMutate</code> call updates the
        cache synchronously, in the order you actually clicked, toggling
        several different todos quickly no longer has anything to race —
        there's no <code>isPending</code> and no <code>todo.status</code>{" "}
        independently drifting out of sync with each other, because
        there's only the one cache, updated once per click, in order.
      </Description>
      <Description>
        <code>onMutate</code> first calls{" "}
        <code>queryClient.cancelQueries()</code> for{" "}
        <code>["todos-in-cache"]</code> — without that, a refetch that was
        already in flight when you clicked could land right after the
        optimistic write and clobber it with the stale data it was
        fetching. Then it snapshots the current cache into{" "}
        <code>previousTodos</code> before touching anything, and hands
        that snapshot forward as <code>context</code>.
      </Description>
      <Description>
        Turn on <strong>Simulate error when toggling</strong> and click a
        checkbox: this time there's a real rollback to watch.{" "}
        <code>onError</code> reads <code>context.previousTodos</code> and
        writes that exact snapshot straight back with{" "}
        <code>setQueryData</code> — undoing precisely what{" "}
        <code>onMutate</code> did, not just falling back to whatever a
        stale flag happens to say.
      </Description>
      <Description>
        There's deliberately no <code>onSuccess</code> or{" "}
        <code>onSettled</code> here calling <code>invalidateQueries</code>{" "}
        "just to resync with the server" — plenty of examples add one out
        of habit. Doing that turned out to bring back the cross-row
        flicker from{" "}
        <Link
          to="/optimistic-updates-without-cache"
          className={styles.inlineLink}
        >
          Optimistic Updates Without Cache
        </Link>
        : that refetch can land while a <em>different</em> row's own
        mutation is still in flight, wholesale-replacing the whole list
        with a snapshot that still has that row's old value and
        clobbering its optimistic write. A successful update already told
        us exactly what's now true, so there's nothing left to reconcile
        — reconciling anyway is exactly what breaks it.
      </Description>
    </header>
  );
}

export default Intro;
