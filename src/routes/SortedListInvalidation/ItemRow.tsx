import { useState } from "react";
import { useUpdateItem } from "./useSortedItems";
import type { ItemRowProps } from "./types";
import styles from "./SortedListInvalidation.module.css";

function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

function ItemRow({ item }: ItemRowProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(item.name);
  const [category, setCategory] = useState(item.category);
  const [price, setPrice] = useState((item.price_cents / 100).toFixed(2));
  const updateItem = useUpdateItem();

  function startEditing() {
    setName(item.name);
    setCategory(item.category);
    setPrice((item.price_cents / 100).toFixed(2));
    setIsEditing(true);
  }

  function handleSave() {
    updateItem.mutate(
      { id: item.id, name, category, price_cents: Math.round(Number(price) * 100) },
      { onSuccess: () => setIsEditing(false) },
    );
  }

  if (isEditing) {
    return (
      <li className={styles.row}>
        <input
          className={styles.input}
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          className={styles.input}
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        />
        <input
          className={styles.input}
          type="number"
          step="0.01"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />
        <div className={styles.rowActions}>
          <button
            type="button"
            className={styles.saveButton}
            onClick={handleSave}
            disabled={updateItem.isPending}
          >
            {updateItem.isPending ? "Saving…" : "Save"}
          </button>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={() => setIsEditing(false)}
            disabled={updateItem.isPending}
          >
            Cancel
          </button>
        </div>
      </li>
    );
  }

  return (
    <li className={styles.row}>
      <span className={styles.cellName}>{item.name}</span>
      <span className={styles.cellCategory}>{item.category}</span>
      <span className={styles.cellPrice}>{formatPrice(item.price_cents)}</span>
      <button type="button" className={styles.editButton} onClick={startEditing}>
        Edit
      </button>
    </li>
  );
}

export default ItemRow;
