import useAccountManager from "./useAccountManager";
import styles from "./QueryDeduplication.module.css";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("");
}

function ManagerBadge() {
  const { manager, isLoading, error } = useAccountManager();

  if (isLoading) return <div className={styles.badge}>Loading...</div>;
  if (error || !manager) return null;

  return (
    <div className={styles.badge}>
      <span className={styles.badgeAvatar}>{initials(manager.name)}</span>
      <span>
        Your account manager is <strong>{manager.name}</strong>
      </span>
    </div>
  );
}

export default ManagerBadge;
