import { useState } from "react";
import type { Todo } from "./types";
import "./App.css";

type Filter = "all" | "active" | "completed";

let nextId = 1;

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  function addTodo() {
    const title = input.trim();
    if (!title) return;
    setTodos((prev) => [
      ...prev,
      { id: nextId++, title, completed: false, createdAt: new Date() },
    ]);
    setInput("");
  }

  function toggleTodo(id: number) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  function deleteTodo(id: number) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  function clearCompleted() {
    setTodos((prev) => prev.filter((t) => !t.completed));
  }

  const filtered = todos.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  const activeCount = todos.filter((t) => !t.completed).length;

  return (
    <div className="app">
      <h1>todos</h1>

      <div className="card">
        <div className="input-row">
          <input
            className="todo-input"
            type="text"
            placeholder="What needs to be done?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
          />
          <button className="add-btn" onClick={addTodo}>
            Add
          </button>
        </div>

        <ul className="todo-list">
          {filtered.length === 0 && (
            <li className="empty">No todos here.</li>
          )}
          {filtered.map((todo) => (
            <li key={todo.id} className={`todo-item ${todo.completed ? "done" : ""}`}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              <span className="todo-title">{todo.title}</span>
              <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>
                ✕
              </button>
            </li>
          ))}
        </ul>

        {todos.length > 0 && (
          <div className="footer">
            <span>{activeCount} item{activeCount !== 1 ? "s" : ""} left</span>
            <div className="filters">
              {(["all", "active", "completed"] as Filter[]).map((f) => (
                <button
                  key={f}
                  className={`filter-btn ${filter === f ? "active" : ""}`}
                  onClick={() => setFilter(f)}
                >
                  {f[0].toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
            <button className="clear-btn" onClick={clearCompleted}>
              Clear completed
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
