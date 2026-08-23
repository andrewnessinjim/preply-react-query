import Description from "../../components/Description";
import styles from "./FetchOnDemand.module.css";

function Intro() {
  return (
    <header className={styles.intro}>
      <h1 className={styles.title}>Fetch on Demand</h1>
      <Description>
        This page mounts <code>useOnDemandProfile(selectedId)</code>{" "}
        immediately, but nothing gets requested — its <code>useQuery</code>{" "}
        is passed <code>enabled: selectedId !== null</code>, and{" "}
        <code>selectedId</code> starts out <code>null</code>. Open the{" "}
        <strong>TanStack Query Devtools</strong>: the query already exists
        in the cache the moment this page loads, sitting disabled. Click a
        name below and watch it flip on and fetch for the first time —
        <code>enabled</code> is how you defer a query until the app
        actually needs it, instead of it firing the instant the component
        mounts.
      </Description>
    </header>
  );
}

export default Intro;
