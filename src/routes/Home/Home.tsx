import { Link } from "react-router-dom";
import styles from "./Home.module.css";

type Category = "query" | "mutation";

interface Example {
  title: string;
  description: string;
  tag: string;
  to: string;
  category: Category;
  subsection?: string;
}

const examples: Example[] = [
  {
    title: "Pokédex",
    description:
      "Fetch a Pokémon by id with useQuery, including loading and error states.",
    tag: "useQuery",
    to: "/pokemon-query",
    category: "query",
  },
  {
    title: "Query Deduplication",
    description:
      "Two unrelated components request the same account manager record. See TanStack Query collapse both into a single network request.",
    tag: "deduplication",
    to: "/deduplication",
    category: "query",
  },
  {
    title: "Arcade Leaderboard",
    description:
      "Sort 1,000 scores by four different fields and see why the sort field has to live in the query key for TanStack Query to refetch.",
    tag: "query keys",
    to: "/leaderboard",
    category: "query",
  },
  {
    title: "New Observer, New Fetch",
    description:
      "Mount a second component that watches the same query. Do it while the data is fresh and nothing happens; do it once the data goes stale and watch a background refetch fire.",
    tag: "refetchOnMount",
    to: "/mount-refetch",
    category: "query",
  },
  {
    title: "Fetch on Demand",
    description:
      "The query is mounted from the start but stays disabled until you pick a name. See how enabled defers a fetch instead of firing it on mount.",
    tag: "enabled",
    to: "/on-demand",
    category: "query",
  },
  {
    title: "Garbage Collection",
    description:
      "Unmount a query's last observer and watch a short gcTime countdown decide whether the cache entry survives long enough to be reused, or gets collected and refetched from scratch.",
    tag: "gcTime",
    to: "/garbage-collection",
    category: "query",
  },
  {
    title: "Order Tracker",
    description:
      "A customer-facing tracker polls an order's status with refetchInterval, while a separate staff screen updates it. Open both in two tabs to watch one catch up to the other with no shared connection.",
    tag: "refetchInterval",
    to: "/order-tracker",
    category: "query",
  },
  {
    title: "Dependent Queries",
    description:
      "Fetch a score, then the player who set it — two ways. Compare a proper dependent query against folding both requests into one, and see exactly what that shortcut costs you.",
    tag: "enabled",
    to: "/dependent-queries",
    category: "query",
    subsection: "multiple-queries",
  },
  {
    title: "Parallel Queries",
    description:
      "An artist's albums and tour dates — related only by artist name, no foreign key between them. Two independent useQuery calls show the simplest way to fetch both at once, and the drawback: each has its own loading state, so the page arrives in pieces.",
    tag: "useQuery",
    to: "/parallel-queries",
    category: "query",
    subsection: "multiple-queries",
  },
  {
    title: "Combined Parallel Queries",
    description:
      "The same two fetches, wrapped in one queryFn with Promise.all for a single isLoading and isError. Fixes the lopsided-page problem from Parallel Queries — but now the fast piece waits for the slow one, either one failing fails both, and the cache is clubbed too: any other part of the app that just wants the albums can't dedupe against it.",
    tag: "Promise.all",
    to: "/combined-parallel-queries",
    category: "query",
    subsection: "multiple-queries",
  },
  {
    title: "Best of Both Worlds",
    description:
      "useQueries() plus its combine option: two real, separate cache entries — so anything else in the app still dedupes against them — folded into one isLoading and one isError. Fixes both drawbacks at once, with an honest note on when useQueries is actually worth reaching for.",
    tag: "useQueries",
    to: "/best-of-both-worlds",
    category: "query",
    subsection: "multiple-queries",
  },
  {
    title: "Dynamic Parallel Queries",
    description:
      "Check any number of players to compare their stats — the query array grows and shrinks at runtime. A per-player component with its own useQuery would work too, until you need to compare results across the whole set, like the top-score badge here does.",
    tag: "useQueries",
    to: "/dynamic-parallel-queries",
    category: "query",
    subsection: "multiple-queries",
  },
  {
    title: "Prefetch on Hover",
    description:
      "A plant shop's list page prefetches a plant's detail page the moment you hover its card, using the exact same query options object the detail page's useQuery reads — so by the time you click, the slow part is already done.",
    tag: "prefetchQuery",
    to: "/prefetch-on-hover",
    category: "query",
    subsection: "user-experience",
  },
  {
    title: "Placeholder Data",
    description:
      "The same plant shop, but the detail page's useQuery adds a placeholderData function that reshapes the list row you already clicked from into an instant, partial preview — then isPlaceholderData tells the UI when the real fetch replaces it.",
    tag: "placeholderData",
    to: "/placeholder-data",
    category: "query",
    subsection: "user-experience",
  },
  {
    title: "Place an Order",
    description:
      "Submit a checkout form through useMutation and watch its status walk from idle to pending to success or error, with onSuccess/onError callbacks logged as they fire. Flip a switch to force the error path.",
    tag: "useMutation",
    to: "/place-order",
    category: "mutation",
  },
  {
    title: "Manual Cache Update",
    description:
      "A mutation's onSuccess writes the server's response straight into the cache with setQueryData instead of invalidating. A separate read-only panel updates instantly, with no refetch at all.",
    tag: "setQueryData",
    to: "/manual-cache-update",
    category: "mutation",
  },
  {
    title: "Partial Cache Update",
    description:
      "A flag-toggle mutation whose endpoint returns nothing at all. onSuccess merges the change by hand, using its second argument (variables) and setQueryData's updater form to patch just what changed onto whatever was already cached.",
    tag: "setQueryData",
    to: "/partial-cache-update",
    category: "mutation",
  },
];

