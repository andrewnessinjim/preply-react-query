import { useOrderPriority, useTogglePriority } from "./useOrderPriority";
import styles from "./PartialCacheUpdate.module.css";

function PriorityToggle() {
  const { data: order } = useOrderPriority();
  const toggle = useTogglePriority();

  if (!order) {
    return null;
  }

  return (
    <div className={styles.panel}>
      <h2 className={styles.panelTitle}>Priority Flag</h2>
      <p className={styles.panelCode}>
        onSuccess: (data, variables) =&gt; setQueryData(key, (previous) =&gt;
        previous &amp;&amp; {"{"} ...previous, priority: variables.priority{" "}
        {"}"})
      </p>

      <p className={styles.orderMeta}>
        This order is currently{" "}
        <strong>{order.priority ? "flagged as priority" : "normal"}</strong>.
      </p>

      <button
        type="button"
        className={styles.submitButton}
        disabled={toggle.isPending}
        onClick={() => toggle.mutate({ priority: !order.priority })}
      >
        {toggle.isPending
          ? "Saving…"
          : order.priority
            ? "Remove priority flag"
            : "Mark as priority"}
      </button>
    </div>
  );
}

export default PriorityToggle;
