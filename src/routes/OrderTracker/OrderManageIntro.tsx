import { Link } from "react-router-dom";
import Description from "../../components/Description";
import styles from "./OrderTracker.module.css";

function OrderManageIntro() {
  return (
    <header className={styles.intro}>
      <h1 className={styles.title}>Update Order Status</h1>
      <Description>
        This is the staff-facing screen — plain buttons that run a{" "}
        <code>useMutation</code> which updates the row in Supabase.
        Nothing here talks to the tracker page directly. Open the{" "}
        <strong>tracker view</strong> below in a second tab, then click a
        status here and watch it show up over there once its poll comes
        back around.
      </Description>
      <Link
        to="/order-tracker"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.staffLink}
      >
        Open tracker view in a new tab →
      </Link>
    </header>
  );
}

export default OrderManageIntro;
