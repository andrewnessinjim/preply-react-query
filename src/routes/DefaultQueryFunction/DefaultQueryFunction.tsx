import { useState } from "react";
import { Link } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import ClockWidget from "./ClockWidget";
import Intro from "./Intro";
import QueryFnWidget from "./QueryFnWidget";
import { ADMIN_PREFIX, createDefaultQueryFnClient } from "./queryClient";
import {
  useAllPlants,
  usePlantsByCategory,
  useServerClock,
  useTeamMember,
} from "./useDefaultQueryFn";
import styles from "./DefaultQueryFunction.module.css";

function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

function Widgets() {
  const allPlants = useAllPlants();
  const succulents = usePlantsByCategory("Succulent");
  const manager = useTeamMember(1);
  const clock = useServerClock();

  return (
    <div className={styles.grid}>
      <QueryFnWidget
        title="All Plants"
        queryKey={[...ADMIN_PREFIX, "plants"]}
        explanation='queryKey[1] is the table name, no filter — the shared queryFn runs supabase.from("plants").select("*").'
        data={allPlants.data}
        isLoading={allPlants.isLoading}
        isError={allPlants.isError}
        renderRow={(row) => `${row.name} — ${formatPrice(row.price_cents)}`}
      />
      <QueryFnWidget
        title="Succulents"
        queryKey={[...ADMIN_PREFIX, "plants", { category: "Succulent" }]}
        explanation={`Same table, but queryKey[2] adds a category filter — the shared queryFn turns it into .eq("category", "Succulent").`}
        data={succulents.data}
        isLoading={succulents.isLoading}
        isError={succulents.isError}
        renderRow={(row) => `${row.name} — ${formatPrice(row.price_cents)}`}
      />
      <QueryFnWidget
        title="Account Manager"
        queryKey={[...ADMIN_PREFIX, "team_members", { id: 1 }]}
        explanation="A completely different table, filtered by id instead of category — still under the same prefix, still zero queryFn passed to useQuery."
        data={manager.data}
        isLoading={manager.isLoading}
        isError={manager.isError}
        renderRow={(row) => `${row.name} — ${row.role}, ${row.department}`}
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
