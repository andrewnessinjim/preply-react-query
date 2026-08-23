import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../lib/supabaseClient";
import type { Todo, NewTodoInput, ToggleTodoInput } from "./types";

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
    randomDelay(300, 700),
  ]);
  if (error) throw error;
  return data;
}

export function useTodos() {
  return useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });
}

async function addTodo(input: NewTodoInput): Promise<void> {
  const [{ error }] = await Promise.all([
    supabase.from("todos").insert({ title: input.title, status: false }),
    randomDelay(500, 1100),
  ]);
  if (error) throw error;
}

export function useAddTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addTodo,
    // Not optimistic — a disabled input plus a "Adding…" label on the
    // button is honest, low-stakes feedback for something that only
    // happens once in a while. Nothing on screen depends on the new todo
    // existing yet, so there's nothing worth faking early.
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });
}

async function toggleTodo(input: ToggleTodoInput): Promise<void> {
  await randomDelay(600, 1400);

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
    // Still not touching the cache directly here — TodoItem derives the
    // checkbox's visual state from this mutation's own isPending instead.
    // Once the request settles, invalidate so the real value replaces
    // whatever was being displayed optimistically.
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });
}
