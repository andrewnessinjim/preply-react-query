import { Link } from "react-router-dom";
import ManagerBadge from "./ManagerBadge";
import ManagerCard from "./ManagerCard";
import Intro from "./Intro";
import styles from "./QueryDeduplication.module.css";

function QueryDeduplication() {
  return (
    <div className={styles.page}>
      <Link to="/" className={styles.backLink}>
        ← All examples
      </Link>

      <div className={styles.content}>
        <Intro />

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

export default QueryDeduplication;
