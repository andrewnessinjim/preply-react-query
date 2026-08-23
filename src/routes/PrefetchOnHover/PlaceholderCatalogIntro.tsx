import { Link } from "react-router-dom";
import Description from "../../components/Description";
import styles from "./PrefetchOnHover.module.css";

function PlaceholderCatalogIntro() {
  return (
    <header className={styles.intro}>
      <h1 className={styles.title}>Placeholder Data</h1>
      <Description>
        Same slow ~700ms detail fetch as{" "}
        <Link to="/prefetch-on-hover" className={styles.inlineLink}>
          Prefetch on Hover
        </Link>
        , but this time the detail page's <code>useQuery</code> also gets a{" "}
        <code>placeholderData</code> function. It reads{" "}
        <code>["plants"]</code> — this list's own cache entry, already
        sitting there from the query that rendered the page below — and
        hands back whichever row matches the id you clicked, reshaped into a
        full <code>Plant</code> with empty strings standing in for the
        light/water/care fields the list row never had. That's not a fetch;
        it's data this page already paid for, wearing the shape the detail
        page expects.
      </Description>
      <Description>
        Click any plant below <em>without</em> hovering first: the name,
        category, and price appear instantly, pulled straight from this
        list, while the light, water, and care guide sit behind a skeleton
        until the real fetch lands a moment later. Compare that to Prefetch
        on Hover, where a cold click gets you nothing but a spinner until
        the whole row arrives at once. <code>isPlaceholderData</code> is how
        the detail page tells "stand-in" from "real": true while it's
        showing the filled-in placeholder, false the moment the actual row
        comes back and replaces it. The checkbox below still controls
        prefetching — turn it on and hover long enough before clicking, and
        the real fetch beats you there, so the skeleton never gets a chance
        to show up.
      </Description>
    </header>
  );
}

export default PlaceholderCatalogIntro;
