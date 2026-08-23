import { Link } from "react-router-dom";
import Description from "../../components/Description";
import styles from "./InfiniteScroll.module.css";

function InfiniteScrollIntro() {
  return (
    <header className={styles.intro}>
      <h1 className={styles.title}>Infinite Scroll</h1>
      <Description>
        220 reviews, loaded 10 at a time. <code>useInfiniteQuery</code> keeps
        every page you've fetched so far as one growing array —{" "}
        <code>data.pages</code> — instead of swapping one page's rows out for
        another the way{" "}
        <Link to="/pagination" className={styles.inlineLink}>
          Pagination
        </Link>{" "}
        does. Click <strong>More…</strong> and it calls{" "}
        <code>fetchNextPage()</code>, which re-runs the same{" "}
        <code>queryFn</code> with whatever <code>pageParam</code>{" "}
        <code>getNextPageParam</code> handed back last time — here, just "the
        next offset," computed from how many rows have loaded against the
        total the first request's <code>count: "exact"</code> reported.
      </Description>
      <Description>
        <code>reviewsInfiniteOptions</code> is built with{" "}
        <code>infiniteQueryOptions()</code> — the infinite-query sibling of{" "}
        <code>queryOptions()</code> from the earlier prefetching demos — and
        the whole list lives under one <code>queryKey</code>:{" "}
        <code>["reviews", "infinite"]</code>. There's no page number in the
        key at all, because there's no such thing as "page 3" on its own here
        — there's just the one query with three pages loaded into it so far.
        Once <code>getNextPageParam</code> returns <code>undefined</code> —
        no rows left past what's already loaded — <code>hasNextPage</code>{" "}
        flips to <code>false</code> and the button disappears.
      </Description>
      <Description>
        A click is one way to trigger <code>fetchNextPage()</code> — it's
        not the only one.{" "}
        <Link to="/infinite-scroll-auto" className={styles.inlineLink}>
          Infinite Scroll (Auto)
        </Link>{" "}
        fetches the same reviews the same way, but calls it automatically
        once you scroll near the bottom, using a custom hook built on{" "}
        <code>IntersectionObserver</code> instead of a button's{" "}
        <code>onClick</code>.
      </Description>
    </header>
  );
}

export default InfiniteScrollIntro;
