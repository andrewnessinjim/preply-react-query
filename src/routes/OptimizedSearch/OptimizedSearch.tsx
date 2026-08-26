import { useState } from "react";
import { Link } from "react-router-dom";
import Intro from "./Intro";
import ResultsList from "./ResultsList";
import SearchInput from "./SearchInput";
import { useDebouncedValue } from "./useDebouncedValue";
import styles from "./OptimizedSearch.module.css";

const DEBOUNCE_MS = 3000;

function OptimizedSearch() {
  const [inputValue, setInputValue] = useState("");
  const debouncedTerm = useDebouncedValue(inputValue.trim(), DEBOUNCE_MS);

  return (
    <div className={styles.page}>
      <Link to="/" className={styles.backLink}>
        ← All examples
      </Link>

      <div className={styles.content}>
        <Intro />

        <SearchInput value={inputValue} onChange={setInputValue} />

        <ResultsList term={debouncedTerm} />
      </div>
    </div>
  );
}

export default OptimizedSearch;
