import { api } from "~/utils/api";
import { useState } from "react";

export const useTodoPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const ctx = api.useContext();

  const { mutate, isLoading: isCreating } = api.todo.create.useMutation({
    onSuccess: () => {
      setTitle("");
      setDescription("");
      void ctx.todo.getAll.invalidate();
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
