import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../lib/supabaseClient";
import { todoKeys } from "./todoKeys";
import type {
  NewTodoInput,
  Todo,
  ToggleTodoContext,
  ToggleTodoInput,
  TodoFilter,
} from "./types";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function randomDelay(minMs: number, maxMs: number) {
  return sleep(minMs + Math.random() * (maxMs - minMs));
}

async function fetchTodos(filter: TodoFilter): Promise<Todo[]> {
  let query = supabase
    .from("todos")
    .select("id, title, status, created_at")
    .order("id", { ascending: true });

  if (filter === "active") query = query.eq("status", false);
  if (filter === "completed") query = query.eq("status", true);

  const [{ data, error }] = await Promise.all([query, randomDelay(300, 700)]);
  if (error) throw error;
  return data;
}

export function useTodos(filter: TodoFilter) {
  return useQuery({
    queryKey: todoKeys.list(filter),
    queryFn: () => fetchTodos(filter),
  });
}

async function fetchTodo(id: number): Promise<Todo> {
  const [{ data, error }] = await Promise.all([
    supabase
      .from("todos")
      .select("id, title, status, created_at")
      .eq("id", id)
      .single(),
    randomDelay(200, 500),
  ]);
  if (error) throw error;
  return data;
}

export function useTodo(id: number) {
  return useQuery({
    queryKey: todoKeys.detail(id),
    queryFn: () => fetchTodo(id),
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
    // A new todo can only change which rows show up in a *list* — it can't
    // change any existing todo's own detail record — so only the "list"
    // branch needs invalidating, not todoKeys.all. One fuzzy call catches
    // every filter tab's cached list at once, however many are currently
    // sitting in the cache.
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: todoKeys.lists() }),
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

export function useToggleTodo(filter: TodoFilter) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleTodo,
    onMutate: async (variables): Promise<ToggleTodoContext> => {
      await queryClient.cancelQueries({ queryKey: todoKeys.list(filter) });
      await queryClient.cancelQueries({
        queryKey: todoKeys.detail(variables.id),
      });

      const previousList = queryClient.getQueryData<Todo[]>(
        todoKeys.list(filter),
      );
      const previousDetail = queryClient.getQueryData<Todo>(
        todoKeys.detail(variables.id),
      );

      queryClient.setQueryData<Todo[]>(todoKeys.list(filter), (current) =>
        current?.map((todo) =>
          todo.id === variables.id
            ? { ...todo, status: variables.status }
            : todo,
        ),
      );
      queryClient.setQueryData<Todo>(todoKeys.detail(variables.id), (current) =>
        current ? { ...current, status: variables.status } : current,
      );

      return { previousList, previousDetail };
    },
    onError: (_error, variables, context) => {
      if (context?.previousList) {
        queryClient.setQueryData(todoKeys.list(filter), context.previousList);
      }
      if (context?.previousDetail) {
        queryClient.setQueryData(
          todoKeys.detail(variables.id),
          context.previousDetail,
        );
      }
    },
    // Toggling can move a todo across filters — active becomes completed or
    // back — which the optimistic write above can't do on its own, since it
    // only patched the list you were looking at. Invalidating lists()
    // refetches every filter tab, so whichever one you switch to next
    // reflects real membership, without touching any other todo's cached
    // detail entry.
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({ queryKey: todoKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: todoKeys.detail(variables.id),
      });
    },
  });
}
