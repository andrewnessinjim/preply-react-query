import React from "react";
import { Link } from "react-router-dom";
import PokemonCard from "./PokemonCard";
import styles from "./PokemonQuery.module.css";
import usePokemon from "./usePokemon";

function PokemonQuery() { // Becomes a subscriber to  ["pokemon", 2]
  const [id, setId] = React.useState(1);
  const { pokemon, isLoading, error } = usePokemon(id);

  function handlePrevious() {
    setId(id > 1 ? id - 1 : id);
  }

  function handleNext() {
    setId(id + 1);
  }

  return (
    <div className={styles.page}>
      <Link to="/" className={styles.backLink}>
        ← All examples
      </Link>

      <div className={styles.pokedex}>
        <div className={styles.lights}>
          <div className={styles.mainLight} />
          <div className={styles.smallLight} />
          <div className={styles.smallLight} />
          <div className={styles.smallLight} />
        </div>

        <PokemonCard isLoading={isLoading} data={pokemon} error={error} />

        <div className={styles.controls}>
          <button
            className={styles.navButton}
            onClick={handlePrevious}
            disabled={id <= 1}
            aria-label="Previous Pokemon"
          >
            ←
          </button>
          <div className={styles.speaker}>
            <span />
            <span />
            <span />
          </div>
          <button
            className={styles.navButton}
            onClick={handleNext}
            aria-label="Next Pokemon"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}

export default PokemonQuery;
