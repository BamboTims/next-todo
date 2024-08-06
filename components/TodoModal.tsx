"use client";

import { useState, useEffect } from "react";
import { Todo, todoSchema } from "../models/todo";
import { CSSTransition } from "react-transition-group";
import * as yup from "yup";

interface TodoModalProps {
  todo: Todo | null;
  onClose: () => void;
  onSave: () => void;
}

const TodoModal: React.FC<TodoModalProps> = ({ todo, onClose, onSave }) => {
  const [task, setTask] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (todo) {
      setTask(todo.task);
    } else {
      setTask("");
    }
  }, [todo]);

  const handleSave = async () => {
    setError("");

    try {
      const validatedData = await todoSchema.validate(
        { task },
        { abortEarly: false }
      );

      const response = await fetch("/api/todos", {
        method: todo ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo ? { ...todo, newTask: task } : validatedData),
      });

      if (!response.ok) {
        throw new Error("Failed to save the todo");
      }

      onSave();
      onClose();
    } catch (error: any) {
      setError(error?.message);
    }
  };

  return (
    <CSSTransition
      in={true}
      appear={true}
      timeout={300}
      classNames="fade"
    >
      <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
        <div className="bg-white p-4 rounded shadow-lg transform transition-all duration-300 scale-95">
          <h2 className="text-xl font-bold mb-4">
            {todo ? "Edit Todo" : "Add Todo"}
          </h2>
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className={`border p-2 rounded w-full mb-2 ${
              error ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your task"
          />
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600 transition-colors duration-300"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors duration-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </CSSTransition>
  );
};

export default TodoModal;
