import { Link } from "react-router-dom";
import OrderStepper from "./OrderStepper";
import {
  ORDER_STATUSES,
  useOrder,
  useUpdateOrderStatus,
  type OrderStatus,
} from "./useOrder";
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
        <header className={styles.intro}>
          <h1 className={styles.title}>Update Order Status</h1>
          <p>
            This is the staff-facing screen — plain buttons that run a{" "}
            <code>useMutation</code> which updates the row in Supabase.
            Nothing here talks to the tracker page directly. Open the{" "}
            <strong>tracker view</strong> below in a second tab, then click a
            status here and watch it show up over there once its poll comes
            back around.
          </p>
          <Link
            to="/order-tracker"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.staffLink}
          >
            Open tracker view in a new tab →
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
