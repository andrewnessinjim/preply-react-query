import type { TodoFilter } from "./types";

// One factory per feature. Every key below starts with `all` — that shared
// ["todos"] prefix is what lets invalidateQueries (or setQueryData) target
// "every todos query", "just the lists", or "just one todo's detail"
// without hand-assembling arrays at each call site and hoping they all stay
// consistent. See useTodos.ts for the three different levels this actually
// gets used at.
export const todoKeys = {
  all: ["todos"] as const,
  lists: () => [...todoKeys.all, "list"] as const,
  list: (filter: TodoFilter) => [...todoKeys.lists(), filter] as const,
  details: () => [...todoKeys.all, "detail"] as const,
  detail: (id: number) => [...todoKeys.details(), id] as const,
};
