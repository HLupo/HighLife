import type { Task } from "@prisma/client";
import { useState } from "react";
import { api } from "~/utils/api";

export const useTask = () => {
  const ctx = api.useContext();

  // CREATE TASK
  const { mutate: createTask, isLoading: isCreating } =
    api.task.create.useMutation({
      onSuccess: () => {
        void ctx.task.getAll.invalidate();
      },
      onError: (error) => {
        console.error(error);
      },
    });

  // UPDATE TASK
  const { mutate: updateTask, isLoading: isUpdating } =
    api.task.updateFields.useMutation({
      onSuccess: () => {
        void ctx.task.getAll.invalidate();
      },
      onError: (error) => {
        console.error(error);
      },
    });

  // DELETE TASK
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

  const handleDone = (task: Task) => {
    updateTask({ id: task.id, done: !task.done });
  };

  const handleDelete = (task: Task) => {
    deleteTask({ id: task.id });
  };

  return {
    isCreating,
    isUpdating,
    isDeleting,
    isDeleted,
    createTask,
    handleDone,
    handleDelete,
  };
};
