import { TaskItem } from "./taskItem";
import { api } from "~/utils/api";

export const TaskList = () => {
  const { data: tasks, isSuccess, isLoading } = api.task.getAll.useQuery();

  if (isLoading) return <div>Loading...</div>;
  if (!isSuccess) return <div>Error</div>;
  if (!tasks || tasks.length === 0) return <div>No tasks</div>;

  return (
    <div className="">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};
