import { useOrderDetails } from "./useOrderDetails";
import styles from "./ManualCacheUpdate.module.css";

function OrderSummary() {
  const { data: order, isLoading } = useOrderDetails();

  return (
    <div className={styles.panel}>
      <h2 className={styles.panelTitle}>Order Summary (read-only)</h2>
      <p className={styles.panelCode}>
        useOrderDetails() → useQuery(["order-details", 1])
      </p>

      {isLoading || !order ? (
        <p className={styles.message}>Loading order...</p>
      ) : (
        <dl className={styles.summary}>
          <dt>Customer</dt>
          <dd>{order.customer_name}</dd>
          <dt>Item</dt>
          <dd>{order.item}</dd>
          <dt>Status</dt>
          <dd>{order.status}</dd>
        </dl>
      )}
    </div>
  );
}

export default OrderSummary;
