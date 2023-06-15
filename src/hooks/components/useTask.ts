import type { Task } from "@prisma/client";
import { api } from "~/utils/api";

export const useTask = (task: Task) => {
  const ctx = api.useContext();

  const { mutate: updateDone, isLoading: isUpdating } =
    api.task.updateDone.useMutation({
      onSuccess: () => {
        void ctx.task.getAll.invalidate();
      },
    });

  const {
    mutate: deleteTask,
    isLoading: isDeleting,
    isSuccess: isDeleted,
  } = api.task.delete.useMutation({
    onSuccess: () => {
      void ctx.task.getAll.invalidate();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleDone = () => {
    updateDone({ id: task.id, done: !task.done });
  };

  const handleDelete = () => {
    deleteTask({ id: task.id });
  };

  return {
    isUpdating,
    isDeleting,
    isDeleted,
    handleDone,
    handleDelete,
  };
};
