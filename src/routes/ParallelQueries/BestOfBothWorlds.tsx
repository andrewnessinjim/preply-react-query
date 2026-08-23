import { Link } from "react-router-dom";
import { useAlbumsAndTourDatesQueries } from "./useArtistCatalog";
import DiscographyWidget from "./DiscographyWidget";
import Intro from "./BestOfBothWorldsIntro";
import styles from "./ParallelQueries.module.css";

function formatDate(value: string) {
  return new Date(value).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function BestOfBothWorlds() {
  const { albums, tourDates, isLoading, isError } =
    useAlbumsAndTourDatesQueries();

  return (
    <div className={styles.page}>
      <Link to="/" className={styles.backLink}>
        ← All examples
      </Link>

      <div className={styles.content}>
        <Intro />

        <p className={styles.status}>
          {isLoading
            ? "status: loading both, together…"
            : isError
              ? "status: failed — one or both requests errored"
              : "status: ready — two cache entries, one combined result"}
        </p>

        {isError ? (
          <p className={styles.message}>Could not load the artist catalog.</p>
        ) : isLoading || !albums || !tourDates ? (
          <p className={styles.message}>Loading artist catalog...</p>
        ) : (
          <div className={styles.panels}>
            <div className={styles.panel}>
              <h2 className={styles.panelTitle}>Nova Ridge · Albums</h2>
              <ul className={styles.list}>
                {albums.map((album) => (
                  <li key={album.id} className={styles.listItem}>
                    <span className={styles.listItemPrimary}>
                      {album.title}
                    </span>
                    <span className={styles.listItemSecondary}>
                      {album.release_year}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.panel}>
              <h2 className={styles.panelTitle}>Nova Ridge · Tour Dates</h2>
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
            </div>
          </div>
        )}

        <DiscographyWidget />
      </div>
    </div>
  );
}

export default BestOfBothWorlds;
