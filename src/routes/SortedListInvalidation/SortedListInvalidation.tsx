import { useState } from "react";
import { Link } from "react-router-dom";
import { useSortedItems, SORTABLE_FIELDS } from "./useSortedItems";
import ItemRow from "./ItemRow";
import Intro from "./Intro";
import type { SortableField } from "./types";
import styles from "./SortedListInvalidation.module.css";

function SortedListInvalidation() {
  const [sortField, setSortField] = useState<SortableField>("name");
  const {
    data: items,
    isLoading,
    isFetching,
    isPlaceholderData,
  } = useSortedItems(sortField);

  return (
    <div className={styles.page}>
      <Link to="/" className={styles.backLink}>
        ← All examples
      </Link>

      <div className={styles.content}>
        <Intro />

        <div className={styles.controls}>
          {SORTABLE_FIELDS.map((field) => (
            <button
              key={field.value}
              type="button"
              className={`${styles.sortButton} ${
                sortField === field.value ? styles.sortButtonActive : ""
              }`}
              onClick={() => setSortField(field.value)}
            >
              {field.label}
            </button>
          ))}
          {isFetching && <span className={styles.fetchingHint}>Fetching…</span>}
        </div>

        {isLoading || !items ? (
          <p className={styles.message}>Loading items...</p>
        ) : (
          <ul
            className={`${styles.list} ${isPlaceholderData ? styles.placeholder : ""}`}
          >
            <li className={styles.headerRow}>
              <span>Name</span>
              <span>Category</span>
              <span>Price</span>
              <span />
            </li>
            {items.map((item) => (
              <ItemRow key={item.id} item={item} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default SortedListInvalidation;
