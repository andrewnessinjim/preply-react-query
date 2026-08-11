import { useAlbums } from "./useArtistCatalog";
import { useLoadDuration } from "./useLoadDuration";
import styles from "./ParallelQueries.module.css";

function AlbumsSection() {
  const { data: albums, isLoading } = useAlbums();
  const duration = useLoadDuration(!isLoading);

  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <h2 className={styles.panelTitle}>Nova Ridge · Albums</h2>
        {duration !== null && (
          <span className={styles.loadBadge}>loaded after {duration}ms</span>
        )}
      </div>
      <p className={styles.panelCode}>
        useAlbums() → useQuery(["artist-albums", "Nova Ridge"])
      </p>

      {isLoading || !albums ? (
        <p className={styles.message}>Loading albums...</p>
      ) : (
        <ul className={styles.list}>
          {albums.map((album) => (
            <li key={album.id} className={styles.listItem}>
              <span className={styles.listItemPrimary}>{album.title}</span>
              <span className={styles.listItemSecondary}>
                {album.release_year}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AlbumsSection;
