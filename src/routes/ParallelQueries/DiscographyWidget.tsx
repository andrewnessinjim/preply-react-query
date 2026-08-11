import { useAlbums } from "./useArtistCatalog";
import styles from "./ParallelQueries.module.css";

function DiscographyWidget() {
  const { data: albums, isLoading } = useAlbums();

  return (
    <div className={styles.widget}>
      <p className={styles.widgetLabel}>
        Sidebar "Discography" widget · calls the same useAlbums() hook as
        Parallel Queries
      </p>
      <p className={styles.panelCode}>
        useAlbums() → useQuery(["artist-albums", "Nova Ridge"])
      </p>
      <p className={styles.widgetBody}>
        {isLoading || !albums
          ? "Loading album count..."
          : `${albums.length} albums on file for Nova Ridge.`}
      </p>
    </div>
  );
}

export default DiscographyWidget;
