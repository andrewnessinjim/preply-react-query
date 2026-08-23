import { Link } from "react-router-dom";
import Description from "../../components/Description";
import styles from "./ParallelQueries.module.css";

function CombinedParallelQueriesIntro() {
  return (
    <header className={styles.intro}>
      <h1 className={styles.title}>Combined Parallel Queries</h1>
      <Description>
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
      </Description>
      <Description>
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
      </Description>
      <Description>
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
      </Description>
    </header>
  );
}

export default CombinedParallelQueriesIntro;
