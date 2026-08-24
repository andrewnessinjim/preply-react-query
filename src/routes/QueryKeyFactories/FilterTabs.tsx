import type { TodoFilter } from "./types";
import styles from "./QueryKeyFactories.module.css";

const FILTERS: TodoFilter[] = ["all", "active", "completed"];

interface FilterTabsProps {
  filter: TodoFilter;
  onChange: (filter: TodoFilter) => void;
}

function FilterTabs({ filter, onChange }: FilterTabsProps) {
  return (
    <div className={styles.filterTabs}>
      {FILTERS.map((option) => (
        <button
          key={option}
          type="button"
          className={
            option === filter
              ? `${styles.filterTab} ${styles.filterTabActive}`
              : styles.filterTab
          }
          onClick={() => onChange(option)}
        >
          {option[0].toUpperCase() + option.slice(1)}
        </button>
      ))}
    </div>
  );
}

export default FilterTabs;
