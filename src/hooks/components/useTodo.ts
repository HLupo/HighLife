import type { Todo } from "@prisma/client";
import { api } from "~/utils/api";

export const useTodo = (todo: Todo) => {
  const ctx = api.useContext();

  const { mutate: updateDone, isLoading: isUpdating } =
    api.todo.updateDone.useMutation({
      onSuccess: () => {
        void ctx.todo.getAll.invalidate();
      },
    });

  const {
    mutate: deleteTodo,
    isLoading: isDeleting,
    isSuccess: isDeleted,
  } = api.todo.delete.useMutation({
    onSuccess: () => {
      void ctx.todo.getAll.invalidate();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleDone = () => {
    updateDone({ id: todo.id, done: !todo.done });
  };

  const handleDelete = () => {
    deleteTodo({ id: todo.id });
  };

  return {
    isUpdating,
    isDeleting,
    isDeleted,
    handleDone,
    handleDelete,
  };
};
