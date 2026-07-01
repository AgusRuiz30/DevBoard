import { useMemo } from "react";
import { FiPlus } from "react-icons/fi";
import { useProjects } from "../../hooks/queries/useProjects";
import { useAuth } from "../../hooks/queries/useAuth";
import ListTask from "../components/ListTask";
import { useState } from "react";

import NewTaskModal from "../components/modals/NewTaskModal";

const tasks = [
  {
    id: "1",
    title: "Aplicarle RHF a todos los inputs",
    description: "Inputs de sets",
    dueDate: "2026-06-25",
    status: "todo",
    priority: "Alta",
  },
  {
    id: "2",
    title: "Crear schemas en Zod",
    description: "Validaciones principales",
    dueDate: "2026-06-26",
    status: "in_progress",
    priority: "Media",
  },
  {
    id: "3",
    title: "Mejorar UI del calendario",
    description: "Cards, estados y responsive",
    dueDate: "2026-06-28",
    status: "in_progress",
    priority: "Media",
  },
  {
    id: "4",
    title: "Estructura de carpetas",
    description: "components, pages, layouts",
    dueDate: "2026-06-30",
    status: "done",
    priority: "Alta",
  },
];

const Task = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [defaultTaskStatus, setDefaultTaskStatus] = useState("todo");

  const handleCreateTask = (status = "todo") => {
    setDefaultTaskStatus(status);
    setIsCreateModalOpen(true);
  };

  const handleSubmitTask = (taskData) => {
    console.log("Nueva tarea:", {
      ...taskData,
      project_id: selectedProject?.id,
      profile_id: profile?.profile_id,
    });
  };
  const { data: profile, isLoading: isLoadingProfile } = useAuth();

  const { data: projectsData, isLoading: isLoadingProjects } = useProjects(
    profile?.profile_id,
  );

  const projects = useMemo(() => {
    if (!projectsData) return [];

    return projectsData
      .map((item) => item.projects || item.project || item)
      .filter(Boolean);
  }, [projectsData]);

  const selectedProject = projects[0] ?? null;

  const handleChangeStatus = ({ task_id, status }) => {
    console.log("Tarea movida:", task_id, status);
  };

  if (isLoadingProfile || isLoadingProjects) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[var(--color-bg)] text-[var(--color-text)] px-4 text-[var(--color-text)]">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-[var(--color-border-strong)] border-t-[var(--color-light)]" />
          <p className="mt-4 text-sm text-[var(--color-text-muted)]">
            Cargando tareas...
          </p>
        </div>
      </main>
    );
  }

  return (
    <div className="max-w-screen">
      <div className="flex items-center justify-between gap-5 rounded-t-lg border-[var(--color-border)] border-l-4 border-l-[var(--status-todo)] bg-[var(--color-surface)] p-5 max-w-[100vw]">
        <div>
          <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
            Tareas
          </span>

          <h1 className="text-3xl font-bold text-white">
            Tablero Kanban — {selectedProject?.name ?? "Sin proyecto"}
          </h1>

          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            ¿Qué necesitas hacer hoy?
          </p>
        </div>

        <button
          className="flex items-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-primary)] text-white hover:bg-blue-500 px-4 py-2 text-sm font-semibold text-[var(--color-primary)] transition "
          onClick={() => handleCreateTask("todo")}
        >
          <FiPlus />
          Crear tarea
        </button>
      </div>

      <ListTask
        tasks={tasks}
        onChangeStatus={handleChangeStatus}
        onCreateTask={handleCreateTask}
      />
      <NewTaskModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleSubmitTask}
        defaultStatus={defaultTaskStatus}
        members={[
          {
            id: profile?.profile_id,
            name: profile?.name || "Agustin",
            role: "FrontEnd UI",
          },
        ]}
      />
    </div>
  );
};

export default Task;
