import { useEffect, useMemo, useState } from "react";
import { FiMoreHorizontal, FiPlus } from "react-icons/fi";
import CardTask from "./CardTask";

const columns = [
  {
    id: "backlog",
    title: "Backlog / Ideas",
  },
  {
    id: "todo",
    title: "Lista de tareas",
  },
  {
    id: "in_progress",
    title: "En proceso",
  },
  {
    id: "review",
    title: "Testing / Review",
  },
  {
    id: "done",
    title: "Hecho",
  },
];

const ListTask = ({ tasks = [], onChangeStatus, onCreateTask }) => {
  const [localTasks, setLocalTasks] = useState(tasks);
  const [draggingTaskId, setDraggingTaskId] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);

  useEffect(() => {
    setLocalTasks(tasks);
  }, [tasks]);

  const tasksByColumn = useMemo(() => {
    return columns.reduce((acc, column) => {
      acc[column.id] = localTasks.filter((task) => task.status === column.id);
      return acc;
    }, {});
  }, [localTasks]);

  const handleDragStart = (taskId) => {
    setDraggingTaskId(taskId);
  };

  const handleDragEnd = () => {
    setDraggingTaskId(null);
    setDragOverColumn(null);
  };

  const handleDragOver = (e, columnId) => {
    e.preventDefault();
    setDragOverColumn(columnId);
  };

  const handleDrop = (columnId) => {
    if (!draggingTaskId) return;

    const task = localTasks.find((item) => item.id === draggingTaskId);

    if (!task || task.status === columnId) {
      handleDragEnd();
      return;
    }

    setLocalTasks((prev) =>
      prev.map((item) =>
        item.id === draggingTaskId
          ? {
              ...item,
              status: columnId,
            }
          : item,
      ),
    );

    onChangeStatus?.({
      task_id: draggingTaskId,
      status: columnId,
    });

    handleDragEnd();
  };

  return (
    <div className="flex items-start gap-5 overflow-x-auto p-5">
      {columns.map((column) => {
        const columnTasks = tasksByColumn[column.id] || [];
        const isDragOver = dragOverColumn === column.id;

        return (
          <section
            key={column.id}
            onDragOver={(e) => handleDragOver(e, column.id)}
            onDragLeave={() => setDragOverColumn(null)}
            onDrop={() => handleDrop(column.id)}
            className={`flex min-h-[200px] w-[300px] shrink-0 flex-col rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] transition ${
              isDragOver ? "border-[var(--color-secondary)]" : ""
            }`}
          >
            <header className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-3">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white">{column.title}</h3>

                <span className="text-sm text-[var(--color-text-muted)]">
                  {columnTasks.length}
                </span>
              </div>

              <button
                type="button"
                className="text-[var(--color-text-muted)] transition hover:text-white"
              >
                <FiMoreHorizontal size={18} />
              </button>
            </header>

            <div className="flex-1 space-y-3 overflow-y-auto p-3">
              {columnTasks.map((task) => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={() => handleDragStart(task.id)}
                  onDragEnd={handleDragEnd}
                  className={`cursor-grab active:cursor-grabbing ${
                    draggingTaskId === task.id ? "opacity-50" : ""
                  }`}
                >
                  <CardTask
                    title={task.title}
                    description={task.description}
                    dueDate={task.dueDate}
                    status={task.status}
                    priority={task.priority}
                    onClick={task.onClick}
                  />
                </div>
              ))}
            </div>

            <footer className="border-t border-[var(--color-border)] px-3 py-3">
              <button
                type="button"
                onClick={() => onCreateTask?.(column.id)}
                className="flex w-full items-center gap-2 rounded-[var(--radius-md)] px-3 py-2 text-sm font-semibold text-[var(--color-text-muted)] transition hover:bg-[var(--color-surface-soft)] hover:text-white"
              >
                <FiPlus />
                Añade una tarjeta
              </button>
            </footer>
          </section>
        );
      })}
    </div>
  );
};

export default ListTask;
