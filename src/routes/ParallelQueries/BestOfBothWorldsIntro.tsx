import { Link } from "react-router-dom";
import Description from "../../components/Description";
import styles from "./ParallelQueries.module.css";

function BestOfBothWorldsIntro() {
  return (
    <header className={styles.intro}>
      <h1 className={styles.title}>Best of Both Worlds</h1>
      <Description>
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
      </Description>
      <Description>
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
      </Description>
      <Description>
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
      </Description>
    </header>
  );
}

export default BestOfBothWorldsIntro;
