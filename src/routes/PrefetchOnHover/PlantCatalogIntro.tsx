import { Link } from "react-router-dom";
import Description from "../../components/Description";
import styles from "./PrefetchOnHover.module.css";

function PlantCatalogIntro() {
  return (
    <header className={styles.intro}>
      <h1 className={styles.title}>Prefetch on Hover</h1>
      <Description>
        Clicking a plant below opens its detail page, which needs more
        than the list row has — full care instructions, not just a name
        and a price — so its <code>queryFn</code> is deliberately slow, a
        stand-in for a heavier lookup than the catalog page itself needed.
        <code>plantQueryOptions(id)</code> in{" "}
        <code>plantQueries.ts</code> is a single object holding that
        query's key, fetcher, and <code>staleTime</code>. The list page's{" "}
        <code>onMouseEnter</code> hands it to{" "}
        <code>queryClient.prefetchQuery()</code>; the detail page hands
        the exact same object to <code>useQuery()</code>. Same key, same
        fetcher — not two definitions that happen to agree today.
      </Description>
      <Description>
        Leave the checkbox on, hover a card for a moment, then click:
        the detail page just appears, no loading state at all, because
        the hover already ran the fetch and cached the result before you
        ever clicked. Turn it off and click a card cold — you'll sit
        through the full ~700ms every time.{" "}
        <code>staleTime: 30000</code> is what makes the cached result
        still count as fresh by the time the detail page mounts;
        without it, the prefetch would still save the click, but
        mounting would immediately kick off a second background refetch
        anyway. And if you click mid-hover, before the prefetch settles,
        you still don't get a duplicate request — the detail page's{" "}
        <code>useQuery</code> just subscribes to the fetch already in
        flight, the same{" "}
        <Link to="/deduplication" className={styles.inlineLink}>
          deduplication
        </Link>{" "}
        at work there.
      </Description>
    </header>
  );
}

export default PlantCatalogIntro;
