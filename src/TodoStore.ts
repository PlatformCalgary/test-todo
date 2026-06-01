import { Todo } from "./types";

export class TodoStore {
  private todos: Todo[] = [];
  private nextId = 1;

  add(title: string): Todo {
    const todo: Todo = {
      id: this.nextId++,
      title,
      completed: false,
      createdAt: new Date(),
    };
    this.todos.push(todo);
    return todo;
  }

  complete(id: number): Todo | undefined {
    const todo = this.todos.find((t) => t.id === id);
    if (todo) todo.completed = true;
    return todo;
  }

  delete(id: number): boolean {
    const index = this.todos.findIndex((t) => t.id === id);
    if (index === -1) return false;
    this.todos.splice(index, 1);
    return true;
  }

  list(filter?: "all" | "active" | "completed"): Todo[] {
    switch (filter) {
      case "active":
        return this.todos.filter((t) => !t.completed);
      case "completed":
        return this.todos.filter((t) => t.completed);
      default:
        return [...this.todos];
    }
  }
}
