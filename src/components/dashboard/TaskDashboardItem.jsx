import { FiCalendar } from "react-icons/fi";
import DashboardBadge from "./DashboardBadge";
import DashboardItem from "./DashboardItem";

const getPriorityClass = (priority) => {
  const styles = {
    Baja: "border-[var(--priority-low)] bg-green-500/10 text-green-400",
    Media: "border-[var(--priority-medium)] bg-blue-500/10 text-blue-400",
    Alta: "border-[var(--priority-high)] bg-orange-500/10 text-orange-400",
    Crítica: "border-[var(--priority-critical)] bg-red-500/10 text-red-400",
  };

  return styles[priority] || styles.Media;
};

const getStatusClass = (status) => {
  const styles = {
    backlog: "border-[var(--status-backlog)] bg-slate-500/10 text-slate-400",
    todo: "border-[var(--status-todo)] bg-blue-500/10 text-blue-400",
    in_progress:
      "border-[var(--status-in-progress)] bg-violet-500/10 text-violet-400",
    review: "border-[var(--status-review)] bg-orange-500/10 text-orange-400",
    done: "border-[var(--status-done)] bg-green-500/10 text-green-400",
  };

  return styles[status] || styles.todo;
};

const getStatusLabel = (status) => {
  const labels = {
    backlog: "Backlog",
    todo: "To Do",
    in_progress: "In Progress",
    review: "Review",
    done: "Hecho",
  };

  return labels[status] || status;
};

const getBorderByStatus = (status) => {
  const styles = {
    backlog: "border-l-4 border-l-[var(--status-backlog)]",
    todo: "border-l-4 border-l-[var(--status-todo)]",
    in_progress: "border-l-4 border-l-[var(--status-in-progress)]",
    review: "border-l-4 border-l-[var(--status-review)]",
    done: "border-l-4 border-l-[var(--status-done)]",
  };

  return styles[status] || styles.todo;
};

const TaskDashboardItem = ({ task }) => {
  const checklistTotal = Array.isArray(task.checklist)
    ? task.checklist.length
    : 0;

  return (
    <DashboardItem className={getBorderByStatus(task.status)}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h4 className="font-semibold text-white">{task.title}</h4>

          <p className="mt-2 line-clamp-2 text-sm leading-5 text-[var(--color-text-soft)]">
            {task.description || "Sin descripción."}
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap justify-end gap-2">
          <DashboardBadge className={getPriorityClass(task.priority)}>
            {task.priority || "Media"}
          </DashboardBadge>

          <DashboardBadge className={getStatusClass(task.status)}>
            {getStatusLabel(task.status)}
          </DashboardBadge>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-[var(--color-text-muted)]">
        <DashboardBadge className="border-[var(--color-border-strong)] bg-[var(--color-sidebar)] text-[var(--color-text-muted)]">
          {task.role || "Sin rol"}
        </DashboardBadge>

        <span className="flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white">
            {task.assignee?.charAt(0)?.toUpperCase() || "A"}
          </span>

          {task.assignee || "Agustin"}
        </span>

        {task.dueDate && (
          <span className="flex items-center gap-1">
            <FiCalendar size={13} />
            {task.dueDate}
          </span>
        )}

        <span>Checklist: 0/{checklistTotal}</span>
      </div>
    </DashboardItem>
  );
};

export default TaskDashboardItem;
