import Description from "../../components/Description";
import styles from "./OptimizedSearch.module.css";

function Intro() {
  return (
    <header className={styles.intro}>
      <h1 className={styles.title}>Optimized Search</h1>
      <Description>
        Search-as-you-type is where two separate TanStack Query optimizations
        usually show up together. This demo keeps them distinct so you can
        see what each one actually buys you.
      </Description>
      <Description>
        <strong>1. Debouncing.</strong> The input updates instantly, but the
        value that actually goes into the queryKey —{" "}
        <code>useDebouncedValue(inputValue, 400)</code> — only catches up
        400ms after you stop typing. Type a full word at a normal pace and
        the TanStack Query devtools show one query firing, not one per
        keystroke.
      </Description>
      <Description>
        <strong>2. Cancellation.</strong> Pause just long enough to fire a
        request, then keep typing before it resolves, and watch that query in
        the devtools get abandoned instead of settling. TanStack Query does
        this on its own: the <code>signal</code> the <code>queryFn</code>{" "}
        receives gets passed straight through to Supabase's{" "}
        <code>.abortSignal(signal)</code>, and once the query's key moves on
        to the next term, its last observer disappears and that's enough to
        trigger the abort.
      </Description>
    </header>
  );
}

export default Intro;
