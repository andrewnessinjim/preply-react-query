import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { plantListOptions, plantQueryOptions } from "./plantQueries";
import type { PlantSummary } from "./types";
import Intro from "./PlaceholderCatalogIntro";
import styles from "./PrefetchOnHover.module.css";

function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

function PrefetchToggle({
  enabled,
  onChange,
}: {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}) {
  return (
    <label className={styles.toggle}>
      <input
        type="checkbox"
        checked={enabled}
        onChange={(event) => onChange(event.target.checked)}
      />
      Prefetch on hover
    </label>
  );
}

function PlantCard({
  plant,
  onHover,
}: {
  plant: PlantSummary;
  onHover: (plantId: number) => void;
}) {
  return (
    <Link
      to={`/placeholder-data/${plant.id}`}
      className={styles.card}
      onMouseEnter={() => onHover(plant.id)}
      onFocus={() => onHover(plant.id)}
    >
      <span className={styles.cardCategory}>{plant.category}</span>
      <h3 className={styles.cardName}>{plant.name}</h3>
      <p className={styles.cardSummary}>{plant.summary}</p>
      <span className={styles.cardPrice}>
        {formatPrice(plant.price_cents)}
      </span>
    </Link>
  );
}

function PlantGrid({
  plants,
  onHover,
}: {
  plants: PlantSummary[];
  onHover: (plantId: number) => void;
}) {
  return (
    <div className={styles.grid}>
      {plants.map((plant) => (
        <PlantCard key={plant.id} plant={plant} onHover={onHover} />
      ))}
    </div>
  );
}

function PlaceholderCatalog() {
  const { data: plants, isLoading } = useQuery(plantListOptions);
  const queryClient = useQueryClient();
  const [prefetchEnabled, setPrefetchEnabled] = useState(false);

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

        <PrefetchToggle enabled={prefetchEnabled} onChange={setPrefetchEnabled} />

        {isLoading || !plants ? (
          <p className={styles.message}>Loading plants...</p>
        ) : (
          <PlantGrid plants={plants} onHover={handleHover} />
        )}
      </div>
    </div>
  );
}

export default PlaceholderCatalog;
