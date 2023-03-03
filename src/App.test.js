import { render, fireEvent } from "@testing-library/react";

import App from "./App";
import { TodoProvider } from "./contexts/TodoProvider";

describe("App", () => {
  it("should add a todo", () => {
    const todos = [];

    const { container } = render(
      <TodoProvider value={{ todos }}>
        <App />
      </TodoProvider>
    );
    const input = container.querySelector(".todo__add__input");
    const submit = container.querySelector(".todo__add__button");
    const todoList = container.querySelector(".todo__list");
    // Act
    fireEvent.change(input, { target: { value: "Buy milk" } });
    fireEvent.click(submit);

    // Assert
    expect(todoList.childNodes.length).toBe(0);
  });
});
