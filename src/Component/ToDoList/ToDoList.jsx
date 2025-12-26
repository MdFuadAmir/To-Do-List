import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck, FaClipboardList } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

const ToDoList = () => {
  const [task, setTask] = useState("");

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAdd = (e) => {
    e.preventDefault();

    if (!task.trim()) {
      toast.error("Please write a task first!");
      return;
    }

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: task,
        completed: false,
      },
    ]);
    toast.success("Task added successfully");
    setTask("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
    toast.success("Task completed successfully");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
    toast.success("Task deleted");
  };

  return (
    <div className="max-w-2xl mx-auto mt-6 rounded-xl">
      {/* Input */}
      <form onSubmit={handleAdd} className="mb-6 w-full md:min-w-md ">
        <div className="relative w-full">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Add your task..."
            className="w-full px-5 pr-20 py-3 rounded-xl border outline-none"
          />
          <button
            type="submit"
            className="absolute right-1 top-1/2 -translate-y-1/2
              px-4 py-2 rounded-lg bg-orange-400 text-white font-medium
              hover:bg-orange-500"
          >
            Add +
          </button>
        </div>
      </form>

      {/* List */}
      {tasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-gray-400">
          <FaClipboardList className="text-5xl mb-4 opacity-70" />
          <h3 className="text-lg font-semibold text-gray-500">
            No Tasks Found
          </h3>
          <p className="text-sm mt-1 text-gray-400">
            Your to-do list is empty. Add a task to get started ✨
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {tasks.map((t) => (
            <li
              key={t.id}
              className="flex items-start gap-3 p-3 border rounded-lg"
            >
              <button
                onClick={() => toggleTask(t.id)}
                className={`
    w-6 h-6 flex items-center justify-center
    rounded-full border-2
    transition-all duration-200
    ${
      t.completed
        ? "bg-green-500 border-green-500 text-white"
        : "border-gray-400 hover:border-green-500"
    }
  `}
              >
                {t.completed && <FaCheck className="text-xs" />}
              </button>
              <span
                className={`flex-1 break-all whitespace-normal ${
                  t.completed ? "line-through text-gray-400" : "text-gray-700"
                }`}
              >
                {t.text}
              </span>

              <button
                onClick={() => deleteTask(t.id)}
                className="text-red-500 hover:text-red-600 text-xl hover:bg-red-100 self-start"
              >
                <RxCross2 />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ToDoList;
