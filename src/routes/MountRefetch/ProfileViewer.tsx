import useWatchedProfile from "./useWatchedProfile";
import styles from "./MountRefetch.module.css";

function secondsAgo(timestamp: number) {
  return Math.max(0, Math.round((Date.now() - timestamp) / 1000));
}

interface ProfileViewerProps {
  label: string;
  now: number;
}

function ProfileViewer({ label }: ProfileViewerProps) {
  const { data: manager, isLoading, dataUpdatedAt } = useWatchedProfile();

  if (isLoading) {
    return <div className={styles.viewer}>Loading contact card...</div>;
  }

  if (!manager) {
    return <div className={styles.viewer}>Could not load profile.</div>;
  }

  return (
    <div className={styles.viewer}>
      <span className={styles.viewerLabel}>{label}</span>
      <h2 className={styles.cardName}>{manager.name}</h2>
      <p className={styles.cardRole}>
        {manager.role} · {manager.department}
      </p>
      <p className={styles.cardMeta}>
        Data fetched {secondsAgo(dataUpdatedAt)}s ago
      </p>
    </div>
  );
}

export default ProfileViewer;
