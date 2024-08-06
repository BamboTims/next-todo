"use client";

import { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import TodoModal from "./TodoModal";
import { Todo } from "../models/todo";
import "ldrs/tailspin";

const TodoList: React.FC = () => {
  const [loading, setIsLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/todos");
      const data = await response.json();
      setTodos(data);
      setIsLoading(false);
    } catch (error) {
      alert("Failed to fetch todos");
    }
  };

  const handleAddTodo = () => {
    setCurrentTodo(null);
    setModalOpen(true);
  };

  const handleEditTodo = (todo: Todo) => {
    setCurrentTodo(todo);
    setModalOpen(true);
  };

  const handleDeleteTodo = async (id: string) => {
    await fetch("/api/todos", {
      method: "DELETE",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    fetchTodos();
  };

  return (
    <div>
      <button
        onClick={handleAddTodo}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Todo
      </button>
      <l-tailspin
        size="40"
        stroke="5"
        speed="0.9"
        color="#fff"
        class="h-10 w-10"
      ></l-tailspin>
      {loading ? (
        <l-tailspin
          size="40"
          stroke="5"
          speed="0.9"
          color="black"
        ></l-tailspin>
      ) : (
        <table className="min-w-full bg-white mt-4">
          <thead>
            <tr>
              <th className="py-2 w-1/2">Task</th>
              <th className="py-2 2-1/2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onEdit={handleEditTodo}
                onDelete={handleDeleteTodo}
              />
            ))}
          </tbody>
        </table>
      )}
      {modalOpen && (
        <TodoModal
          todo={currentTodo}
          onClose={() => setModalOpen(false)}
          onSave={fetchTodos}
        />
      )}
    </div>
  );
};

export default TodoList;
