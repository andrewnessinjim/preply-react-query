import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  inventoryPageOptions,
  PAGE_SIZE,
  SORT_FIELDS,
  type InventoryItem,
  type SortField,
} from "./inventoryQueries";
import styles from "./Pagination.module.css";

function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

function Intro() {
  return (
    <header className={styles.intro}>
      <h1 className={styles.title}>Pagination</h1>
      <p>
        A warehouse inventory table: 130 SKUs, 10 rows a page, sortable by four
        different columns. Every page number and every sort field combine into a
        distinct <code>queryKey</code> —{" "}
        <code>["inventory", sortField, page]</code> — so clicking{" "}
        <strong>Next</strong> or switching the sort dropdown always points at a
        query TanStack Query has never fetched before. Without help, that means
        a loading state on every single click.
      </p>
      <p>
        <code>inventoryPageOptions()</code> sets{" "}
        <code>placeholderData: keepPreviousData</code>, a built-in helper that's
        really just{" "}
        <code>placeholderData: (previousData) =&gt; previousData</code> —
        whatever rows were on screen a moment ago stay on screen while the new
        page/sort combination fetches for real. The table below dims to half
        opacity exactly while <code>isPlaceholderData</code> is true — while
        what's rendered is really a different page's rows, standing in until the
        real ones arrive. Click <strong>Previous</strong> back to a page you've
        already visited and it snaps back with no dimming at all: that page's
        own data is already sitting in the cache, so it's shown immediately as
        itself, not as a placeholder, even though a background refetch is still
        quietly revalidating it underneath.
      </p>
      <p>
        The checkbox below is a different kind of prefetch than the earlier{" "}
        <Link to="/prefetch-on-hover" className={styles.inlineLink}>
          Prefetch on Hover
        </Link>{" "}
        demo, which waited for you to hover a specific card. Here there's no one
        card to hover — "Next" is just overwhelmingly the likely next click — so
        a <code>useEffect</code> calls{" "}
        <code>
          queryClient.prefetchQuery(inventoryPageOptions(page + 1, sortField))
        </code>{" "}
        on its own, right after the current page's <em>real</em> data lands (it
        waits for <code>isPlaceholderData</code> to go false first, so it never
        prefetches off of stale placeholder rows). By the time you click{" "}
        <strong>Next</strong>, that page is usually already sitting in the cache
        — <code>staleTime: 5000</code> is what keeps it counting as fresh for
        the few seconds between the prefetch and the click, so landing on it
        doesn't immediately trigger a redundant refetch.
      </p>
    </header>
  );
}

function SortSelect({
  value,
  onChange,
}: {
  value: SortField;
  onChange: (field: SortField) => void;
}) {
  return (
    <label className={styles.sortRow}>
      Sort by
      <select
        className={styles.sortSelect}
        value={value}
        onChange={(event) => onChange(event.target.value as SortField)}
      >
        {SORT_FIELDS.map((field) => (
          <option key={field.value} value={field.value}>
            {field.label}
          </option>
        ))}
      </select>
    </label>
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
      Prefetch next page
    </label>
  );
}

function InventoryRow({ item }: { item: InventoryItem }) {
  return (
    <tr>
      <td>{item.name}</td>
      <td className={styles.sku}>{item.sku}</td>
      <td>{item.category}</td>
      <td>{formatPrice(item.price_cents)}</td>
      <td>{item.stock}</td>
    </tr>
  );
}

function InventoryTable({
  items,
  isPlaceholderData,
}: {
  items: InventoryItem[];
  isPlaceholderData: boolean;
}) {
  return (
    <div
      className={styles.tableWrap}
      style={{ opacity: isPlaceholderData ? 0.5 : 1 }}
    >
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>SKU</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <InventoryRow key={item.id} item={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PaginationControls({
  page,
  totalPages,
  isFetching,
  onPrevious,
  onNext,
}: {
  page: number;
  totalPages: number;
  isFetching: boolean;
  onPrevious: () => void;
  onNext: () => void;
}) {
  return (
    <div className={styles.paginationRow}>
      <button
        type="button"
        className={styles.pageButton}
        onClick={onPrevious}
        disabled={page <= 1 || isFetching}
      >
        ← Previous
      </button>
      <span className={styles.pageIndicator}>
        Page {page} of {totalPages || 1}
      </span>
      <button
        type="button"
        className={styles.pageButton}
        onClick={onNext}
        disabled={page >= totalPages || isFetching}
      >
        Next →
      </button>
    </div>
  );
}

function Pagination() {
  const [page, setPage] = useState(1);
  const [sortField, setSortField] = useState<SortField>("name");
  const [prefetchEnabled, setPrefetchEnabled] = useState(true);
  const queryClient = useQueryClient();

  const { data, isLoading, isFetching, isPlaceholderData } = useQuery(
    inventoryPageOptions(page, sortField),
  );

  const totalPages = data ? Math.ceil(data.totalCount / PAGE_SIZE) : 0;

  function handleSortChange(field: SortField) {
    setSortField(field);
    setPage(1);
  }

  useEffect(() => {
    if (prefetchEnabled && page + 1 <= totalPages) {
      queryClient.prefetchQuery(inventoryPageOptions(page + 1, sortField));
    }
  }, [totalPages, page, sortField, queryClient, prefetchEnabled]);

  return (
    <div className={styles.page}>
      <Link to="/" className={styles.backLink}>
        ← All examples
      </Link>

      <div className={styles.content}>
        <Intro />

        <div className={styles.toolbar}>
          <div className={styles.toolbarControls}>
            <SortSelect value={sortField} onChange={handleSortChange} />
            <PrefetchToggle
              enabled={prefetchEnabled}
              onChange={setPrefetchEnabled}
            />
          </div>
          {isPlaceholderData && (
            <span className={styles.fetchingBadge}>Fetching…</span>
          )}
        </div>

        {isLoading || !data ? (
          <p className={styles.message}>Loading inventory...</p>
        ) : (
          <>
            <InventoryTable
              items={data.items}
              isPlaceholderData={isPlaceholderData}
            />
            <PaginationControls
              page={page}
              totalPages={totalPages}
              isFetching={isFetching}
              onPrevious={() => setPage((current) => Math.max(1, current - 1))}
              onNext={() =>
                setPage((current) => Math.min(totalPages, current + 1))
              }
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Pagination;
