import { api } from "~/utils/api";
import { useState } from "react";

export const useTaskPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const ctx = api.useContext();

  const { mutate, isLoading: isCreating } = api.task.create.useMutation({
    onSuccess: () => {
      setTitle("");
      setDescription("");
      void ctx.task.getAll.invalidate();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return {
    title,
    description,
    setTitle,
    setDescription,
    mutate,
    isCreating,
  };
};
