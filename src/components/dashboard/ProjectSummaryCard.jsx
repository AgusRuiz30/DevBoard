import { FiFolder, FiPlus, FiSettings, FiUsers } from "react-icons/fi";
import Avatar from "../Avatar";
import DashboardBadge from "./DashboardBadge";
import EmptyState from "./EmptyState";

const ProjectSummaryCard = ({
  project,
  profile,
  progress = 0,
  totalTasks = 0,
  completedTasks = 0,
  onCreateTask,
}) => {
  return (
    <section className="rounded-[var(--radius-lg)] border border-[var(--color-border)] border-l-4 border-l-[var(--status-todo)] bg-[var(--color-surface)] p-5">
      {!project ? (
        <EmptyState
          title="Todavía no tenés proyectos"
          description="Creá tu primer proyecto para empezar a trabajar."
        />
      ) : (
        <>
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
            <div>
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                <FiFolder />
                Proyecto seleccionado
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-3">
                <h2 className="text-2xl font-bold text-white">
                  {project.name}
                </h2>

                <DashboardBadge className="border-[var(--status-todo)] bg-blue-500/10 text-blue-400">
                  {project.status || "En desarrollo"}
                </DashboardBadge>
              </div>

              <p className="mt-2 max-w-2xl text-sm text-[var(--color-text-soft)]">
                {project.description || "Sin descripción."}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack?.length > 0 ? (
                  project.stack.map((tech) => (
                    <DashboardBadge
                      key={tech}
                      className="border-[var(--color-border-strong)] bg-[var(--color-primary)] text-[var(--color-light)]"
                    >
                      {tech}
                    </DashboardBadge>
                  ))
                ) : (
                  <span className="text-sm text-[var(--color-text-muted)]">
                    Sin stack definido
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="rounded-[var(--radius-md)] bg-[var(--color-surface-soft)] px-4 py-2 text-sm font-semibold text-[var(--color-light)] transition hover:text-white">
                <FiSettings />
              </button>

              <button
                type="button"
                onClick={onCreateTask}
                className="flex items-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
              >
                <FiPlus />
                Crear tarea
              </button>
            </div>
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-3">
            <div>
              <div className="mb-2 flex justify-between text-xs font-bold uppercase text-[var(--color-text-muted)]">
                <span>Progreso semanal</span>
                <span>{progress}%</span>
              </div>

              <div className="h-2 rounded-full bg-[var(--color-border)]">
                <div
                  className="h-full rounded-full bg-[var(--status-todo)] transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex justify-between text-xs font-bold uppercase text-[var(--color-text-muted)]">
                <span>Tareas</span>
                <span>{totalTasks}</span>
              </div>

              <p className="text-sm text-[var(--color-text-soft)]">
                {completedTasks} hechas · {totalTasks - completedTasks}{" "}
                pendientes
              </p>
            </div>

            <div className="flex items-end gap-2">
              <div>
                <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase text-[var(--color-text-muted)]">
                  <FiUsers />
                  Miembros activos
                </p>

                <div className="flex items-center gap-2">
                  <Avatar
                    initial={profile?.name?.charAt(0) || "U"}
                    name={profile?.name || "Usuario"}
                    size="sm"
                  />

                  <span className="text-sm text-[var(--color-text-muted)]">
                    Owner
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default ProjectSummaryCard;
