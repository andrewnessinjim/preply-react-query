import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { inventoryPageOptions, PAGE_SIZE, SORT_FIELDS } from "./inventoryQueries";
import type { InventoryItem, SortField } from "./types";
import Intro from "./Intro";
import styles from "./Pagination.module.css";

function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
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
