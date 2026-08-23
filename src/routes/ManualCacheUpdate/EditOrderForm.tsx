import { useEffect, useRef, useState, type FormEvent } from "react";
import { useOrderDetails, useUpdateOrderDetails } from "./useOrderDetails";
import styles from "./ManualCacheUpdate.module.css";

function EditOrderForm() {
  const { data: order, isLoading: isOrderLoading } = useOrderDetails();
  const updateDetails = useUpdateOrderDetails();

  const [customerName, setCustomerName] = useState("");
  const [item, setItem] = useState("");
  const hydrated = useRef(false);

  // Hydrate the form once, the moment the order first loads — not on every
  // background poll, or we'd stomp on whatever the user is mid-typing.
  useEffect(() => {
    if (order && !hydrated.current) {
      setCustomerName(order.customer_name);
      setItem(order.item);
      hydrated.current = true;
    }
  }, [order]);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    updateDetails.mutate({ customerName, item });
  }

  return (
    <div className={styles.panel}>
      <h2 className={styles.panelTitle}>Edit Order Details</h2>
      <p className={styles.panelCode}>
        onSuccess: queryClient.setQueryData(["order-details", 1], updatedOrder)
      </p>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.field}>
          Customer name
          <input
            className={isOrderLoading ? styles.loading : ""}
            type="text"
            required
            value={customerName}
            disabled={updateDetails.isPending}
            onChange={(event) => setCustomerName(event.target.value)}
          />
        </label>

        <label className={styles.field}>
          Item
          <input
            className={isOrderLoading ? styles.loading : ""}
            type="text"
            required
            value={item}
            disabled={updateDetails.isPending}
            onChange={(event) => setItem(event.target.value)}
          />
        </label>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={updateDetails.isPending}
        >
          {updateDetails.isPending ? "Saving…" : "Save"}
        </button>

        {updateDetails.isSuccess && (
          <p className={styles.savedHint}>Saved — no refetch needed.</p>
        )}
      </form>
    </div>
  );
}

export default EditOrderForm;
