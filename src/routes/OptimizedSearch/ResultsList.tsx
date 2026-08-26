import { useSearchResults } from "./usePlantSearch";
import styles from "./OptimizedSearch.module.css";

function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

interface ResultsListProps {
  term: string;
}

function ResultsList({ term }: ResultsListProps) {
  const { data, isLoading } = useSearchResults(term);

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>Search results</h3>
      </div>

      {term.length === 0 ? (
        <p className={styles.message}>Type to search.</p>
      ) : isLoading ? (
        <p className={styles.message}>Searching…</p>
      ) : data?.length === 0 ? (
        <p className={styles.message}>No matches.</p>
      ) : (
        <ul className={styles.resultList}>
          {data?.map((plant) => (
            <li key={plant.id} className={styles.resultRow}>
              <span>{plant.name}</span>
              <span className={styles.resultPrice}>
                {formatPrice(plant.price_cents)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ResultsList;
