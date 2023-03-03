import { createContext, useState } from "react";

const TodoContext = createContext();

const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  const updateTodoItem = ({ status, textValue, id }) => {
    const newTodos = [...todos];
    newTodos[id].text = textValue;
    newTodos[id].status = status;
    setTodos(newTodos);
  };

  const removeTodoItem = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  return (
    <TodoContext.Provider
      value={{ todos, setTodos, updateTodoItem, removeTodoItem }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export { TodoContext, TodoProvider };
