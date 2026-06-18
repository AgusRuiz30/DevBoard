import { useMemo, useState } from "react";
import {
  FiBell,
  FiSearch,
  FiFolder,
  FiChevronDown,
  FiPlus,
  FiX,
} from "react-icons/fi";

import AuthInput from "./AuthInput";
import { useAuth } from "../../hooks/queries/useAuth";
import { useProjects } from "../../hooks/queries/useProjects";
import { useCreateProject } from "../../hooks/mutations/useProjectsMutations";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    stack: "",
  });

  const { data: profile } = useAuth();

  const { data: projectsData, isLoading: isLoadingProjects } = useProjects(
    profile?.profile_id,
  );

  const { mutate: createProject, isPending } = useCreateProject();

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
    if (isPending) return;
    setShowCreateModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateProject = (e) => {
    e.preventDefault();

    if (!profile?.profile_id) return;

    createProject(
      {
        name: form.name,
        description: form.description,
        stack: form.stack
          .split(",")
          .map((tech) => tech.trim())
          .filter(Boolean),
        profile_id: profile.profile_id,
      },
      {
        onSuccess: (response) => {
          const newProject = response?.project;

          if (newProject?.id) {
            setSelectedProjectId(newProject.id);
          }

          setForm({
            name: "",
            description: "",
            stack: "",
          });

          setShowCreateModal(false);
        },
      },
    );
  };

  return (
    <>
      <header className="relative flex items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-4">
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
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
          <button className="relative rounded-xl border border-[var(--color-border)] bg-[var(--color-sidebar)] p-3 text-[var(--color-text)] transition hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-soft)]">
            <FiBell size={18} />

            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--notice-urgent)] text-xs font-bold text-white">
              3
            </span>
          </button>

          <div className="h-10 w-10 rounded-full bg-[var(--color-secondary)] text-center text-sm font-bold leading-10 text-white">
            {profile?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>
        </div>
      </header>

      {showCreateModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
          <section className="w-full max-w-xl rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-2xl">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                  Nuevo proyecto
                </p>

                <h2 className="mt-2 text-2xl font-bold text-white">
                  Crear proyecto
                </h2>

                <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                  Se creará el proyecto y quedarás asignado automáticamente como{" "}
                  <strong className="text-white">Owner</strong>.
                </p>
              </div>

              <button
                type="button"
                onClick={handleCloseCreateModal}
                className="rounded-xl border border-[var(--color-border)] p-2 text-[var(--color-text-muted)] transition hover:bg-[var(--color-surface-soft)] hover:text-white"
              >
                <FiX size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-5">
              <AuthInput
                label="Nombre del proyecto"
                name="name"
                placeholder="DevBoard"
                value={form.name}
                onChange={handleChange}
                required
              />

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-[var(--color-text-soft)]">
                  Descripción
                </span>

                <textarea
                  name="description"
                  placeholder="Sistema de tareas y reportes para developers."
                  value={form.description}
                  onChange={handleChange}
                  rows={4}
                  required
                  className="w-full resize-none rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-sidebar)] px-4 py-3 text-sm text-[var(--color-text)] outline-none transition placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-secondary)]"
                />
              </label>

              <AuthInput
                label="Stack tecnológico"
                name="stack"
                placeholder="React, Neon, Tailwind"
                value={form.stack}
                onChange={handleChange}
                helperText="Separá las tecnologías con coma."
              />

              <button
                type="submit"
                disabled={isPending}
                className="flex w-full items-center justify-center gap-3 rounded-[var(--radius-md)] bg-[var(--color-light)] px-4 py-3 text-sm font-bold text-[var(--color-primary)] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isPending && (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--color-primary)] border-t-transparent" />
                )}

                {isPending ? "Creando proyecto..." : "Crear proyecto"}
              </button>
            </form>
          </section>
        </div>
      )}
    </>
  );
};

export default Header;
