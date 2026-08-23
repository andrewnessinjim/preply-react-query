import { Link } from "react-router-dom";
import OrderStepper from "./OrderStepper";
import { useOrder } from "./useOrder";
import Intro from "./OrderTrackerIntro";
import styles from "./OrderTracker.module.css";

function OrderTracker() {
  const { data: order, isLoading } = useOrder();

  return (
    <div className={styles.page}>
      <Link to="/" className={styles.backLink}>
        ← All examples
      </Link>

      <div className={styles.content}>
        <Intro />

        {isLoading || !order ? (
          <div className={styles.panel}>
            <p className={styles.panelMessage}>Loading order...</p>
          </div>
        ) : (
          <div className={styles.panel}>
            <p className={styles.orderMeta}>
              Order for <strong>{order.customer_name}</strong> ·{" "}
              {order.item}
            </p>
            <OrderStepper status={order.status} />
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderTracker;
