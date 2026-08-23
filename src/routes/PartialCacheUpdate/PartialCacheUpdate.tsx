import { Link } from "react-router-dom";
import OrderPriorityCard from "./OrderPriorityCard";
import PriorityToggle from "./PriorityToggle";
import Intro from "./Intro";
import styles from "./PartialCacheUpdate.module.css";

function PartialCacheUpdate() {
  return (
    <div className={styles.page}>
      <Link to="/" className={styles.backLink}>
        ← All examples
      </Link>

      <div className={styles.content}>
        <Intro />

        <div className={styles.panels}>
          <OrderPriorityCard />
          <PriorityToggle />
        </div>
      </div>
    </div>
  );
}

export default PartialCacheUpdate;
