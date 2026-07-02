import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import {
  FiBell,
  FiSearch,
  FiFolder,
  FiChevronDown,
  FiPlus,
} from "react-icons/fi";

import { useAuth } from "../../hooks/queries/useAuth.js";
import { useProjects } from "../../hooks/queries/useProjects.js";
import { useLogout } from "../../hooks/mutations/useAuthMutations.js";
import { NotificationsModal } from "./modals/NotificationsModal.jsx";
import CreateProjectModal from "./modals/CreateProjectModal.jsx";
import ConfigUserModal from "./modals/ConfigUserModal.jsx";

const Header = () => {
  const navigate = useNavigate();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  const { data: profile } = useAuth();
  const { mutate: logoutUser, isPending: isLoggingOut } = useLogout();

  const { data: projectsData, isLoading: isLoadingProjects } = useProjects(
    profile?.profile_id,
  );
  const notifications = [
    {
      id: "1",
      title: "Nueva tarea asignada",
      message: "Te asignaron la tarea Crear sistema de tareas.",
      type: "task",
      is_read: false,
      project_name: projectsData?.[0]?.name,
      created_at: "Hace 5 min",
    },
    {
      id: "2",
      title: "Bug crítico reportado",
      message: "Se reportó un error en el dashboard principal.",
      type: "bug",
      is_read: false,
      project_name: projectsData?.[0]?.name,
      created_at: "Hace 20 min",
    },
  ];
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

  const handleSelectProject = (project) => {
    setSelectedProjectId(project.id);
    setIsOpen(false);
  };

  const handleOpenCreateModal = () => {
    setIsOpen(false);
    setShowCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
  };

  const handleProjectCreated = () => {
    setShowCreateModal(false);
  };

  const handleToggleUserModal = () => {
    setIsOpen(false);
    setIsUserModalOpen((prev) => !prev);
  };

  const handleLogout = () => {
    logoutUser(undefined, {
      onSuccess: () => {
        setIsUserModalOpen(false);
        navigate("/login");
      },
    });
  };

  return (
    <>
      <header className="relative flex items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-4">
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setIsUserModalOpen(false);
              setIsOpen((prev) => !prev);
            }}
            className="flex items-center gap-3 rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-sidebar)] px-4 py-3 text-sm font-semibold text-[var(--color-text)] transition hover:border-[var(--color-light)]"
          >
            <FiFolder className="text-[var(--color-text-muted)]" size={18} />

            <span className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-text-muted)]">
              Proyecto:
            </span>

            <span className="text-base font-bold text-white">
              {isLoadingProjects
                ? "Cargando..."
                : selectedProject?.name || "Sin proyecto"}
            </span>

            <FiChevronDown
              size={18}
              className={`text-[var(--color-text-muted)] transition ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isOpen && (
            <div className="absolute left-0 top-[calc(100%+8px)] z-50 w-[360px] rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-2 shadow-2xl">
              <p className="px-3 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                Proyectos
              </p>

              <div className="space-y-1">
                {projects.length > 0 ? (
                  projects.map((project) => {
                    const isSelected = selectedProject?.id === project.id;

                    return (
                      <button
                        key={project.id}
                        type="button"
                        onClick={() => handleSelectProject(project)}
                        className={`flex w-full items-center justify-between rounded-lg px-3 py-3 text-left transition ${
                          isSelected
                            ? "bg-[var(--color-surface-soft)] text-white"
                            : "text-[var(--color-text-soft)] hover:bg-[var(--color-surface-soft)] hover:text-white"
                        }`}
                      >
                        <span className="font-semibold">{project.name}</span>

                        <span className="text-sm text-[var(--color-text-muted)]">
                          {project.status || "En desarrollo"}
                        </span>
                      </button>
                    );
                  })
                ) : (
                  <div className="px-3 py-4">
                    <p className="text-sm font-semibold text-white">
                      No tenés proyectos
                    </p>

                    <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                      Creá uno para empezar a usar DevBoard.
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-2 border-t border-[var(--color-border)] pt-2">
                <button
                  type="button"
                  onClick={handleOpenCreateModal}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left font-semibold text-[var(--color-text)] transition hover:bg-[var(--color-surface-soft)] hover:text-white"
                >
                  <FiPlus size={18} />
                  Crear nuevo proyecto
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="hidden w-96 items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-sidebar)] px-3 py-2 transition focus-within:border-[var(--color-secondary)] md:flex">
          <FiSearch className="text-[var(--color-text-muted)]" />

          <input
            className="w-full bg-transparent text-sm text-[var(--color-text)] outline-none placeholder:text-[var(--color-text-muted)]"
            placeholder="Buscar tareas, avisos o bugs..."
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsNotificationsOpen((prev) => !prev)}
              className="relative rounded-xl border border-[var(--color-border)] bg-[var(--color-sidebar)] p-3 text-[var(--color-text)] transition hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-soft)]"
            >
              <FiBell size={18} />

              {notifications.filter((item) => !item.is_read).length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--notice-urgent)] text-xs font-bold text-white">
                  {notifications.filter((item) => !item.is_read).length}
                </span>
              )}
            </button>

            {isNotificationsOpen && (
              <NotificationsModal
                notifications={notifications}
                onClose={() => setIsNotificationsOpen(false)}
                onMarkAsRead={(notificationId) => {
                  console.log("Marcar como leída:", notificationId);
                }}
                onMarkAllAsRead={() => {
                  console.log("Marcar todas como leídas");
                }}
              />
            )}
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={handleToggleUserModal}
              className="h-10 w-10 rounded-full bg-[var(--color-secondary)] text-center text-sm font-bold leading-10 text-white transition hover:ring-2 hover:ring-[var(--color-border-strong)]"
            >
              {profile?.name?.charAt(0)?.toUpperCase() || "U"}
            </button>

            {isUserModalOpen && (
              <ConfigUserModal
                profile={profile}
                onClose={() => setIsUserModalOpen(false)}
                onLogout={handleLogout}
                isLoggingOut={isLoggingOut}
              />
            )}
          </div>
        </div>
      </header>

      {showCreateModal && (
        <CreateProjectModal
          profileId={profile?.profile_id}
          onCreated={handleProjectCreated}
          onClose={handleCloseCreateModal}
        />
      )}
    </>
  );
};

export default Header;
