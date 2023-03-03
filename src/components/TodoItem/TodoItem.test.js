import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TodoItem from "./TodoItem";

const mockRemoveTodoItem = jest.fn();
const mockUpdateTodoItem = jest.fn();
const textValue = "Text";
const status = false;
const id = 1;
const props = {
  status,
  text: textValue,
  id,
  removeTodoItem: mockRemoveTodoItem,
  updateTodoItem: mockUpdateTodoItem,
};

const renderComponent = () => render(<TodoItem {...props} />);

describe("TodoItem", () => {
  it("should render a checkbox", () => {
    const { container } = renderComponent();
    const checkbox = container.querySelector(".todo__item__check");
    expect(checkbox).toBeTruthy();
    expect(checkbox.type).toBe("checkbox");
    expect(checkbox.value).toBe(String(status));
  });

  it("should render the text value", async () => {
    const { getByText } = renderComponent();
    expect(getByText(textValue)).toBeVisible();
  });

  it("should render a delete button", () => {
    const { getByText } = renderComponent();
    expect(getByText("X")).toBeVisible();
  });

  it("should call removeTodoItem when delete button is clicked", () => {
    const { getByText } = renderComponent();
    const button = getByText("X");
    fireEvent.click(button);
    expect(mockRemoveTodoItem).toHaveBeenCalledWith(id);
  });

  it("should call updateTodoItem when checkbox is clicked", () => {
    const { container } = renderComponent();
    const checkbox = container.querySelector(".todo__item__check");
    fireEvent.click(checkbox);
    expect(mockUpdateTodoItem).toHaveBeenCalledWith({
      status: !status,
      textValue,
      id,
    });
  });

  it("should render a text input when double clicked", () => {
    const { container } = renderComponent();
    const text = container.querySelector(".todo__item__text");
    fireEvent.doubleClick(text);
    const input = container.querySelector(".todo__item__text-input");
    expect(input).toBeVisible();
    expect(input.value).toBe(textValue);
  });

  it("should call updateTodoItem when enter is pressed in text input", async () => {
    const { container } = renderComponent();
    const text = container.querySelector(".todo__item__text");
    fireEvent.doubleClick(text);
    const input = container.querySelector(".todo__item__text-input");
    fireEvent.keyDown(input, { key: "Enter" });
    expect(mockUpdateTodoItem).toHaveBeenCalledWith({
      status,
      textValue,
      id,
    });
  });

  it("should call updateTodoItem with updated textValue", () => {
    const { container, findByText} = renderComponent();
    const text = container.querySelector(".todo__item__text");
    fireEvent.doubleClick(text);
    const input = container.querySelector(".todo__item__text-input");
    fireEvent.keyDown(input, { key: "a" });
    fireEvent.keyDown(input, { key: "Enter" });
    const _textValue = textValue + "a";
    const changedValue = findByText(_textValue);
  });
});
