import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { reviewsInfiniteAutoOptions, type Review } from "./reviewsQueries";
import useOnScreen from "./useOnScreen";
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
      <h1 className={styles.title}>Infinite Scroll (Auto)</h1>
      <p>
        Same 220 reviews, same 10-at-a-time <code>useInfiniteQuery</code>{" "}
        underneath as{" "}
        <Link to="/infinite-scroll" className={styles.inlineLink}>
          Infinite Scroll
        </Link>{" "}
        — it even reuses that demo's exact <code>fetchReviewsPage</code>{" "}
        fetcher and <code>getNextPageParam</code> logic. It runs under its
        own <code>queryKey</code> though, so the two pages don't share
        progress: this one always starts back at the first 10.
      </p>
      <p>
        The difference is what calls <code>fetchNextPage()</code>.{" "}
        <code>useOnScreen()</code> is a small custom hook wrapping the
        browser's <code>IntersectionObserver</code> — hand it a ref, and it
        gives back <code>isOnScreen</code>, a boolean that flips to{" "}
        <code>true</code> the moment the element that ref is attached to
        enters the viewport. There's an empty <code>&lt;div&gt;</code> sitting
        right after the last loaded review — a "sentinel" with nothing to
        look at, just something to watch. A <code>useEffect</code> here
        calls <code>fetchNextPage()</code> as soon as that sentinel becomes
        visible, as long as there's a next page and nothing's already
        fetching. Scroll to the bottom and the list just keeps growing on
        its own — no button, no click.
      </p>
      <p>
        <code>useOnScreen</code> is called with a <code>rootMargin</code> of{" "}
        <code>"200px"</code> — that tells the observer to count the sentinel
        as "on screen" while it's still 200px below the actual viewport
        edge, not only once it's literally visible. That gives the fetch a
        head start of roughly however long it takes to scroll those last
        200px, so the next page has a real chance to land before you
        actually reach the bottom, instead of you scrolling straight into a
        visible gap.
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

function InfiniteScrollAuto() {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(reviewsInfiniteAutoOptions);

  const { ref: sentinelRef, isOnScreen } = useOnScreen<HTMLDivElement>(
    "200px",
  );

  useEffect(() => {
    if (isOnScreen && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isOnScreen, hasNextPage, isFetchingNextPage, fetchNextPage]);

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

            <div ref={sentinelRef} className={styles.sentinel} />

            {isFetchingNextPage && (
              <p className={styles.sentinelStatus}>Loading more…</p>
            )}
            {!hasNextPage && (
              <p className={styles.sentinelStatus}>
                You've reached the end — all {totalCount} reviews loaded.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default InfiniteScrollAuto;
