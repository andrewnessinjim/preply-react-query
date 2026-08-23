import { Link } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { reviewsInfiniteOptions } from "./reviewsQueries";
import type { Review } from "./types";
import Intro from "./InfiniteScrollIntro";
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
