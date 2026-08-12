import { useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { plantQueryOptions } from "./plantQueries";
import styles from "./PrefetchOnHover.module.css";

function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

function PlantDetail() {
  const { plantId } = useParams();
  const id = Number(plantId);
  const options = plantQueryOptions(id);
  const queryClient = useQueryClient();

  // Checked once, on the first render, before useQuery below can populate
  // the cache itself — this is the only reliable way to tell "the hover
  // already fetched this" apart from "this component's own mount triggered
  // the fetch," since by the time isLoading updates either story looks the
  // same.
  const wasCachedRef = useRef<boolean | null>(null);
  if (wasCachedRef.current === null) {
    wasCachedRef.current =
      queryClient.getQueryData(options.queryKey) !== undefined;
  }

  const { data: plant, isLoading } = useQuery(options);

  return (
    <div className={styles.page}>
      <Link to="/prefetch-on-hover" className={styles.backLink}>
        ← Back to plant shop
      </Link>

      <div className={styles.content}>
        {isLoading || !plant ? (
          <p className={styles.message}>Loading plant details...</p>
        ) : (
          <div className={styles.detailPanel}>
            <span
              className={`${styles.status} ${
                wasCachedRef.current ? styles.statusCached : styles.statusFetched
              }`}
            >
              {wasCachedRef.current
                ? "Instant — served from cache, no request on mount"
                : "Fetched on mount — nothing was prefetched"}
            </span>

            <span className={styles.cardCategory}>{plant.category}</span>
            <h1 className={styles.title}>{plant.name}</h1>
            <p className={styles.cardPrice}>{formatPrice(plant.price_cents)}</p>

            <dl className={styles.cardDetails}>
              <dt>Light</dt>
              <dd>{plant.light}</dd>
              <dt>Water</dt>
              <dd>{plant.water}</dd>
            </dl>

            <p className={styles.careGuide}>{plant.care_guide}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PlantDetail;
