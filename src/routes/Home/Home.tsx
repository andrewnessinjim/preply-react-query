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
