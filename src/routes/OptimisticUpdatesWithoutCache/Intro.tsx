import { Link } from "react-router-dom";
import Description from "../../components/Description";
import styles from "./OptimisticUpdatesWithoutCache.module.css";

function Intro() {
  return (
    <header className={styles.intro}>
      <h1 className={styles.title}>Optimistic Updates Without Cache</h1>
      <Description>
        A todo list. Checking a box calls <code>useToggleTodo()</code>, a{" "}
        <code>useMutation</code> that updates the row's <code>status</code>{" "}
        in Supabase. This is the naive first pass at making that feel
        instant: <code>TodoItem</code> doesn't wait for the response to
        show the new value —{" "}
        <code>
          checked={"{"}toggleTodo.isPending ? !todo.status : todo.status{"}"}
        </code>{" "}
        just assumes the mutation will succeed and flips the box the
        moment you click, before the request has even resolved.
      </Description>
      <Description>
        Adding a todo below is deliberately <em>not</em> optimistic — the
        button just says "Adding…" and disables itself until the insert
        comes back, then <code>onSuccess</code> invalidates{" "}
        <code>["todos"]</code> the same way{" "}
        <Link to="/sorted-list-invalidation" className={styles.inlineLink}>
          Sorted List Invalidation
        </Link>{" "}
        does. That's honest, good-enough feedback for something that
        happens once in a while. A checkbox is different: you click it
        expecting an instant response, and waiting a full round trip before
        it visibly toggles reads as laggy.
      </Description>
      <Description>
        Notice what this trick doesn't do: it never writes to the cache.{" "}
        <code>isPending</code> is local to the one{" "}
        <code>useToggleTodo()</code> call that <code>TodoItem</code> owns,
        so the flipped checkbox only exists in that component instance —
        another part of the app reading the same <code>["todos"]</code>{" "}
        query wouldn't see it. And if the request fails, there's no
        rollback to write, either: <code>isPending</code> just goes back to{" "}
        <code>false</code> and the checkbox falls back to whatever{" "}
        <code>todo.status</code> still says, since nothing ever touched it.
        That's also its ceiling — see{" "}
        <Link to="/optimistic-updates-in-cache" className={styles.inlineLink}>
          Optimistic Updates In Cache
        </Link>{" "}
        for the version that writes the optimistic value straight into the
        cache instead, so it survives being read from anywhere, at the
        cost of needing a real rollback when the server disagrees.
      </Description>
      <Description>
        Turn on <strong>Simulate error when toggling</strong> below and
        click a checkbox: it still flips instantly, sits flipped for the
        full delay, then snaps back and prints a "Failed to save" line —
        with no <code>onError</code> handler anywhere in{" "}
        <code>useToggleTodo()</code>. There's nothing to undo because
        nothing was ever written; the revert is really just the checkbox
        re-reading <code>todo.status</code> once <code>isPending</code>{" "}
        turns false again.
      </Description>
      <Description>
        One more rough edge, easiest to see if you toggle a few different
        todos in quick succession: they all eventually land on the right
        value, but one of them can visibly flicker to the wrong value
        first. Every row reads from the same shared{" "}
        <code>["todos"]</code> query, so <code>isPending</code> for a
        given row turns <code>false</code> as soon as{" "}
        <em>that row's own</em> <code>invalidateQueries()</code> call
        settles — but with several toggles invalidating that same query
        around the same time, that doesn't reliably line up with a
        refetch that actually captured this row's fresh status yet.{" "}
        <code>checked</code> falls back to <code>todo.status</code>, and{" "}
        <code>todo.status</code> is still whatever an earlier, now-stale
        refetch left in the cache — until a later refetch, kicked off by
        whichever toggle invalidates next, catches it up.{" "}
        <Link to="/optimistic-updates-in-cache" className={styles.inlineLink}>
          Optimistic Updates In Cache
        </Link>{" "}
        doesn't have this problem either — every optimistic write lands in
        the cache synchronously, in click order, instead of being guessed
        at render time from two independently-racing pieces of state.
      </Description>
    </header>
  );
}

export default Intro;
