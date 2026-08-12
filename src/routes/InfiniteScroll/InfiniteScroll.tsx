import { Link } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { reviewsInfiniteOptions, type Review } from "./reviewsQueries";
import styles from "./InfiniteScroll.module.css";

function formatDate(value: string) {
  return new Date(value).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function Intro() {
  return (
    <header className={styles.intro}>
      <h1 className={styles.title}>Infinite Scroll</h1>
      <p>
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
      </p>
      <p>
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
      </p>
      <p>
        A click is one way to trigger <code>fetchNextPage()</code> — it's
        not the only one.{" "}
        <Link to="/infinite-scroll-auto" className={styles.inlineLink}>
          Infinite Scroll (Auto)
        </Link>{" "}
        fetches the same reviews the same way, but calls it automatically
        once you scroll near the bottom, using a custom hook built on{" "}
        <code>IntersectionObserver</code> instead of a button's{" "}
        <code>onClick</code>.
      </p>
    </header>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <span className={styles.stars} aria-label={`${rating} out of 5 stars`}>
      {"★".repeat(rating)}
      <span className={styles.starsEmpty}>{"★".repeat(5 - rating)}</span>
    </span>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <li className={styles.reviewCard}>
      <div className={styles.reviewHeader}>
        <StarRating rating={review.rating} />
        <span className={styles.reviewDate}>
          {formatDate(review.created_at)}
        </span>
      </div>
      <h3 className={styles.reviewTitle}>{review.title}</h3>
      <p className={styles.reviewBody}>{review.body}</p>
      <p className={styles.reviewAuthor}>— {review.author_name}</p>
    </li>
  );
}

function InfiniteScroll() {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(reviewsInfiniteOptions);

  const reviews = data?.pages.flatMap((page) => page.items) ?? [];
  const totalCount = data?.pages[0]?.totalCount ?? 0;

  return (
    <div className={styles.page}>
      <Link to="/" className={styles.backLink}>
        ← All examples
      </Link>

      <div className={styles.content}>
        <Intro />

        {isLoading ? (
          <p className={styles.message}>Loading reviews...</p>
        ) : (
          <>
            <p className={styles.count}>
              Showing {reviews.length} of {totalCount} reviews
            </p>

            <ul className={styles.reviewList}>
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </ul>

            {hasNextPage && (
              <button
                type="button"
                className={styles.moreButton}
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
              >
                {isFetchingNextPage ? "Loading…" : "More…"}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default InfiniteScroll;
