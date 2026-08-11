import { Link } from "react-router-dom";
import { useAlbumsAndTourDatesQueries } from "./useArtistCatalog";
import DiscographyWidget from "./DiscographyWidget";
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
        <header className={styles.intro}>
          <h1 className={styles.title}>Best of Both Worlds</h1>
          <p>
            <code>useQueries()</code> takes an array of query configs and
            gives back an array of results — genuinely two separate queries,
            each with its own cache entry, exactly like{" "}
            <Link to="/parallel-queries" className={styles.inlineLink}>
              Parallel Queries
            </Link>
            . The trick is its <code>combine</code> option: it lets you
            collapse that array into one shape of your choosing before it
            ever reaches your component. Here <code>combine</code> ORs the
            two <code>isLoading</code> flags and the two <code>isError</code>{" "}
            flags together, so the component only ever sees one of each —
            the single loading state{" "}
            <Link
              to="/combined-parallel-queries"
              className={styles.inlineLink}
            >
              Combined Parallel Queries
            </Link>{" "}
            had to fold both fetches into one query to get.
          </p>
          <p>
            And the query keys here are the exact same ones{" "}
            <code>useAlbums()</code> and <code>useTourDates()</code> use —{" "}
            <code>["artist-albums", "Nova Ridge"]</code> and{" "}
            <code>["artist-tour-dates", "Nova Ridge"]</code>, not a third,
            clubbed-together key. The sidebar widget below calls{" "}
            <code>useAlbums()</code> directly, completely independently of
            this page. Open the <strong>Network tab</strong>: only{" "}
            <strong>one</strong> request hits the albums table, not two —
            because as far as TanStack Query is concerned, this page and
            that widget are asking for the exact same thing. That's the
            deduplication{" "}
            <Link
              to="/combined-parallel-queries"
              className={styles.inlineLink}
            >
              Combined Parallel Queries
            </Link>{" "}
            gave up.
          </p>
          <p>
            None of this is free, either. For a fixed pair of queries like
            this one, <code>useQueries</code> plus <code>combine</code> is
            genuinely more machinery than just calling{" "}
            <code>useAlbums()</code> and <code>useTourDates()</code>{" "}
            separately and writing{" "}
            <code>albumsQuery.isLoading || tourDatesQuery.isLoading</code>{" "}
            yourself — for two known queries, that's arguably simpler than
            this page's array-plus-combine shape. Where{" "}
            <code>useQueries</code> actually earns its keep is when the{" "}
            <em>number</em> of queries isn't fixed at build time — one query
            per row in a list you only know the length of at render time,
            say — since you can't call <code>useQuery</code> in a loop.
            This demo just shows the shape of the API on a simple,
            two-query case.
          </p>
        </header>

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
