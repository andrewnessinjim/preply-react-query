import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { plantListOptions, plantQueryOptions } from "./plantQueries";
import Intro from "./PlantCatalogIntro";
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
        <Intro />

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
