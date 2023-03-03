import { useContext } from "react";
import { TodoList } from "./components";
import { TodoContext } from "./contexts/TodoProvider";
import "./App.scss";

function App() {
  const { todos, setTodos } = useContext(TodoContext);

  const handleSubmit = (ev) => {
    ev.preventDefault();

    const input_value = ev.target.add_input?.value;

    if (!input_value) return;

    const todo = {
      id: todos.length,
      text: input_value,
      status: false,
    };

    const newTodo = [...todos, todo];
    setTodos(newTodo);

    ev.target.add_input.value = "";
  };

  return (
    <div className="App">
      <header className="header">FlyReel Todo</header>

      <main className="main">
        <TodoList />

        <form className="todo__add" onSubmit={handleSubmit}>
          <input type="text" className="todo__add__input" id="add_input" />
          <input
            type="submit"
            className="button todo__add__button"
            value="ADD"
          />
        </form>
      </main>
    </div>
  );
}

export default App;
