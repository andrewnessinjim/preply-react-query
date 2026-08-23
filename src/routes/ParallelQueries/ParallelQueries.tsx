import { Link } from "react-router-dom";
import AlbumsSection from "./AlbumsSection";
import TourDatesSection from "./TourDatesSection";
import Intro from "./ParallelQueriesIntro";
import styles from "./ParallelQueries.module.css";

function ParallelQueries() {
  return (
    <div className={styles.page}>
      <Link to="/" className={styles.backLink}>
        ← All examples
      </Link>

      <div className={styles.content}>
        <Intro />

        <div className={styles.panels}>
          <AlbumsSection />
          <TourDatesSection />
        </div>
      </div>
    </div>
  );
}

export default ParallelQueries;
