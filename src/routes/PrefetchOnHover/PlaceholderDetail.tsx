import { Link, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  plantListOptions,
  plantPlaceholderFromSummary,
  plantQueryOptions,
} from "./plantQueries";
import type { Plant, PlantSummary } from "./types";
import styles from "./PrefetchOnHover.module.css";

function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

function StatusBadge({ isPlaceholderData }: { isPlaceholderData: boolean }) {
  return (
    <span
      className={`${styles.status} ${
        isPlaceholderData ? styles.statusFetched : styles.statusCached
      }`}
    >
      {isPlaceholderData
        ? "Partial — placeholder from the list, real data still loading"
        : "Full details loaded"}
    </span>
  );
}

function DetailField({
  label,
  value,
  isPlaceholderData,
}: {
  label: string;
  value: string;
  isPlaceholderData: boolean;
}) {
  return (
    <>
      <dt>{label}</dt>
      <dd>
        {isPlaceholderData ? <span className={styles.skeleton} /> : value}
      </dd>
    </>
  );
}

function CareGuide({
  careGuide,
  isPlaceholderData,
}: {
  careGuide: string;
  isPlaceholderData: boolean;
}) {
  if (isPlaceholderData) {
    return (
      <div className={styles.careGuideSkeleton}>
        <span className={styles.skeletonLine} />
        <span className={styles.skeletonLine} />
        <span
          className={`${styles.skeletonLine} ${styles.skeletonLineShort}`}
        />
      </div>
    );
  }

  return <p className={styles.careGuide}>{careGuide}</p>;
}

function DetailPanel({
  plant,
  isPlaceholderData,
}: {
  plant: Plant;
  isPlaceholderData: boolean;
}) {
  return (
    <div className={styles.detailPanel}>
      <StatusBadge isPlaceholderData={isPlaceholderData} />

      <span className={styles.cardCategory}>{plant.category}</span>
      <h1 className={styles.title}>{plant.name}</h1>
      <p className={styles.cardPrice}>{formatPrice(plant.price_cents)}</p>

      <dl className={styles.cardDetails}>
        <DetailField
          label="Light"
          value={plant.light}
          isPlaceholderData={isPlaceholderData}
        />
        <DetailField
          label="Water"
          value={plant.water}
          isPlaceholderData={isPlaceholderData}
        />
      </dl>

      <CareGuide
        careGuide={plant.care_guide}
        isPlaceholderData={isPlaceholderData}
      />
    </div>
  );
}

function PlaceholderDetail() {
  const { plantId } = useParams();
  const id = Number(plantId);
  const queryClient = useQueryClient();

  const {
    data: plant,
    isLoading,
    isPlaceholderData,
  } = useQuery({
    ...plantQueryOptions(id),
    // Only runs while there's no real cache entry for ["plant", id] yet —
    // once the actual fetch (prefetched or on-mount) resolves, that data
    // permanently replaces this and placeholderData is never consulted
    // again for this query.
    placeholderData: () => {
      const plants = queryClient.getQueryData<PlantSummary[]>(
        plantListOptions.queryKey,
      );
      const summary = plants?.find((candidate) => candidate.id === id);
      return summary ? plantPlaceholderFromSummary(summary) : undefined;
    },
  });

  return (
    <div className={styles.page}>
      <Link to="/placeholder-data" className={styles.backLink}>
        ← Back to plant shop
      </Link>

      <div className={styles.content}>
        {isLoading || !plant ? (
          <p className={styles.message}>Loading plant details...</p>
        ) : (
          <DetailPanel plant={plant} isPlaceholderData={isPlaceholderData} />
        )}
      </div>
    </div>
  );
}

export default PlaceholderDetail;
