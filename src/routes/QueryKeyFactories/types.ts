export interface Todo {
  id: number;
  title: string;
  status: boolean;
  created_at: string;
}

export type TodoFilter = "all" | "active" | "completed";

export interface NewTodoInput {
  title: string;
}

export interface ToggleTodoInput {
  id: number;
  status: boolean;
  simulateFailure: boolean;
}

export interface ToggleTodoContext {
  previousList: Todo[] | undefined;
  previousDetail: Todo | undefined;
}

export interface TodoItemProps {
  todo: Todo;
  filter: TodoFilter;
  simulateFailure: boolean;
  isExpanded: boolean;
  onToggleExpanded: (id: number) => void;
}
