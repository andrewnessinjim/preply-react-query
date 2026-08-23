import { Link } from "react-router-dom";
import Description from "../../components/Description";
import styles from "./SortedListInvalidation.module.css";

function Intro() {
  return (
    <header className={styles.intro}>
      <h1 className={styles.title}>Sorted List Invalidation</h1>
      <Description>
        The same 6 fixed rows from the <code>inventory_items</code> table as{" "}
        <Link to="/pagination" className={styles.inlineLink}>
          Pagination
        </Link>{" "}
        every time — this is a fixed set of ids, not a "top 6" slice that
        could drop a row off screen — sortable only by <strong>Name</strong>,{" "}
        <strong>Category</strong>, or <strong>Price</strong>, and every row
        is directly editable. Edit any field and watch the row actually
        slide to its new position the moment you save; it can move under
        every one of those three sort orders, not just whichever one
        happens to be on screen.
      </Description>
      <Description>
        <code>useUpdateItem()</code>'s <code>onSuccess</code> doesn't try to
        patch the 3 cached lists by hand the way{" "}
        <Link to="/manual-cache-update" className={styles.inlineLink}>
          Manual Cache Update
        </Link>{" "}
        or{" "}
        <Link to="/partial-cache-update" className={styles.inlineLink}>
          Partial Cache Update
        </Link>{" "}
        do — there's no single "moved to index 2" answer that's valid
        across all three orderings at once. Instead it calls{" "}
        <code>
          queryClient.invalidateQueries({"{"} queryKey: ["sorted-items"]{" "}
          {"}"})
        </code>{" "}
        — just the shared prefix, not a specific field. Query key matching
        is prefix-based by default, so that one call marks all three of{" "}
        <code>["sorted-items", "name"]</code>,{" "}
        <code>["sorted-items", "category"]</code>, and{" "}
        <code>["sorted-items", "price_cents"]</code> stale at once, with no
        need to list them out by hand.
      </Description>
      <Description>
        <code>onSuccess</code> hands that call's promise straight back, and{" "}
        <code>useMutation</code> awaits whatever <code>onSuccess</code>{" "}
        returns before it settles, so the Save button below stays disabled
        through all 3 invalidated refetches — not just through the PATCH
        request itself. Switch sort order after saving and the row is
        already exactly where it belongs, no manual refetch anywhere on
        this page. Open the <strong>TanStack Query Devtools</strong> and
        watch the two sort orders you aren't currently viewing flip to
        stale and refetch in the background the moment you hit Save.
      </Description>
    </header>
  );
}

export default Intro;
