import type { Task } from "@prisma/client";
import { useTask } from "~/hooks/components/useTask";

export const TaskItem = (props: { task: Task }) => {
  const { task } = props;
  const { isUpdating, handleDone, isDeleting, isDeleted, handleDelete } =
    useTask(task);

  const deletingStyle = isDeleting || isDeleted ? "opacity-50" : "";

  return (
    <div className={`mt-1 border border-slate-400 ${deletingStyle}`}>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <div className="flex gap-1">
        <p>Done</p>
        <input
          type="checkbox"
          checked={task.done}
          onChange={handleDone}
          disabled={isUpdating}
        />
        {task.done && !isDeleted && (
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
