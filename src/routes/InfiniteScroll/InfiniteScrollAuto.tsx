import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { reviewsInfiniteAutoOptions } from "./reviewsQueries";
import type { Review } from "./types";
import useOnScreen from "./useOnScreen";
import Intro from "./InfiniteScrollAutoIntro";
import styles from "./InfiniteScroll.module.css";

function formatDate(value: string) {
  return new Date(value).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
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
