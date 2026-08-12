import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { plantListOptions, plantQueryOptions } from "./plantQueries";
import styles from "./PrefetchOnHover.module.css";

function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

function PlantCatalog() {
  const { data: plants, isLoading } = useQuery(plantListOptions);
  const queryClient = useQueryClient();
  const [prefetchEnabled, setPrefetchEnabled] = useState(true);

  function handleHover(plantId: number) {
    if (!prefetchEnabled) return;
    queryClient.prefetchQuery(plantQueryOptions(plantId));
  }

  return (
    <div className={styles.page}>
      <Link to="/" className={styles.backLink}>
        ← All examples
      </Link>

      <div className={styles.content}>
        <header className={styles.intro}>
          <h1 className={styles.title}>Prefetch on Hover</h1>
          <p>
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
          </p>
          <p>
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
          </p>
        </header>

        <label className={styles.toggle}>
          <input
            type="checkbox"
            checked={prefetchEnabled}
            onChange={(event) => setPrefetchEnabled(event.target.checked)}
          />
          Prefetch on hover
        </label>

        {isLoading || !plants ? (
          <p className={styles.message}>Loading plants...</p>
        ) : (
          <div className={styles.grid}>
            {plants.map((plant) => (
              <Link
                key={plant.id}
                to={`/prefetch-on-hover/${plant.id}`}
                className={styles.card}
                onMouseEnter={() => handleHover(plant.id)}
                onFocus={() => handleHover(plant.id)}
              >
                <span className={styles.cardCategory}>{plant.category}</span>
                <h3 className={styles.cardName}>{plant.name}</h3>
                <p className={styles.cardSummary}>{plant.summary}</p>
                <span className={styles.cardPrice}>
                  {formatPrice(plant.price_cents)}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PlantCatalog;
