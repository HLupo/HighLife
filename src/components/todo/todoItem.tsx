import type { Todo } from "@prisma/client";
import { useTodo } from "~/hooks/components/useTodo";

export const TodoItem = (props: { todo: Todo }) => {
  const { todo } = props;
  const { isUpdating, handleDone, isDeleting, isDeleted, handleDelete } =
    useTodo(todo);

  const deletingStyle = isDeleting || isDeleted ? "opacity-50" : "";

  return (
    <div className={`mt-1 border border-slate-400 ${deletingStyle}`}>
      <h2>{todo.title}</h2>
      <p>{todo.description}</p>
      <div className="flex gap-1">
        <p>Done</p>
        <input
          type="checkbox"
          checked={todo.done}
          onChange={handleDone}
          disabled={isUpdating}
        />
        {todo.done && !isDeleted && (
          <button
            className="bg-red-200"
            onClick={handleDelete}
            disabled={isDeleting || isDeleted}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        )}
      </div>
    </div>
  );
};
