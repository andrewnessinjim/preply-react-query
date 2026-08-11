import { useOrderPriority } from "./useOrderPriority";
import styles from "./PartialCacheUpdate.module.css";

function OrderPriorityCard() {
  const { data: order, isLoading } = useOrderPriority();

  return (
    <div className={styles.panel}>
      <h2 className={styles.panelTitle}>Order Summary (read-only)</h2>
      <p className={styles.panelCode}>
        useOrderPriority() → useQuery(["order-priority", 1])
      </p>

      {isLoading || !order ? (
        <p className={styles.message}>Loading order...</p>
      ) : (
        <dl className={styles.summary}>
          <dt>Customer</dt>
          <dd>{order.customer_name}</dd>
          <dt>Item</dt>
          <dd>{order.item}</dd>
          <dt>Priority</dt>
          <dd>{order.priority ? "Yes" : "No"}</dd>
        </dl>
      )}
    </div>
  );
}

export default OrderPriorityCard;
