import { useState } from "react";
import { Link } from "react-router-dom";
import useOnDemandProfile from "./useOnDemandProfile";
import Intro from "./Intro";
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
        <Intro />

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
