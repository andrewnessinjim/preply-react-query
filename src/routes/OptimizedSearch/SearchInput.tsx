import styles from "./OptimizedSearch.module.css";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <input
      type="text"
      className={styles.searchInput}
      placeholder="Search plants by name or description…"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}

export default SearchInput;
