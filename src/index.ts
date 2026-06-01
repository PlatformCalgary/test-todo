import * as readline from "readline";
import { TodoStore } from "./TodoStore";

const store = new TodoStore();
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

function printTodos() {
  const todos = store.list();
  if (todos.length === 0) {
    console.log("  (no todos)");
    return;
  }
  for (const todo of todos) {
    const status = todo.completed ? "[x]" : "[ ]";
    console.log(`  ${status} #${todo.id} ${todo.title}`);
  }
}

function printHelp() {
  console.log(`
Commands:
  add <title>       Add a new todo
  done <id>         Mark a todo as complete
  delete <id>       Delete a todo
  list              List all todos
  list active       List incomplete todos
  list completed    List completed todos
  help              Show this help
  exit              Quit
`);
}

function handleCommand(line: string) {
  const [cmd, ...rest] = line.trim().split(" ");
  const arg = rest.join(" ").trim();

  switch (cmd) {
    case "add":
      if (!arg) { console.log("Usage: add <title>"); break; }
      const todo = store.add(arg);
      console.log(`Added: #${todo.id} ${todo.title}`);
      break;

    case "done": {
      const id = parseInt(arg);
      if (isNaN(id)) { console.log("Usage: done <id>"); break; }
      const updated = store.complete(id);
      console.log(updated ? `Completed: #${updated.id} ${updated.title}` : `Todo #${id} not found`);
      break;
    }

    case "delete": {
      const id = parseInt(arg);
      if (isNaN(id)) { console.log("Usage: delete <id>"); break; }
      console.log(store.delete(id) ? `Deleted #${id}` : `Todo #${id} not found`);
      break;
    }

    case "list":
      printTodos();
      break;

    case "help":
      printHelp();
      break;

    case "exit":
      rl.close();
      process.exit(0);

    default:
      console.log(`Unknown command: ${cmd}. Type "help" for usage.`);
  }
}

console.log('Todo App — type "help" for commands.');
rl.on("line", handleCommand);
rl.prompt();
rl.on("line", () => rl.prompt());
