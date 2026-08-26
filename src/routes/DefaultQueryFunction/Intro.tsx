import Description from "../../components/Description";
import styles from "./DefaultQueryFunction.module.css";

function Intro() {
  return (
    <header className={styles.intro}>
      <h1 className={styles.title}>Default Query Function</h1>
      <Description>
        Almost every <code>useQuery</code> option can be defaulted — on the{" "}
        <code>QueryClient</code> itself, or per key-prefix via{" "}
        <code>setQueryDefaults</code>. <code>queryKey</code> is the one
        exception: TanStack Query's own types omit it from both places, so
        this doesn't even compile:
      </Description>
      <pre>{`const bad: DefaultOptions["queries"] = { queryKey: ["nope"] };
//                                          ~~~~~~~~
// Object literal may only specify known properties, and
// 'queryKey' does not exist in type '...'`}</pre>
      <Description>
        That's not an oversight — <code>setQueryDefaults(prefix, options)</code>{" "}
        looks options up <em>by</em> queryKey, so the key has to already
        exist before any lookup can happen. It can't also be the thing the
        lookup hands back.
      </Description>
      <Description>
        A default <code>queryFn</code>, on the other hand, is ordinary — as
        long as it can figure out what to fetch purely from the queryKey it's
        handed. This page's isolated <code>QueryClient</code> calls{" "}
        <code>setQueryDefaults(["plants"], {"{"} queryFn {"}"})</code>,
        fuzzy-matched the same way the Query Configuration Levels demo
        matches a <code>staleTime</code> default — except the option being
        defaulted here is the fetcher itself, and the prefix it matches on
        is the table name itself, no wrapper needed. Any query whose key
        starts with <code>["plants"]</code> reads the rest of its key as{" "}
        <code>filter?</code> and gets routed through one shared Supabase
        fetch, no <code>queryFn</code> passed at the call site at all.
      </Description>
      <Description>
        The first three cards below all match that prefix. The fourth,{" "}
        <strong>Server Clock</strong>, doesn't — its key doesn't start with{" "}
        <code>["plants"]</code>, so <code>setQueryDefaults</code> never
        matches it, and it brings its own ordinary <code>queryFn</code>,
        proving the shared default only reaches the subset of queries that
        opt into its prefix, not every query on the client.
      </Description>
    </header>
  );
}

export default Intro;
