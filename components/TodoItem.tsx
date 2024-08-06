import { Todo } from "../models/todo";

interface TodoItemProps {
  todo: Todo;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onEdit, onDelete }) => {
  return (
    <tr>
      <td className="py-2 w-1/2 text-center">{todo.task}</td>
      <td className="py-2 space-x-4 w-1/2 text-center">
        <button
          onClick={() => onEdit(todo)}
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TodoItem;
