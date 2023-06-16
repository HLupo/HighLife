import { TaskItem } from "./taskItem";
import { api } from "~/utils/api";

export const TaskList = () => {
  const { data: tasks, isSuccess, isLoading } = api.task.getAll.useQuery();

  const statusStyle = "flex h-full items-center justify-center";

  if (isLoading) return <div className={statusStyle}>Loading...</div>;
  if (!isSuccess) return <div className={statusStyle}>Error</div>;
  if (!tasks || tasks.length === 0)
    return <div className={statusStyle}>No tasks</div>;

  return (
    <div className="flex h-full flex-col overflow-scroll">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};
