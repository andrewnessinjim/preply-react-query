import { Link } from "react-router-dom";
import AlbumsSection from "./AlbumsSection";
import TourDatesSection from "./TourDatesSection";
import styles from "./ParallelQueries.module.css";

function ParallelQueries() {
  return (
    <div className={styles.page}>
      <Link to="/" className={styles.backLink}>
        ← All examples
      </Link>

      <div className={styles.content}>
        <header className={styles.intro}>
          <h1 className={styles.title}>Parallel Queries</h1>
          <p>
            An artist's page shows their albums and their upcoming tour
            dates. Both are clearly "about" the artist, but a tour date
            doesn't reference an album and an album doesn't reference a tour
            date — in a real system these would likely come from two
            different services entirely, a music catalog and a
            ticketing/events platform, each just scoped to the same artist
            name. That makes them a textbook case for parallel queries:{" "}
            <code>useAlbums()</code> and <code>useTourDates()</code> are two
            entirely independent <code>useQuery</code> calls. React fires
            both right away; open the <strong>Network tab</strong> and
            you'll see both requests start at the same instant.
          </p>
          <p>
            That's also the drawback this demo exists to show. The album
            catalog is a handful of rows by a simple filter, so it resolves
            quickly; the tour dates lookup is set up to resolve much slower.
            Reload the page and watch: <strong>Albums</strong> pops in
            almost immediately, then the page just... sits there, lopsided,
            until <strong>Tour Dates</strong> finally catches up seconds
            later. Each section owns its own <code>isLoading</code>, so
            there's no single moment where "the page is ready" — it arrives
            in pieces, on whatever schedule each query happens to finish.
            Combining them into one shared loading state takes deliberate
            extra work, which is exactly what later examples in this
            section will show.
          </p>
        </header>

        <div className={styles.panels}>
          <AlbumsSection />
          <TourDatesSection />
        </div>
      </div>
    </div>
  );
}

export default ParallelQueries;
