import { FiCalendar } from "react-icons/fi";

const priorityStyles = {
  Baja: "border-[var(--priority-low)] bg-green-500/10 text-green-400",
  Media: "border-[var(--priority-medium)] bg-blue-500/10 text-blue-400",
  Alta: "border-[var(--priority-high)] bg-orange-500/10 text-orange-400",
  Crítica: "border-[var(--priority-critical)] bg-red-500/10 text-red-400",
};

const roleStyles = {
  "FrontEnd UI": "bg-[var(--color-primary)] text-[var(--color-light)]",
  "Logic FrontEnd": "bg-violet-500/15 text-violet-300",
  Backend: "bg-green-500/15 text-green-300",
  "Full Stack": "bg-blue-500/15 text-blue-300",
};

const CardTask = ({
  title,
  description,
  dueDate,
  priority = "Media",
  role = "FrontEnd UI",
  assignee = "Agustin",
  checklist = "0/0",
  stack = [],
  onClick,
}) => {
  const initial = assignee?.charAt(0)?.toUpperCase() || "U";

  return (
    <article
      onClick={onClick}
      className="rounded-[var(--radius-md)]  border border-[var(--color-border)] bg-[var(--color-surface)] p-3 shadow-sm transition hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface)]"
    >
      <div className="flex items-start justify-between gap-3">
        <h4 className="text-sm font-bold leading-5 text-white">{title}</h4>

        <span
          className={`shrink-0 rounded-md border px-2 py-1 text-xs font-semibold ${
            priorityStyles[priority] ||
            "border-[var(--priority-medium)] bg-blue-500/10 text-blue-400"
          }`}
        >
          {priority}
        </span>
      </div>

      {description && (
        <p className="mt-3 text-sm leading-5 text-[var(--color-text-soft)]">
          {description}
        </p>
      )}

      {stack.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {stack.map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-[var(--color-border)] bg-[var(--color-sidebar)] px-2 py-1 text-xs font-medium text-[var(--color-text-muted)]"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      <div className="mt-3">
        <span
          className={`inline-flex rounded-md px-2 py-1 text-xs font-semibold ${
            roleStyles[role] ||
            "bg-[var(--color-primary)] text-[var(--color-light)]"
          }`}
        >
          {role}
        </span>
      </div>

      <footer className="mt-4 flex items-center justify-between gap-3 text-xs text-[var(--color-text-muted)]">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--status-done)] text-xs font-bold text-white">
            {initial}
          </span>

          <span>{assignee}</span>
        </div>

        <div className="flex items-center gap-2">
          <span>{checklist}</span>

          {dueDate && (
            <span className="flex items-center gap-1">
              <FiCalendar size={13} />
              {dueDate}
            </span>
          )}
        </div>
      </footer>
    </article>
  );
};

export default CardTask;
