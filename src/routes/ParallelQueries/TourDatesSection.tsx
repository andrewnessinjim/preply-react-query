import { useTourDates } from "./useArtistCatalog";
import { useLoadDuration } from "./useLoadDuration";
import styles from "./ParallelQueries.module.css";

function formatDate(value: string) {
  return new Date(value).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function TourDatesSection() {
  const { data: tourDates, isLoading } = useTourDates();
  const duration = useLoadDuration(!isLoading);

  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <h2 className={styles.panelTitle}>Nova Ridge · Tour Dates</h2>
        {duration !== null && (
          <span className={styles.loadBadge}>loaded after {duration}ms</span>
        )}
      </div>
      <p className={styles.panelCode}>
        useTourDates() → useQuery(["artist-tour-dates", "Nova Ridge"])
      </p>

      {isLoading || !tourDates ? (
        <p className={styles.message}>Loading tour dates...</p>
      ) : (
        <ul className={styles.list}>
          {tourDates.map((tourDate) => (
            <li key={tourDate.id} className={styles.listItem}>
              <span className={styles.listItemPrimary}>
                {tourDate.city} · {tourDate.venue}
              </span>
              <span className={styles.listItemSecondary}>
                {formatDate(tourDate.show_date)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TourDatesSection;
