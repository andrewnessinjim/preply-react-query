import { useRef, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { usePlaceOrder } from "./usePlaceOrder";
import SuccessPanel from "./SuccessPanel";
import Intro from "./Intro";
import type { LogEntry } from "./types";
import styles from "./PlaceAnOrder.module.css";

const ITEMS = [
  "Margherita Pizza",
  "Pepperoni Pizza",
  "Veggie Pizza",
  "Caesar Salad",
];

function PlaceAnOrder() {
  const [customerName, setCustomerName] = useState("");
  const [item, setItem] = useState(ITEMS[0]);
  const [simulateFailure, setSimulateFailure] = useState(false);
  const [log, setLog] = useState<LogEntry[]>([]);
  const nextLogId = useRef(0);

  function appendLog(message: string) {
    nextLogId.current += 1;
    setLog((prev) =>
      [
        { id: nextLogId.current, time: new Date().toLocaleTimeString(), message },
        ...prev,
      ].slice(0, 6),
    );
  }

  const mutation = usePlaceOrder({
    onSuccess: (order) => {
      appendLog(
        `onSuccess fired — order #${order.id} confirmed for ${order.customer_name}`,
      );
    },
    onError: (error) => {
      appendLog(`onError fired — ${error.message}`);
    },
  });

  const isPending = mutation.status === "pending";
  const isError = mutation.status === "error";
  const isSuccess = mutation.status === "success";

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    mutation.mutate({ customerName, item, simulateFailure });
  }

  function handlePlaceAnother() {
    setCustomerName("");
    setItem(ITEMS[0]);
    mutation.reset();
  }

  return (
    <div className={styles.page}>
      <Link to="/" className={styles.backLink}>
        ← All examples
      </Link>

      <div className={styles.content}>
        <Intro />

        <p className={styles.status}>
          status: <code>"{mutation.status}"</code>
        </p>

        {isSuccess && mutation.data ? (
          <SuccessPanel order={mutation.data} onPlaceAnother={handlePlaceAnother} />
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            {isError && (
              <div className={styles.errorBanner}>
                <span>{mutation.error?.message}</span>
                <button
                  type="button"
                  className={styles.dismissButton}
                  onClick={() => mutation.reset()}
                >
                  Dismiss
                </button>
              </div>
            )}

            <label className={styles.field}>
              Name
              <input
                type="text"
                required
                value={customerName}
                disabled={isPending}
                onChange={(event) => setCustomerName(event.target.value)}
              />
            </label>

            <label className={styles.field}>
              Item
              <select
                value={item}
                disabled={isPending}
                onChange={(event) => setItem(event.target.value)}
              >
                {ITEMS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className={styles.toggle}>
              <input
                type="checkbox"
                checked={simulateFailure}
                disabled={isPending}
                onChange={(event) => setSimulateFailure(event.target.checked)}
              />
              Simulate payment failure
            </label>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={isPending}
            >
              {isPending ? "Placing order…" : "Place Order"}
            </button>
          </form>
        )}

        <div className={styles.log}>
          <h2 className={styles.logTitle}>Callback log</h2>
          {log.length === 0 ? (
            <p className={styles.logEmpty}>
              Nothing yet — submit the form above.
            </p>
          ) : (
            <ul className={styles.logList}>
              {log.map((entry) => (
                <li key={entry.id} className={styles.logEntry}>
                  <span className={styles.logTime}>{entry.time}</span>
                  {entry.message}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default PlaceAnOrder;
