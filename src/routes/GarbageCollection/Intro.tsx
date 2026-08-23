import Description from "../../components/Description";
import { GC_TIME } from "./useGcProfile";
import styles from "./GarbageCollection.module.css";

function Intro() {
  return (
    <header className={styles.intro}>
      <h1 className={styles.title}>Garbage Collection</h1>
      <Description>
        <code>useGcProfile()</code> sets <code>gcTime: {GC_TIME / 1000}s</code>,
        far shorter than the 5 minute default, plus a long{" "}
        <code>staleTime</code> so a remount never refetches just because the
        data went stale — that isolates <code>gcTime</code> from{" "}
        <code>staleTime</code>. Unmount the viewer below and it drops to zero
        observers, but TanStack Query doesn't delete the cache entry right
        away — it starts a {GC_TIME / 1000} second countdown. Remount before
        the countdown ends and the exact same data reappears instantly with{" "}
        <strong>no new request</strong>, because the entry survived. Wait past
        it, then remount: you'll see a loading state and a fresh request fire,
        because the entry was garbage collected while nothing was watching it.
        Open the <strong>TanStack Query Devtools</strong>:{" "}
        <code>["gc-demo-profile", 1]</code> stays listed as inactive right
        after you unmount, then disappears from the list the moment{" "}
        <code>gcTime</code> runs out.
      </Description>
    </header>
  );
}

export default Intro;
