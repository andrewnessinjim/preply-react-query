import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../lib/supabaseClient";
import type {
  Todo,
  NewTodoInput,
  ToggleTodoInput,
  ToggleTodoContext,
} from "./types";

// Its own queryKey — a separate cache entry from Optimistic Updates
// Without Cache's ["todos"], even though both read the same underlying
// table, the same way Manual Cache Update and Partial Cache Update each
// get their own key onto the same orders row.
const todosKey = ["todos-in-cache"] as const;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function randomDelay(minMs: number, maxMs: number) {
  return sleep(minMs + Math.random() * (maxMs - minMs));
}

async function fetchTodos(): Promise<Todo[]> {
  const [{ data, error }] = await Promise.all([
    supabase
      .from("todos")
      .select("id, title, status, created_at")
      .order("id", { ascending: true }),
    randomDelay(4000, 5000),
  ]);
  if (error) throw error;
  return data;
}

export function useTodos() {
  return useQuery({
    queryKey: todosKey,
    queryFn: fetchTodos,
  });
}

async function addTodo(input: NewTodoInput): Promise<void> {
  const [{ error }] = await Promise.all([
    supabase.from("todos").insert({ title: input.title, status: false }),
    randomDelay(500, 500),
  ]);
  if (error) throw error;
}

export function useAddTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addTodo,
    // Still not optimistic — same reasoning as the other demo: a disabled
    // input and an "Adding…" label are honest enough for something that
    // only happens once in a while.
    onSuccess: () => queryClient.invalidateQueries({ queryKey: todosKey }),
  });
}

async function toggleTodo(input: ToggleTodoInput): Promise<void> {
  await randomDelay(400, 800);

  if (input.simulateFailure) {
    throw new Error("Todo service is down");
  }

  const { error } = await supabase
    .from("todos")
    .update({ status: input.status })
    .eq("id", input.id);
  if (error) throw error;
}

export function useToggleTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleTodo,
    // onMutate runs synchronously, before the request even goes out — this
    // is what makes the checkbox instant. It writes the guessed value
    // straight into the cache instead of leaving TodoItem to fake it at
    // render time, so every observer of todosKey sees it immediately.
    onMutate: async (variables): Promise<ToggleTodoContext> => {
      // Without this, a refetch that was already in flight when you
      // clicked could land after the line below and clobber the
      // optimistic write with the stale data it was fetching.
      await queryClient.cancelQueries({ queryKey: todosKey });

      const previousTodos = queryClient.getQueryData<Todo[]>(todosKey);

      queryClient.setQueryData<Todo[]>(todosKey, (current) =>
        current?.map((todo) =>
          todo.id === variables.id
            ? { ...todo, status: variables.status }
            : todo,
        ),
      );

      // Handed to onError below as `context` if the mutation fails.
      return { previousTodos };
    },
    // The real rollback the other demo couldn't do, because it never
    // wrote anything to undo in the first place: put the exact snapshot
    // from before this mutation touched the cache back.
    onError: (_error, _variables, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(todosKey, context.previousTodos);
      }
    },
    // cancelQueries above can silently drop data from an unrelated in-flight
    // refetch — e.g. the one useAddTodo's onSuccess just kicked off — since
    // cancelling it means nothing ever delivers that data. Without this
    // resync, a toggle right after an add can permanently erase the just-
    // added row. Toggling a different row while this settle-refetch is in
    // flight can cause a brief flicker back to its pre-toggle value, but
    // that heals itself the instant that row's own onSettled fires — a
    // temporary flicker beats a permanently missing row.
    onSettled: () => queryClient.invalidateQueries({ queryKey: todosKey }),
  });
}
