import { useState } from "react";
import { Link } from "react-router-dom";
import useOnDemandProfile from "./useOnDemandProfile";
import styles from "./FetchOnDemand.module.css";

const MEMBERS = [
  { id: 1, name: "Jordan Blake" },
  { id: 2, name: "Priya Nair" },
  { id: 3, name: "Sam Osei" },
];

function FetchOnDemand() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { data: manager, isLoading } = useOnDemandProfile(selectedId);

  return (
    <div className={styles.page}>
      <Link to="/" className={styles.backLink}>
        ← All examples
      </Link>

      <div className={styles.content}>
        <header className={styles.intro}>
          <h1 className={styles.title}>Fetch on Demand</h1>
          <p>
            This page mounts <code>useOnDemandProfile(selectedId)</code>{" "}
            immediately, but nothing gets requested — its <code>useQuery</code>{" "}
            is passed <code>enabled: selectedId !== null</code>, and{" "}
            <code>selectedId</code> starts out <code>null</code>. Open the{" "}
            <strong>TanStack Query Devtools</strong>: the query already exists
            in the cache the moment this page loads, sitting disabled. Click a
            name below and watch it flip on and fetch for the first time —
            <code>enabled</code> is how you defer a query until the app
            actually needs it, instead of it firing the instant the component
            mounts.
          </p>
        </header>

        <div className={styles.buttonRow}>
          {MEMBERS.map((member) => (
            <button
              key={member.id}
              type="button"
              className={`${styles.memberButton} ${
                selectedId === member.id ? styles.memberButtonActive : ""
              }`}
              onClick={() => setSelectedId(member.id)}
            >
              {member.name}
            </button>
          ))}
          {selectedId !== null && (
            <button
              type="button"
              className={styles.clearButton}
              onClick={() => setSelectedId(null)}
            >
              Clear selection
            </button>
          )}
        </div>

        <div className={styles.panel}>
          {selectedId === null ? (
            <p className={styles.panelMessage}>
              No one selected — the query is disabled, so no request has been
              made.
            </p>
          ) : isLoading ? (
            <p className={styles.panelMessage}>Loading contact details...</p>
          ) : manager ? (
            <>
              <h2 className={styles.cardName}>{manager.name}</h2>
              <p className={styles.cardRole}>
                {manager.role} · {manager.department}
              </p>
              <p className={styles.cardBio}>{manager.bio}</p>
              <dl className={styles.cardDetails}>
                <dt>Location</dt>
                <dd>{manager.location}</dd>
                <dt>Email</dt>
                <dd>{manager.email}</dd>
              </dl>
            </>
          ) : (
            <p className={styles.panelMessage}>Could not load profile.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default FetchOnDemand;
