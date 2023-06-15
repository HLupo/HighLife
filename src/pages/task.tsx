import Head from "next/head";
import type { NextPage } from "next";
import { TaskList } from "~/components/task/taskList";
import { useTaskPage } from "~/hooks/pages/useTaskPage";

export const TaskPage: NextPage = () => {
  const { setTitle, setDescription, title, description, mutate, isCreating } =
    useTaskPage();

  return (
    <>
      <Head>
        <title>TaskPage</title>
        <meta name="description" content="Generated by create-t3-app" />{" "}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <TaskList />
        <div className="flex w-[50%] flex-col gap-1 p-4">
          <input
            type="text"
            placeholder="Title"
            className="border border-slate-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isCreating}
          />
          <input
            type="text"
            placeholder="Description"
            className="border border-slate-400"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isCreating}
          />
          <button onClick={() => mutate({ title, description })}>
            {isCreating ? "Creating..." : "Create"}
          </button>
        </div>
      </main>
    </>
  );
};

export default TaskPage;