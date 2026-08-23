import { Link } from "react-router-dom";
import Description from "../../components/Description";
import styles from "./Pagination.module.css";

function Intro() {
  return (
    <header className={styles.intro}>
      <h1 className={styles.title}>Pagination</h1>
      <Description>
        A warehouse inventory table: 130 SKUs, 10 rows a page, sortable by four
        different columns. Every page number and every sort field combine into a
        distinct <code>queryKey</code> —{" "}
        <code>["inventory", sortField, page]</code> — so clicking{" "}
        <strong>Next</strong> or switching the sort dropdown always points at a
        query TanStack Query has never fetched before. Without help, that means
        a loading state on every single click.
      </Description>
      <Description>
        <code>inventoryPageOptions()</code> sets{" "}
        <code>placeholderData: keepPreviousData</code>, a built-in helper that's
        really just{" "}
        <code>placeholderData: (previousData) =&gt; previousData</code> —
        whatever rows were on screen a moment ago stay on screen while the new
        page/sort combination fetches for real. The table below dims to half
        opacity exactly while <code>isPlaceholderData</code> is true — while
        what's rendered is really a different page's rows, standing in until the
        real ones arrive. Click <strong>Previous</strong> back to a page you've
        already visited and it snaps back with no dimming at all: that page's
        own data is already sitting in the cache, so it's shown immediately as
        itself, not as a placeholder, even though a background refetch is still
        quietly revalidating it underneath.
      </Description>
      <Description>
        The checkbox below is a different kind of prefetch than the earlier{" "}
        <Link to="/prefetch-on-hover" className={styles.inlineLink}>
          Prefetch on Hover
        </Link>{" "}
        demo, which waited for you to hover a specific card. Here there's no one
        card to hover — "Next" is just overwhelmingly the likely next click — so
        a <code>useEffect</code> calls{" "}
        <code>
          queryClient.prefetchQuery(inventoryPageOptions(page + 1, sortField))
        </code>{" "}
        on its own, right after the current page's <em>real</em> data lands (it
        waits for <code>isPlaceholderData</code> to go false first, so it never
        prefetches off of stale placeholder rows). By the time you click{" "}
        <strong>Next</strong>, that page is usually already sitting in the cache
        — <code>staleTime: 5000</code> is what keeps it counting as fresh for
        the few seconds between the prefetch and the click, so landing on it
        doesn't immediately trigger a redundant refetch.
      </Description>
    </header>
  );
}

export default Intro;
