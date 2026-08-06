import useAccountManager from "./useAccountManager";
import styles from "./Deduplication.module.css";

function ManagerCard() {
  const { manager, isLoading, error } = useAccountManager();

  if (isLoading) {
    return <div className={styles.card}>Loading contact card...</div>;
  }

  if (error || !manager) {
    return <div className={styles.card}>Could not load account manager.</div>;
  }

  return (
    <div className={styles.card}>
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
    </div>
  );
}

export default ManagerCard;
