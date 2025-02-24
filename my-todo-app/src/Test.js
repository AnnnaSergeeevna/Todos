import { render, screen, fireEvent } from "@testing-library/react";
import TodoApp from "./TodoApp";

test("adds a new task", () => {
    render(<TodoApp />);

    const input = screen.getByPlaceholderText("New task...");
    const button = screen.getByText("Add");

    fireEvent.change(input, { target: { value: "Test task" } });
    fireEvent.click(button);

    expect(screen.getByText("Test task")).toBeInTheDocument();
});

test("removes completed tasks", () => {
    render(<TodoApp />);

    const input = screen.getByPlaceholderText("New task...");
    const button = screen.getByText("Add");

    fireEvent.change(input, { target: { value: "Test task" } });
    fireEvent.click(button);

    const task = screen.getByText("Test task");
    fireEvent.click(task); // Mark task as completed

    const clearButton = screen.getByText("Clear Completed");
    fireEvent.click(clearButton);

    expect(screen.queryByText("Test task")).not.toBeInTheDocument();
});
