import { Link } from "react-router-dom";
import Description from "../../components/Description";
import { POLL_INTERVAL } from "./useOrder";
import styles from "./OrderTracker.module.css";

function OrderTrackerIntro() {
  return (
    <header className={styles.intro}>
      <h1 className={styles.title}>Order Tracker</h1>
      <Description>
        This is the customer-facing screen — the kind of page a delivery
        app leaves open while you wait for food. It calls{" "}
        <code>useOrder()</code>, a <code>useQuery</code> with{" "}
        <code>refetchInterval: {POLL_INTERVAL / 1000}s</code> and{" "}
        <code>refetchIntervalInBackground: true</code> (without that
        second flag, polling pauses the moment this tab loses focus —
        fine for most pages, wrong for a tracker you're meant to leave
        open). Open the <strong>staff view</strong> below in a second tab
        and change the status there — this page has no idea that tab
        exists, no socket, no shared cache between them. Leave this tab
        in the background and it'll still notice within{" "}
        {POLL_INTERVAL / 1000} seconds, because the interval keeps
        running whether or not you're looking at it.
      </Description>
      <Link
        to="/order-tracker/manage"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.staffLink}
      >
        Open staff view in a new tab →
      </Link>
    </header>
  );
}

export default OrderTrackerIntro;
