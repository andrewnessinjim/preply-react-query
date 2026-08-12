import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  plantListOptions,
  plantQueryOptions,
  type PlantSummary,
} from "./plantQueries";
import styles from "./PrefetchOnHover.module.css";

function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

function Intro() {
  return (
    <header className={styles.intro}>
      <h1 className={styles.title}>Placeholder Data</h1>
      <p>
        Same slow ~700ms detail fetch as{" "}
        <Link to="/prefetch-on-hover" className={styles.inlineLink}>
          Prefetch on Hover
        </Link>
        , but this time the detail page's <code>useQuery</code> also gets a{" "}
        <code>placeholderData</code> function. It reads{" "}
        <code>["plants"]</code> — this list's own cache entry, already
        sitting there from the query that rendered the page below — and
        hands back whichever row matches the id you clicked, reshaped into a
        full <code>Plant</code> with empty strings standing in for the
        light/water/care fields the list row never had. That's not a fetch;
        it's data this page already paid for, wearing the shape the detail
        page expects.
      </p>
      <p>
        Click any plant below <em>without</em> hovering first: the name,
        category, and price appear instantly, pulled straight from this
        list, while the light, water, and care guide sit behind a skeleton
        until the real fetch lands a moment later. Compare that to Prefetch
        on Hover, where a cold click gets you nothing but a spinner until
        the whole row arrives at once. <code>isPlaceholderData</code> is how
        the detail page tells "stand-in" from "real": true while it's
        showing the filled-in placeholder, false the moment the actual row
        comes back and replaces it. The checkbox below still controls
        prefetching — turn it on and hover long enough before clicking, and
        the real fetch beats you there, so the skeleton never gets a chance
        to show up.
      </p>
    </header>
  );
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