const SECTIONS: { category: Category; title: string; description: string }[] = [
  {
    category: "query",
    title: "Queries",
    description: "Reading and caching data with useQuery.",
  },
  {
    category: "mutation",
    title: "Mutations",
    description: "Writing data with useMutation.",
  },
];

const SUBSECTIONS: { key: string; title: string; description: string }[] = [
  {
    key: "multiple-queries",
    title: "Multiple Queries",
    description: "Fetching more than one thing at once, and how you wire the requests together.",
  },
  {
    key: "user-experience",
    title: "User Experience",
    description: "Shaping when and how a fetch happens so the app feels faster than the network actually is.",
  },
];

function ExampleTile({ example }: { example: Example }) {
  return (
    <Link to={example.to} className={styles.tile}>
      <span className={styles.tag}>{example.tag}</span>
      <h3 className={styles.tileTitle}>{example.title}</h3>
      <p className={styles.tileDescription}>{example.description}</p>
    </Link>
  );
}

function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>TanStack Query Examples</h1>
        <p className={styles.subtitle}>Pick an example to see it in action</p>
      </header>

      <div className={styles.sections}>
        {SECTIONS.map((section) => {
          const sectionExamples = examples.filter(
            (example) => example.category === section.category,
          );
          const topLevel = sectionExamples.filter(
            (example) => !example.subsection,
          );
          const subsections = SUBSECTIONS.map((subsection) => ({
            ...subsection,
            examples: sectionExamples.filter(
              (example) => example.subsection === subsection.key,
            ),
          })).filter((subsection) => subsection.examples.length > 0);

          return (
            <section key={section.category} className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>{section.title}</h2>
                <p className={styles.sectionSubtitle}>
                  {section.description}
                </p>
              </div>

              {topLevel.length > 0 && (
                <div className={styles.grid}>
                  {topLevel.map((example) => (
                    <ExampleTile key={example.to} example={example} />
                  ))}
                </div>
              )}

              {subsections.map((subsection) => (
                <div key={subsection.key} className={styles.subsection}>
                  <div className={styles.subsectionHeader}>
                    <h3 className={styles.subsectionTitle}>
                      {subsection.title}
                    </h3>
                    <p className={styles.subsectionSubtitle}>
                      {subsection.description}
                    </p>
                  </div>

                  <div className={styles.grid}>
                    {subsection.examples.map((example) => (
                      <ExampleTile key={example.to} example={example} />
                    ))}
                  </div>
                </div>
              ))}
            </section>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
