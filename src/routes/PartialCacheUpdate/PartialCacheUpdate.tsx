import { Link } from "react-router-dom";
import OrderPriorityCard from "./OrderPriorityCard";
import PriorityToggle from "./PriorityToggle";
import styles from "./PartialCacheUpdate.module.css";

function PartialCacheUpdate() {
  return (
    <div className={styles.page}>
      <Link to="/" className={styles.backLink}>
        ← All examples
      </Link>

      <div className={styles.content}>
        <header className={styles.intro}>
          <h1 className={styles.title}>Partial Cache Update</h1>
          <p>
            A flag toggle like "mark as priority" hits an endpoint built to
            be as cheap as possible — a fire-and-forget PATCH that acks with
            nothing, not the full order back (GitHub's star endpoint really
            does reply 204 No Content, for the same reason). That breaks the{" "}
            <Link to="/manual-cache-update" className={styles.inlineLink}>
              Manual Cache Update
            </Link>{" "}
            trick: that demo could write the mutation's response straight
            into the cache because the response <em>was</em> the full updated
            row. Here there's nothing to write in.
          </p>
          <p>
            Instead, <code>useTogglePriority()</code>'s <code>onSuccess</code>{" "}
            reads its <em>second</em> argument, <code>variables</code> —
            exactly what was sent to <code>mutate()</code> — and passes{" "}
            <code>setQueryData</code> a function instead of a value:{" "}
            <code>
              (previousData) =&gt; ({"{"} ...previousData, priority:
              variables.priority {"}"})
            </code>
            . <code>previousData</code> is whatever's already cached; the
            mutation only tells you what you asked to change, so you merge it
            in yourself. Toggle the flag below and watch the summary panel
            update instantly — still zero refetches, just built from what you
            already had plus what you just sent, instead of what the server
            handed back.
          </p>
        </header>

        <div className={styles.panels}>
          <OrderPriorityCard />
          <PriorityToggle />
        </div>
      </div>
    </div>
  );
}

export default PartialCacheUpdate;
