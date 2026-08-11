import { useAlbumsOnly } from "./useArtistCatalog";
import styles from "./ParallelQueries.module.css";

function AlbumsWidget() {
  const { data: albums, isLoading } = useAlbumsOnly();

  return (
    <div className={styles.widget}>
      <p className={styles.widgetLabel}>
        Sidebar "Discography" widget · unrelated to the panels above
      </p>
      <p className={styles.panelCode}>
        useAlbumsOnly() → useQuery(["artist-albums-standalone", "Nova Ridge"])
      </p>
      <p className={styles.widgetBody}>
        {isLoading || !albums
          ? "Loading album count..."
          : `${albums.length} albums on file for Nova Ridge.`}
      </p>
    </div>
  );
}

export default AlbumsWidget;
