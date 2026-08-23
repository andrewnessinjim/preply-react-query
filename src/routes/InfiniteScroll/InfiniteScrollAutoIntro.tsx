import { Link } from "react-router-dom";
import Description from "../../components/Description";
import styles from "./InfiniteScroll.module.css";

function InfiniteScrollAutoIntro() {
  return (
    <header className={styles.intro}>
      <h1 className={styles.title}>Infinite Scroll (Auto)</h1>
      <Description>
        Same 220 reviews, same 10-at-a-time <code>useInfiniteQuery</code>{" "}
        underneath as{" "}
        <Link to="/infinite-scroll" className={styles.inlineLink}>
          Infinite Scroll
        </Link>{" "}
        — it even reuses that demo's exact <code>fetchReviewsPage</code>{" "}
        fetcher and <code>getNextPageParam</code> logic. It runs under its
        own <code>queryKey</code> though, so the two pages don't share
        progress: this one always starts back at the first 10.
      </Description>
      <Description>
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
      </Description>
      <Description>
        <code>useOnScreen</code> is called with a <code>rootMargin</code> of{" "}
        <code>"200px"</code> — that tells the observer to count the sentinel
        as "on screen" while it's still 200px below the actual viewport
        edge, not only once it's literally visible. That gives the fetch a
        head start of roughly however long it takes to scroll those last
        200px, so the next page has a real chance to land before you
        actually reach the bottom, instead of you scrolling straight into a
        visible gap.
      </Description>
    </header>
  );
}

export default InfiniteScrollAutoIntro;
