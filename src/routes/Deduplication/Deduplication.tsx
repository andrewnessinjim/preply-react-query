import { Link } from "react-router-dom";
import ManagerBadge from "./ManagerBadge";
import ManagerCard from "./ManagerCard";
import styles from "./Deduplication.module.css";

function Deduplication() {
  return (
    <div className={styles.page}>
      <Link to="/" className={styles.backLink}>
        ← All examples
      </Link>

      <div className={styles.content}>
        <header className={styles.intro}>
          <h1 className={styles.title}>Query Deduplication</h1>
          <p>
            The badge below and the contact card in the sidebar are two
            unrelated components. Each one independently calls{" "}
            <code>useAccountManager()</code>, which runs a{" "}
            <code>useQuery</code> with the same query key. Instead of two
            network requests, TanStack Query fires the request once and
            hands both components the same cached result. Open your
            browser's network tab to see it happen.
          </p>
        </header>

        <div className={styles.dashboard}>
          <div className={styles.topBar}>
            <ManagerBadge />
          </div>

          <div className={styles.body}>
            <div className={styles.ticket}>
              <h2 className={styles.ticketTitle}>Ticket #4821</h2>
              <p className={styles.ticketMeta}>Status: Open · Priority: Normal</p>
              <p>
                Customer reports that scheduled reports stopped arriving by
                email after the last plan upgrade.
              </p>
            </div>

            <aside className={styles.sidebar}>
              <ManagerCard />
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Deduplication;
