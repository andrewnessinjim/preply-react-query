import Description from "../../components/Description";
import styles from "./QueryDeduplication.module.css";

function Intro() {
  return (
    <header className={styles.intro}>
      <h1 className={styles.title}>Query Deduplication</h1>
      <Description>
        The badge below and the contact card in the sidebar are two
        unrelated components. Each one independently calls{" "}
        <code>useAccountManager()</code>, which runs a{" "}
        <code>useQuery</code> with the same query key. Instead of two
        network requests, TanStack Query fires the request once and
        hands both components the same cached result. Open your
        browser's network tab to see it happen.
      </Description>
    </header>
  );
}

export default Intro;
