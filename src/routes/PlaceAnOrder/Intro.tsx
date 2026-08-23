import Description from "../../components/Description";
import styles from "./PlaceAnOrder.module.css";

function Intro() {
  return (
    <header className={styles.intro}>
      <h1 className={styles.title}>Place an Order</h1>
      <Description>
        Checking out calls <code>usePlaceOrder()</code>, a{" "}
        <code>useMutation</code> that inserts a new row into the same{" "}
        orders table the Order Tracker demo reads from. Unlike{" "}
        <code>useQuery</code>, a mutation never fires on its own — it
        only runs when you call <code>mutate()</code>, here on submit.
        Its <code>status</code> property walks through exactly four
        values: <code>"idle"</code> before you submit,{" "}
        <code>"pending"</code> while the request is in flight, then
        either <code>"success"</code> or <code>"error"</code> — and the
        panel below re-renders directly off that value. Toggle "Simulate
        payment failure" to see the error path, or open the{" "}
        <strong>TanStack Query Devtools</strong>' <strong>Mutations</strong>{" "}
        tab to watch <code>status</code> change live.
      </Description>
    </header>
  );
}

export default Intro;
