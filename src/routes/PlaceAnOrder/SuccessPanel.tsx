import type { SuccessPanelProps } from "./types";
import styles from "./PlaceAnOrder.module.css";

function SuccessPanel({ order, onPlaceAnother }: SuccessPanelProps) {
  return (
    <div className={styles.confirmation}>
      <p className={styles.confirmationTitle}>Order confirmed</p>
      <p className={styles.confirmationLine}>
        Order #{order.id} for <strong>{order.customer_name}</strong> ·{" "}
        {order.item} · status: {order.status}
      </p>
      <button
        type="button"
        className={styles.secondaryButton}
        onClick={onPlaceAnother}
      >
        Place another order
      </button>
    </div>
  );
}

export default SuccessPanel;
