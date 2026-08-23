import { infiniteQueryOptions } from "@tanstack/react-query";
import { supabase } from "../../lib/supabaseClient";
import type { ReviewsPage } from "./types";

export const REVIEWS_PAGE_SIZE = 10;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchReviewsPage(pageParam: number): Promise<ReviewsPage> {
  const from = pageParam * REVIEWS_PAGE_SIZE;
  const to = from + REVIEWS_PAGE_SIZE - 1;

  // Deliberately slow, standing in for a real reviews feed heavy enough
  // that clicking "More…" repeatedly would be an obviously bad time
  // without something showing the fetch is actually in progress.
  const [{ data, error, count }] = await Promise.all([
    supabase
      .from("reviews")
      .select("id, author_name, rating, title, body, created_at", {
        count: "exact",
      })
      .order("created_at", { ascending: false })
      .range(from, to),
    sleep(500),
  ]);
  if (error) throw error;

  const items = data ?? [];
  const loadedSoFar = from + items.length;

  return {
    items,
    totalCount: count ?? 0,
    // undefined tells useInfiniteQuery there's nothing left to fetch —
    // that's what flips hasNextPage to false once every row has loaded.
    nextPageParam: loadedSoFar < (count ?? 0) ? pageParam + 1 : undefined,
  };
}

// The infinite-query sibling of queryOptions() from the earlier prefetching
// demos: same idea, a portable typed options object, just shaped for a
// query that accumulates pages instead of replacing one page with another.
export const reviewsInfiniteOptions = infiniteQueryOptions({
  queryKey: ["reviews", "infinite"],
  queryFn: ({ pageParam }: { pageParam: number }) => fetchReviewsPage(pageParam),
  initialPageParam: 0,
  getNextPageParam: (lastPage) => lastPage.nextPageParam,
});

// Same fetcher, same paging logic — the Infinite Scroll (Auto) demo just
// triggers fetchNextPage() from an IntersectionObserver instead of a click.
// It gets its own queryKey so the two demo pages don't share load progress:
// visiting one never leaves the other starting off already midway through
// the list.
export const reviewsInfiniteAutoOptions = infiniteQueryOptions({
  queryKey: ["reviews", "infinite", "auto"],
  queryFn: ({ pageParam }: { pageParam: number }) => fetchReviewsPage(pageParam),
  initialPageParam: 0,
  getNextPageParam: (lastPage) => lastPage.nextPageParam,
});
