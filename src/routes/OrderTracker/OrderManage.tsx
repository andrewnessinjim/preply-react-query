import { Link } from "react-router-dom";
import OrderStepper from "./OrderStepper";
import { ORDER_STATUSES, useOrder, useUpdateOrderStatus } from "./useOrder";
import type { OrderStatus } from "./types";
import Intro from "./OrderManageIntro";
import styles from "./OrderTracker.module.css";

const STEP_LABELS: Record<OrderStatus, string> = {
  received: "Received",
  preparing: "Preparing",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
};

function OrderManage() {
  const { data: order, isLoading } = useOrder();
  const updateStatus = useUpdateOrderStatus();

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

            <div className={styles.buttonRow}>
              {ORDER_STATUSES.map((step) => (
                <button
                  key={step}
                  type="button"
                  className={styles.statusButton}
                  disabled={
                    step === order.status ||
                    (updateStatus.isPending &&
                      updateStatus.variables === step)
                  }
                  onClick={() => updateStatus.mutate(step)}
                >
                  {updateStatus.isPending && updateStatus.variables === step
                    ? "Saving…"
                    : `Mark as ${STEP_LABELS[step]}`}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderManage;
