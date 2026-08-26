import { useState } from "react";
import { Link } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import ClockWidget from "./ClockWidget";
import Intro from "./Intro";
import QueryFnWidget from "./QueryFnWidget";
import { PLANTS_KEY, createDefaultQueryFnClient } from "./queryClient";
import {
  useAllPlants,
  usePlantById,
  usePlantsByCategory,
  usePlantsByCategoryAndLight,
  useServerClock,
} from "./useDefaultQueryFn";
import styles from "./DefaultQueryFunction.module.css";

function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

function Widgets() {
  const allPlants = useAllPlants();
  const succulents = usePlantsByCategory("Succulent");
  const singlePlant = usePlantById(1);
  const brightTropical = usePlantsByCategoryAndLight(
    "Tropical",
    "Bright indirect",
  );
  const clock = useServerClock();

  return (
    <div className={styles.grid}>
      <QueryFnWidget
        title="All Plants"
        queryKey={PLANTS_KEY}
        explanation='queryKey[0] is the table name, no filter — the shared queryFn runs supabase.from("plants").select("*").'
        data={allPlants.data}
        isLoading={allPlants.isLoading}
        isError={allPlants.isError}
        renderRow={(row) => `${row.name} — ${formatPrice(row.price_cents)}`}
      />
      <QueryFnWidget
        title="Succulents"
        queryKey={[...PLANTS_KEY, { category: "Succulent" }]}
        explanation={`Same table, but queryKey[1] adds a category filter — the shared queryFn turns it into .eq("category", "Succulent").`}
        data={succulents.data}
        isLoading={succulents.isLoading}
        isError={succulents.isError}
        renderRow={(row) => `${row.name} — ${formatPrice(row.price_cents)}`}
      />
      <QueryFnWidget
        title="Single Plant"
        queryKey={[...PLANTS_KEY, { id: 1 }]}
        explanation="Same table as the first widget, but queryKey[1] filters by id instead of category — still under the same prefix, still zero queryFn passed to useQuery."
        data={singlePlant.data}
        isLoading={singlePlant.isLoading}
        isError={singlePlant.isError}
        renderRow={(row) => `${row.name} — ${formatPrice(row.price_cents)}`}
      />
      <QueryFnWidget
        title="Bright Tropicals"
        queryKey={[
          ...PLANTS_KEY,
          { category: "Tropical", light: "Bright indirect" },
        ]}
        explanation='Two-column filter: queryKey[1] has both category and light, and the shared queryFn .eq()s each one in turn — narrowing the 3 Tropical plants down to the 2 that also want bright indirect light, leaving out Boston Fern (Tropical, but medium indirect).'
        data={brightTropical.data}
        isLoading={brightTropical.isLoading}
        isError={brightTropical.isError}
        renderRow={(row) => `${row.name} — ${formatPrice(row.price_cents)}`}
      />
      <ClockWidget time={clock.data} />
    </div>
  );
}

function DefaultQueryFunction() {
  const [queryClient] = useState(() => createDefaultQueryFnClient());

  return (
    <QueryClientProvider client={queryClient}>
      <div className={styles.page}>
        <Link to="/" className={styles.backLink}>
          ← All examples
        </Link>

        <div className={styles.content}>
          <Intro />
          <Widgets />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default DefaultQueryFunction;
