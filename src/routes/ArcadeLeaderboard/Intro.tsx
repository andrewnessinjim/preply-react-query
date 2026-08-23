import Description from "../../components/Description";
import styles from "./ArcadeLeaderboard.module.css";

function Intro() {
  return (
    <header className={styles.intro}>
      <h1 className={styles.title}>Arcade Leaderboard</h1>
      <Description>
        The <code>scores</code> table holds 1,000 rows. Each button below
        re-sorts and re-fetches the top 12 from Supabase — a genuinely
        different request every time. The active field is baked into the
        query key as <code>["scores", sortField]</code>, so TanStack
        Query knows to refetch instead of handing back the cached "top 12
        by score" when you switch to "Max Combo". Drop the sort field
        from the key and the table would silently stop updating.
      </Description>
    </header>
  );
}

export default Intro;
