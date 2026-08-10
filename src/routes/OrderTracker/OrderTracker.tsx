import { Link } from "react-router-dom";
import OrderStepper from "./OrderStepper";
import { useOrder, POLL_INTERVAL } from "./useOrder";
import styles from "./OrderTracker.module.css";

function OrderTracker() {
  const { data: order, isLoading } = useOrder();

  return (
    <div className={styles.page}>
      <Link to="/" className={styles.backLink}>
        ← All examples
      </Link>

      <div className={styles.content}>
        <header className={styles.intro}>
          <h1 className={styles.title}>Order Tracker</h1>
          <p>
            This is the customer-facing screen — the kind of page a delivery
            app leaves open while you wait for food. It calls{" "}
            <code>useOrder()</code>, a <code>useQuery</code> with{" "}
            <code>refetchInterval: {POLL_INTERVAL / 1000}s</code> and{" "}
            <code>refetchIntervalInBackground: true</code> (without that
            second flag, polling pauses the moment this tab loses focus —
            fine for most pages, wrong for a tracker you're meant to leave
            open). Open the <strong>staff view</strong> below in a second tab
            and change the status there — this page has no idea that tab
            exists, no socket, no shared cache between them. Leave this tab
            in the background and it'll still notice within{" "}
            {POLL_INTERVAL / 1000} seconds, because the interval keeps
            running whether or not you're looking at it.
          </p>
          <Link
            to="/order-tracker/manage"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.staffLink}
          >
            Open staff view in a new tab →
          </Link>
        </header>

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
