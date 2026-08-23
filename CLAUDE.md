# Conventions for this repo

This is a collection of small, self-contained TanStack Query demo pages, each
living in its own folder under `src/routes/<DemoName>/`. When adding a new
demo, follow these conventions:

- **Component name matches the homepage entry.** The folder name, main
  component file name, and exported component function name should all match
  the demo's title on the homepage (`src/routes/Home/Home.tsx`'s `examples`
  array), e.g. title "Sorted List Invalidation" → folder/component
  `SortedListInvalidation`. This makes it easy to find the code for a given
  homepage tile.
- **Types live in their own `types.ts`.** Every `interface`/`type` used by a
  demo's hooks and components goes in `src/routes/<DemoName>/types.ts`, not
  inline in the hook or component file. This keeps hook files (`useXxx.ts`)
  focused on the actual TanStack Query logic (`queryFn`, `mutationFn`,
  `onSuccess`, cache keys) without type-shape noise above it.
- **Intro/description text lives in its own `Intro.tsx`.** The demo's
  explanatory header (title + prose paragraphs, using the shared
  `src/components/Description.tsx` wrapper for each paragraph) goes in
  `src/routes/<DemoName>/Intro.tsx`, imported into the main component as
  `<Intro />`. This keeps the main component file focused on the React Query
  behavior being demonstrated, not the write-up explaining it.
