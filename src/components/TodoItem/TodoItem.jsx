import { useState } from "react";

import "./index.scss";

const TodoItem = ({ status, text, id, removeTodoItem, updateTodoItem }) => {
  const [textValue, setTextValue] = useState(text);
  const [currentStatus, setStatus] = useState(status);
  const [showTextInput, setShowTextInput] = useState(false);

  const handleKeyDown = (ev) => {
    if (ev.key === "Enter") {
      setShowTextInput(false);
      updateTodoItem({ status: currentStatus, textValue, id });
    }
  };

  const handleChange = (ev) => {
    const name = ev.target.name;
    switch (name) {
      case "checkbox":
        setStatus(ev.target.checked);
        updateTodoItem({ status: ev.target.checked, textValue, id });
        break;
      case "text":
        setTextValue(ev.target.value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="todo__item">
      <input
        type="checkbox"
        value={status}
        onChange={handleChange}
        className="todo__item__check"
        name="checkbox"
      />
      <div
        className={`todo__item__text ${status && "todo__item--done"}`}
        onDoubleClick={() => setShowTextInput(true)}
      >
        {showTextInput ? (
          <input
            type="text"
            value={textValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onBlur={() => setShowTextInput(false)}
            name="text"
            className="todo__item__text-input"
          />
        ) : (
          <>{textValue}</>
        )}
      </div>
      <button
        className="button-close todo__item__delete"
        onClick={() => removeTodoItem(id)}
      >
        X
      </button>
    </div>
  );
};

export default TodoItem;
