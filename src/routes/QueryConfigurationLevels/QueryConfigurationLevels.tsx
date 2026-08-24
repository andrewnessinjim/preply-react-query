import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import ConfigWidget from "./ConfigWidget";
import Intro from "./Intro";
import {
  CATALOG_PREFIX,
  CATALOG_STALE_TIME,
  FEATURED_STALE_TIME,
  GLOBAL_STALE_TIME,
  createConfigLevelsQueryClient,
} from "./queryClient";
import { useAllPlants, useFeaturedPlant, usePlantCategory } from "./usePlants";
import styles from "./QueryConfigurationLevels.module.css";

function Widgets() {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(interval);
  }, []);

  const allPlants = useAllPlants();
  const succulents = usePlantCategory("Succulent");
  const tropicals = usePlantCategory("Tropical");
  const featured = useFeaturedPlant();

  return (
    <div className={styles.grid}>
      <ConfigWidget
        title="All Plants"
        level="Level 1 · defaultOptions"
        queryKey={["plants"]}
        staleTimeMs={GLOBAL_STALE_TIME}
        explanation={`No staleTime on this query — it falls through to the client's defaultOptions.queries.staleTime (${GLOBAL_STALE_TIME / 1000}s).`}
        result={allPlants}
        now={now}
      />
      <ConfigWidget
        title="Succulents"
        level="Level 2 · setQueryDefaults"
        queryKey={[...CATALOG_PREFIX, "Succulent"]}
        staleTimeMs={CATALOG_STALE_TIME}
        explanation={`Its key starts with ["plants","catalog"], so setQueryDefaults matches it by prefix and overrides the global default with ${CATALOG_STALE_TIME / 1000}s.`}
        result={succulents}
        now={now}
      />
      <ConfigWidget
        title="Tropicals"
        level="Level 2 · setQueryDefaults"
        queryKey={[...CATALOG_PREFIX, "Tropical"]}
        staleTimeMs={CATALOG_STALE_TIME}
        explanation={`A different key under the same ["plants","catalog"] prefix — same fuzzy default applies, since it's matched by prefix, not by exact key.`}
        result={tropicals}
        now={now}
      />
      <ConfigWidget
        title="Featured Plant"
        level="Level 3 · direct on useQuery"
        queryKey={[...CATALOG_PREFIX, "featured"]}
        staleTimeMs={FEATURED_STALE_TIME}
        explanation="Same prefix as the two cards above, but this call passes staleTime: 0 directly — the most specific option always wins, so it ignores the fuzzy default."
        result={featured}
        now={now}
      />
    </div>
  );
}

function QueryConfigurationLevels() {
  const [queryClient] = useState(() => createConfigLevelsQueryClient());

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

export default QueryConfigurationLevels;
