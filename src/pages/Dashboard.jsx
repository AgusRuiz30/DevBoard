import { useMemo, useState } from "react";
import {
  FiAlertTriangle,
  FiCheckSquare,
  FiFileText,
  FiAlertCircle,
} from "react-icons/fi";
import { useNavigate } from "react-router";

import { useAuth } from "../../hooks/queries/useAuth";
import { useProjects } from "../../hooks/queries/useProjects";
import { useTasks } from "../../hooks/queries/useTask";

import CreateProjectModal from "../components/modals/CreateProjectModal";

import DashboardSection from "../components/dashboard/DashboardSection";
import EmptyState from "../components/dashboard/EmptyState";
import ProjectSummaryCard from "../components/dashboard/ProjectSummaryCard";
import TaskDashboardItem from "../components/dashboard/TaskDashboardItem";
import NoticeItem from "../components/dashboard/NoticeItem";

const notices = [
  {
    id: "1",
    title: "Revisar módulo de tareas",
    message:
      "Antes de avanzar con reportes, revisar la asignación obligatoria de miembros.",
    type: "urgent",
    label: "Urgente",
    author: "Sofia",
    date: "2026-06-13",
    recipients: "1 destinatario",
    isRead: false,
  },
  {
    id: "2",
    title: "Deploy programado",
    message: "Subimos a producción el viernes 16/06 a las 18hs.",
    type: "important",
    label: "Importante",
    author: "Martin",
    date: "2026-06-12",
    recipients: "Todo el equipo",
    isRead: false,
  },
];

const Dashboard = () => {
  const navigate = useNavigate();

  const [selectedProjectId, setSelectedProjectId] = useState(null);

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

  const selectedProject = useMemo(() => {
    if (!projects.length) return null;

    if (!selectedProjectId) return projects[0];

    return (
      projects.find((project) => project.id === selectedProjectId) ||
      projects[0]
    );
  }, [projects, selectedProjectId]);

  const { data: tasksData, isLoading: isLoadingTasks } = useTasks(
    selectedProject?.id,
  );

  const tasks = useMemo(() => {
    if (!tasksData) return [];

    return tasksData
      .filter((task) => task.profile_id === profile.profile_id)
      .map((task) => ({
        id: task.id,
        title: task.name || task.title,
        description: task.description || "Sin descripción.",
        status: task.status,
        priority: task.priority || "Media",
        role: task.rol || task.role || "Sin rol",
        checklist: Array.isArray(task.checklist) ? task.checklist : [],
        dueDate: task.due_date || task.dueDate,
        assignee: task.assignee || profile?.name || "Usuario",
      }));
  }, [tasksData, profile]);

  const pendingTasks = useMemo(() => {
    return tasks.filter((task) => task.status !== "done").slice(5);
  }, [tasks]);

  const completedTasks = useMemo(() => {
    return tasks.filter((task) => task.status === "done").length;
  }, [tasks]);

  const progress = useMemo(() => {
    if (!tasks.length) return 0;

    return Math.round((completedTasks / tasks.length) * 100);
  }, [completedTasks, tasks]);

  const showCreateProjectModal =
    !isLoadingProfile &&
    !isLoadingProjects &&
    profile?.profile_id &&
    projects.length === 0;

  const handleAddTask = () => {
    navigate("/task");
  };

  if (isLoadingProfile || isLoadingProjects || isLoadingTasks) {
    return (
      <main className="flex min-h-full items-center justify-center bg-[var(--color-bg)] text-[var(--color-text)]">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-[var(--color-border-strong)] border-t-[var(--color-light)]" />

          <p className="mt-4 text-sm text-[var(--color-text-muted)]">
            Cargando dashboard...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-full bg-[var(--color-bg)] text-[var(--color-text)]">
      {showCreateProjectModal && (
        <CreateProjectModal
          profileId={profile.profile_id}
          onCreated={() => setSelectedProjectId(null)}
        />
      )}

      <div className="space-y-5">
        <ProjectSummaryCard
          project={selectedProject}
          profile={profile}
          progress={progress}
          totalTasks={tasks.length}
          completedTasks={completedTasks}
          onCreateTask={handleAddTask}
        />

        <section className="grid gap-5 xl:grid-cols-2">
          <DashboardSection
            title="Avisos importantes"
            subtitle="Avisos del proyecto seleccionado"
            icon={FiAlertTriangle}
            actionText="Ver todos"
          >
            {notices.length > 0 ? (
              notices.map((notice) => (
                <NoticeItem key={notice.id} notice={notice} />
              ))
            ) : (
              <EmptyState
                title="No hay avisos importantes"
                description="Cuando el equipo envíe avisos, van a aparecer acá."
              />
            )}
          </DashboardSection>

          <DashboardSection
            title="Mis tareas pendientes"
            subtitle={
              isLoadingTasks
                ? "Cargando tareas..."
                : `${pendingTasks.length} asignadas a ti`
            }
            icon={FiCheckSquare}
            actionText="Ver todas"
            onActionClick={() => navigate("/task")}
          >
            {isLoadingTasks ? (
              <EmptyState
                title="Cargando tareas..."
                description="Estamos buscando las tareas del proyecto."
              />
            ) : pendingTasks.length > 0 ? (
              pendingTasks.map((task) => (
                <TaskDashboardItem key={task.id} task={task} />
              ))
            ) : (
              <EmptyState
                title="No tenés tareas pendientes"
                description="Cuando crees o te asignen tareas, las vas a ver acá."
              />
            )}
          </DashboardSection>

          <DashboardSection
            title="Bugs abiertos"
            subtitle="Problemas reportados del proyecto"
            icon={FiAlertCircle}
            actionText="Ver bugs"
          >
            <EmptyState
              title="No hay bugs abiertos"
              description="Los bugs reportados del proyecto van a aparecer acá."
            />
          </DashboardSection>

          <DashboardSection
            title="Reportes recientes"
            subtitle="Últimos reportes generados"
            icon={FiFileText}
            actionText="Ver reportes"
          >
            <EmptyState
              title="No hay reportes recientes"
              description="Cuando generes reportes, se van a listar acá."
            />
          </DashboardSection>
        </section>
      </div>
    </main>
  );
};

export default Dashboard;
