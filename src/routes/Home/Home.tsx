import { Link } from "react-router-dom";
import styles from "./Home.module.css";

interface Example {
  title: string;
  description: string;
  tag: string;
  to: string;
}

const examples: Example[] = [
  {
    title: "Pokédex",
    description:
      "Fetch a Pokémon by id with useQuery, including loading and error states.",
    tag: "useQuery",
    to: "/pokemon-query",
  },
  {
    title: "Query Deduplication",
    description:
      "Two unrelated components request the same account manager record. See TanStack Query collapse both into a single network request.",
    tag: "deduplication",
    to: "/deduplication",
  },
  {
    title: "Arcade Leaderboard",
    description:
      "Sort 1,000 scores by four different fields and see why the sort field has to live in the query key for TanStack Query to refetch.",
    tag: "query keys",
    to: "/leaderboard",
  },
  {
    title: "New Observer, New Fetch",
    description:
      "Mount a second component that watches the same query. Do it while the data is fresh and nothing happens; do it once the data goes stale and watch a background refetch fire.",
    tag: "refetchOnMount",
    to: "/mount-refetch",
  },
  {
    title: "Fetch on Demand",
    description:
      "The query is mounted from the start but stays disabled until you pick a name. See how enabled defers a fetch instead of firing it on mount.",
    tag: "enabled",
    to: "/on-demand",
  },
  {
    title: "Garbage Collection",
    description:
      "Unmount a query's last observer and watch a short gcTime countdown decide whether the cache entry survives long enough to be reused, or gets collected and refetched from scratch.",
    tag: "gcTime",
    to: "/garbage-collection",
  },
  {
    title: "Place an Order",
    description:
      "Submit a checkout form through useMutation and watch its status walk from idle to pending to success or error, with onSuccess/onError callbacks logged as they fire. Flip a switch to force the error path.",
    tag: "useMutation",
    to: "/place-order",
  },
  {
    title: "Order Tracker",
    description:
      "A customer-facing tracker polls an order's status with refetchInterval, while a separate staff screen updates it. Open both in two tabs to watch one catch up to the other with no shared connection.",
    tag: "refetchInterval",
    to: "/order-tracker",
  },
  {
    title: "Dependent Queries",
    description:
      "Fetch a score, then the player who set it — two ways. Compare a proper dependent query against folding both requests into one, and see exactly what that shortcut costs you.",
    tag: "dependent queries",
    to: "/dependent-queries",
  },
  {
    title: "Manual Cache Update",
    description:
      "A mutation's onSuccess writes the server's response straight into the cache with setQueryData instead of invalidating. A separate read-only panel updates instantly, with no refetch at all.",
    tag: "setQueryData",
    to: "/manual-cache-update",
  },
];

function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>TanStack Query Examples</h1>
        <p className={styles.subtitle}>Pick an example to see it in action</p>
      </header>

      <div className={styles.grid}>
        {examples.map((example) => (
          <Link key={example.to} to={example.to} className={styles.tile}>
            <span className={styles.tag}>{example.tag}</span>
            <h2 className={styles.tileTitle}>{example.title}</h2>
            <p className={styles.tileDescription}>{example.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
