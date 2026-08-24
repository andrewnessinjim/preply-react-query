import Description from "../../components/Description";
import { CATALOG_STALE_TIME, GLOBAL_STALE_TIME } from "./queryClient";
import styles from "./QueryConfigurationLevels.module.css";

function Intro() {
  return (
    <header className={styles.intro}>
      <h1 className={styles.title}>Query Configuration Levels</h1>
      <Description>
        TanStack Query lets you set options like <code>staleTime</code> at
        three levels, each more specific than the last. This page runs its
        own isolated <code>QueryClient</code> — so the settings below only
        affect the four cards here, not every other demo on this site — with
        all three levels configured at once. The shared TanStack Query
        Devtools panel is wired to that other client, so it won't show this
        page's cache; watch the badges on each card instead.
      </Description>
      <Description>
        <strong>Level 1 — QueryClient defaultOptions.</strong> Set once, when
        the client is constructed:{" "}
        <code>
          {`new QueryClient({ defaultOptions: { queries: { staleTime: ${GLOBAL_STALE_TIME} } } })`}
        </code>
        . Every query that doesn't say otherwise falls back to this — that's
        the "All Plants" card, queried with no <code>staleTime</code> at all.
      </Description>
      <Description>
        <strong>Level 2 — setQueryDefaults with a fuzzy key.</strong>{" "}
        <code>
          {`queryClient.setQueryDefaults(["plants", "catalog"], { staleTime: ${CATALOG_STALE_TIME} })`}
        </code>{" "}
        matches any query whose key <em>starts with</em>{" "}
        <code>["plants", "catalog"]</code>, no matter what follows — both
        "Succulents" and "Tropicals" pick this up even though they're two
        different keys.
      </Description>
      <Description>
        <strong>Level 3 — an option passed directly to useQuery.</strong> The
        "Featured Plant" card's key also starts with{" "}
        <code>["plants", "catalog"]</code>, so it matches the same fuzzy
        default — but its <code>useQuery</code> call passes{" "}
        <code>staleTime: 0</code> directly, and the most specific option
        always wins. It shows "Stale" the instant every fetch settles, no
        matter what the other two levels say.
      </Description>
    </header>
  );
}

export default Intro;
