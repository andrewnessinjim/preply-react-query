import { Link } from "react-router-dom";
import OrderSummary from "./OrderSummary";
import EditOrderForm from "./EditOrderForm";
import styles from "./ManualCacheUpdate.module.css";

function ManualCacheUpdate() {
  return (
    <div className={styles.page}>
      <Link to="/" className={styles.backLink}>
        ← All examples
      </Link>

      <div className={styles.content}>
        <header className={styles.intro}>
          <h1 className={styles.title}>Manual Cache Update</h1>
          <p>
            The summary panel and the edit form below are two independent
            components, each calling this demo's own{" "}
            <code>useOrderDetails()</code>, reading its own{" "}
            <code>["order-details", 1]</code> cache entry — deliberately{" "}
            <em>not</em> the same hook or query key the{" "}
            <Link to="/order-tracker" className={styles.inlineLink}>
              Order Tracker
            </Link>{" "}
            demo uses, even though both happen to read the same database row.
            Reusing that hook here would have dragged its{" "}
            <code>refetchInterval</code> polling along with it, which has
            nothing to do with what this demo is showing. Edit a field and
            hit Save: unlike the staff status-update mutation, this one's{" "}
            <code>onSuccess</code> doesn't call <code>invalidateQueries</code>.
            The database update already returns the full updated row, so{" "}
            <code>onSuccess</code> writes it straight into the cache with{" "}
            <code>
              queryClient.setQueryData(["order-details", 1], updatedOrder)
            </code>
            . Watch the summary panel above the form update the instant you
            save — then check your <strong>Network tab</strong>: only one
            request fires, the update itself. Compare that to the{" "}
            <Link to="/order-tracker/manage" className={styles.inlineLink}>
              Order Tracker's staff screen
            </Link>
            , where changing the status fires the update, then a second
            request to fetch it back, every single time.
          </p>
        </header>

        <div className={styles.panels}>
          <OrderSummary />
          <EditOrderForm />
        </div>
      </div>
    </div>
  );
}

export default ManualCacheUpdate;
