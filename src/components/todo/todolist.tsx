import { TodoItem } from "./todoItem";
import { api } from "~/utils/api";

export const TodoList = () => {
  const { data: todos, isSuccess, isLoading } = api.todo.getAll.useQuery();

  if (isLoading) return <div>Loading...</div>;
  if (!isSuccess) return <div>Error</div>;
  if (!todos || todos.length === 0) return <div>No todos</div>;

  return (
    <div className="">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};
