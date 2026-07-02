import { useMemo, useState } from "react";
import { FiPlus } from "react-icons/fi";

import { useProjects } from "../../hooks/queries/useProjects";
import { useAuth } from "../../hooks/queries/useAuth";
import { useTasks } from "../../hooks/queries/useTask";

import {
  useCreateTask,
  useUpdateTaskStatus,
} from "../../hooks/mutations/useTaskMutations";

import ListTask from "../components/ListTask";
import NewTaskModal from "../components/modals/NewTaskModal";

const Task = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [defaultTaskStatus, setDefaultTaskStatus] = useState("todo");

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

  const { data: tasksData, isLoading: isLoadingTasks } = useTasks(
    selectedProject?.id,
  );

  const { mutate: createTask, isPending: isCreatingTask } = useCreateTask();
  const { mutate: updateTaskStatusMutation } = useUpdateTaskStatus();

  const tasks = useMemo(() => {
    if (!tasksData) return [];

    return tasksData.map((task) => ({
      id: task.id || task.task_id,
      title: task.name,
      description: task.description,
      dueDate: task.dueDate || task.due_date,
      status: task.status,
      priority: task.priority,
      assignee: task.assignee,
      role: task.role,
      checklist: task.checklist,
      stack: task.stack,
    }));
  }, [tasksData]);

  const handleCreateTask = (status = "todo") => {
    setDefaultTaskStatus(status);
    setIsCreateModalOpen(true);
  };

  const handleChangeStatus = ({ task_id, status }) => {
    if (!selectedProject?.id) return;

    updateTaskStatusMutation({
      task_id,
      status,
      project_id: selectedProject.id,
    });
  };

  if (isLoadingProfile || isLoadingProjects || isLoadingTasks) {
    return (
      <main className="flex min-h-full items-center justify-center bg-[var(--color-bg)] px-4 text-[var(--color-text)]">
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
    <div className="min-h-full min-w-0 bg-[var(--color-bg)] text-[var(--color-text)]">
      <div className="rounded-t-lg border-l-4 border-l-[var(--status-todo)] bg-[var(--color-surface)] p-4 sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
              Tareas
            </span>

            <h1 className="mt-1 truncate text-xl font-bold text-white sm:text-2xl xl:text-3xl">
              Tablero Kanban — {selectedProject?.name ?? "Sin proyecto"}
            </h1>

            <p className="mt-2 text-sm text-[var(--color-text-muted)]">
              ¿Qué necesitas hacer hoy?
            </p>
          </div>

          <button
            type="button"
            disabled={!selectedProject || isCreatingTask}
            onClick={() => handleCreateTask("todo")}
            className="flex w-full items-center justify-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            <FiPlus />
            Crear tarea
          </button>
        </div>
      </div>

      {!selectedProject ? (
        <div className="p-5 text-sm text-[var(--color-text-muted)]">
          Primero tenés que crear o seleccionar un proyecto.
        </div>
      ) : (
        <ListTask
          tasks={tasks}
          onChangeStatus={handleChangeStatus}
          onCreateTask={handleCreateTask}
        />
      )}

      <NewTaskModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        defaultStatus={defaultTaskStatus}
        projectId={selectedProject?.id}
        profileId={profile?.profile_id}
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
