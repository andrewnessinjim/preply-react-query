// The same one-factory-per-feature pattern as the Query Key Factories demo
// — every key here starts with the same ["plant-search"] prefix.
export const plantSearchKeys = {
  all: ["plant-search"] as const,
  term: (term: string) => [...plantSearchKeys.all, term] as const,
};
