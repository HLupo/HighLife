import { useRef } from "react";
import { useTask } from "~/hooks/components/useTask";

export const TaskCreator = () => {
  const { createTask, isCreating } = useTask();

  const titleInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLInputElement>(null);
  const priorityInputRef = useRef<HTMLInputElement>(null);
  const endDateInputRef = useRef<HTMLInputElement>(null);
  const minutesRequiredInputRef = useRef<HTMLInputElement>(null);

  const formRef = useRef<HTMLFormElement>(null);

  const onSubmitFormCreateTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const priority = priorityInputRef.current?.value
      ? parseInt(priorityInputRef.current.value)
      : undefined;

    const endDate = endDateInputRef.current?.value
      ? new Date(endDateInputRef.current.value)
      : undefined;

    const minutesRequired = minutesRequiredInputRef.current?.value
      ? parseInt(minutesRequiredInputRef.current.value)
      : undefined;

    const data = {
      title: titleInputRef.current?.value,
      description: descriptionInputRef.current?.value,
      priority,
      endDate,
      minutesRequired,
    };

    if (!data.title) return;

    createTask({
      title: data.title,
      description: data.description,
      priority: data.priority,
      endAt: data.endDate,
      minutesRequired: data.minutesRequired,
    });

    formRef.current?.reset();
  };

  return (
    <div className="flex flex-col gap-1 p-4">
      <h1 className="self-center text-2xl">Create Task</h1>
      <form
        className="flex flex-col gap-1"
        onSubmit={onSubmitFormCreateTask}
        ref={formRef}
      >
        <h2>Title</h2>
        <input
          ref={titleInputRef}
          type="text"
          placeholder="Title"
          className="border border-slate-400"
        />
        <h2>Description (optionnal)</h2>
        <input
          ref={descriptionInputRef}
          type="text"
          placeholder="Description"
          className="border border-slate-400"
        />
        <h2>Priority (Optionnal, 1-3)</h2>
        <input
          ref={priorityInputRef}
          type="number"
          placeholder="Priority"
          className="border border-slate-400"
          min={0}
          max={3}
        />
        <h2>End date (optionnal)</h2>
        <input
          ref={endDateInputRef}
          type="date"
          placeholder="End date"
          className="border border-slate-400"
          min={new Date().toISOString().split("T")[0]}
        />
        <h2>Minutes required (optionnal)</h2>
        <input
          ref={minutesRequiredInputRef}
          type="number"
          placeholder="Minutes required"
          className="border border-slate-400"
          min={0}
        />
        <button
          className="focus:shadow-outline w-24 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
          type="submit"
          disabled={isCreating}
        >
          {isCreating ? "..." : "Submit"}
        </button>
      </form>
    </div>
  );
};
