import { useContext } from "react";

import TodoItem from "../TodoItem/TodoItem";
import { TodoContext } from "../../contexts/TodoProvider";
import "./index.scss";

const TodoList = () => {
  const { todos, updateTodoItem, removeTodoItem } = useContext(TodoContext);

  return (
    <div className="todo__list">
      {todos?.map((todo, index) => (
        <TodoItem
          key={"todo" + todo.id + index}
          {...todo}
          updateTodoItem={updateTodoItem}
          removeTodoItem={removeTodoItem}
        />
      ))}
    </div>
  );
};

export default TodoList;
