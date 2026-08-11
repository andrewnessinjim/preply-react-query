import { Link } from "react-router-dom";
import { useAlbumsAndTourDates } from "./useArtistCatalog";
import { useLoadDuration } from "./useLoadDuration";
import AlbumsWidget from "./AlbumsWidget";
import styles from "./ParallelQueries.module.css";

function formatDate(value: string) {
  return new Date(value).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function CombinedParallelQueries() {
  const { data, isLoading, isError } = useAlbumsAndTourDates();
  const duration = useLoadDuration(!isLoading);

  return (
    <div className={styles.page}>
      <Link to="/" className={styles.backLink}>
        ← All examples
      </Link>

      <div className={styles.content}>
        <header className={styles.intro}>
          <h1 className={styles.title}>Combined Parallel Queries</h1>
          <p>
            Same artist, same two lists, same two Supabase calls firing in
            parallel underneath — but this time{" "}
            <code>useAlbumsAndTourDates()</code>{" "}
            wraps both inside <em>one</em> <code>queryFn</code> with{" "}
            <code>Promise.all([fetchAlbums(), fetchTourDates()])</code>. As
            far as TanStack Query is concerned there's now only a single
            query, so there's only a single <code>isLoading</code> and a
            single <code>isError</code> — the "combine two loading states by
            hand" problem the{" "}
            <Link to="/parallel-queries" className={styles.inlineLink}>
              plain Parallel Queries
            </Link>{" "}
            demo left open.
          </p>
          <p>
            Reload the page and compare it to that one. There, Albums
            appeared almost instantly and Tour Dates dragged in seconds
            later. Here, nothing appears until <em>both</em> are done —
            which means the whole page now waits on the slower of the two,
            even though the album list was sitting there ready over a
            second earlier. A single loading state isn't free: you trade
            away the fast piece's head start for one clean "it's all here or
            it isn't" moment. And because it's genuinely one query now, a
            failure on either side fails the whole thing — there's no
            "albums loaded fine, tour dates didn't."
          </p>
          <p>
            There's a third cost, and it's quieter: the cache entry is
            clubbed too. The album list only exists nested inside{" "}
            <code>["artist-catalog-combined", "Nova Ridge"]</code> now — it
            has no cache entry of its own. The widget below is a stand-in
            for some unrelated part of the app that only ever wanted the
            albums — a "Discography" module in a sidebar, say. It calls the
            exact same underlying fetch, but under its own query key,
            because that's the only album data it knows how to ask for.
            TanStack Query has no way to notice these two queries want the
            same rows; it just fetches them twice. Open the{" "}
            <strong>Network tab</strong>: two requests hit the albums table
            on load, not one, and the{" "}
            <strong>TanStack Query Devtools</strong> will show two separate
            cache entries carrying the same albums, not sharing one.
          </p>
        </header>

        <p className={styles.status}>
          {isLoading
            ? "status: loading both, together…"
            : isError
              ? "status: failed — one or both requests errored"
              : duration !== null
                ? `status: ready — both landed together after ${duration}ms`
                : null}
        </p>

        {isError ? (
          <p className={styles.message}>Could not load the artist catalog.</p>
        ) : isLoading || !data ? (
          <p className={styles.message}>Loading artist catalog...</p>
        ) : (
          <div className={styles.panels}>
            <div className={styles.panel}>
              <h2 className={styles.panelTitle}>Nova Ridge · Albums</h2>
              <ul className={styles.list}>
                {data.albums.map((album) => (
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
                {data.tourDates.map((tourDate) => (
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

        <AlbumsWidget />
      </div>
    </div>
  );
}

export default CombinedParallelQueries;
