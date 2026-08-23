import { ORDER_STATUSES } from "./useOrder";
import type { OrderStatus, OrderStepperProps } from "./types";
import styles from "./OrderTracker.module.css";

const STEP_LABELS: Record<OrderStatus, string> = {
  received: "Received",
  preparing: "Preparing",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
};

function OrderStepper({ status }: OrderStepperProps) {
  const currentIndex = ORDER_STATUSES.indexOf(status);

  return (
    <ol className={styles.stepper}>
      {ORDER_STATUSES.map((step, index) => (
        <li
          key={step}
          aria-current={index === currentIndex ? "step" : undefined}
          className={`${styles.step} ${
            index <= currentIndex ? styles.stepComplete : ""
          } ${index === currentIndex ? styles.stepCurrent : ""}`}
        >
          <span className={styles.stepDot} />
          <span className={styles.stepLabel}>{STEP_LABELS[step]}</span>
        </li>
      ))}
    </ol>
  );
}

export default OrderStepper;
