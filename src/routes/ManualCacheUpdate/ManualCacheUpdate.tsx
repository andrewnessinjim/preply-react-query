import { Link } from "react-router-dom";
import OrderSummary from "./OrderSummary";
import EditOrderForm from "./EditOrderForm";
import Intro from "./Intro";
import styles from "./ManualCacheUpdate.module.css";

function ManualCacheUpdate() {
  return (
    <div className={styles.page}>
      <Link to="/" className={styles.backLink}>
        ← All examples
      </Link>

      <div className={styles.content}>
        <Intro />

        <div className={styles.panels}>
          <OrderSummary />
          <EditOrderForm />
        </div>
      </div>
    </div>
  );
}

export default ManualCacheUpdate;
