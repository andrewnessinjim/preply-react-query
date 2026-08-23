export interface Todo {
  id: number;
  title: string;
  status: boolean;
  created_at: string;
}

export interface NewTodoInput {
  title: string;
}

export interface ToggleTodoInput {
  id: number;
  status: boolean;
  simulateFailure: boolean;
}

export interface ToggleTodoContext {
  previousTodos: Todo[] | undefined;
}

export interface TodoItemProps {
  todo: Todo;
  simulateFailure: boolean;
}
