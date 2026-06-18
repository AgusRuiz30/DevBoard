import { useMemo, useState } from "react";
import {
  FiAlertTriangle,
  FiCheckSquare,
  FiFileText,
  FiFolder,
  FiAlertCircle,
  FiUsers,
} from "react-icons/fi";

import Avatar from "../components/Avatar";
import AuthInput from "../components/AuthInput";
import { useAuth } from "../../hooks/queries/useAuth";
import { useProjects } from "../../hooks/queries/useProjects";
import { useCreateProject } from "../../hooks/mutations/useProjectsMutations";

const STACK_OPTIONS = [
  "React",
  "Vite",
  "Next.js",
  "JavaScript",
  "TypeScript",
  "Tailwind",
  "CSS",
  "Node.js",
  "Express",
  "Neon",
  "PostgreSQL",
  "Supabase",
  "Firebase",
  "Zustand",
  "TanStack Query",
  "React Router",
];

const Badge = ({ children, className = "" }) => (
  <span
    className={`inline-flex items-center rounded-full border px-2 py-1 text-xs font-semibold ${className}`}
  >
    {children}
  </span>
);

const SectionCard = ({ title, subtitle, icon: Icon, children, actionText }) => (
  <section className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)]">
    <header className="flex items-center justify-between border-b border-[var(--color-border)] px-5 py-4">
      <div>
        <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-[var(--color-text)]">
          <Icon className="text-[var(--color-text-muted)]" />
          {title}
        </h3>

        <p className="mt-1 text-sm text-[var(--color-text-muted)]">
          {subtitle}
        </p>
      </div>

      {actionText && (
        <button className="text-sm font-semibold text-blue-400 transition hover:text-blue-300">
          {actionText}
        </button>
      )}
    </header>

    {children}
  </section>
);

const EmptyState = ({ title, description }) => (
  <div className="px-5 py-8 text-center">
    <p className="font-semibold text-white">{title}</p>
    <p className="mt-2 text-sm text-[var(--color-text-muted)]">{description}</p>
  </div>
);

const CreateProjectModal = ({ profileId, onCreated }) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    stack: [],
  });

  const [selectedStack, setSelectedStack] = useState("");

  const { mutate: createProject, isPending } = useCreateProject();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddStack = () => {
    if (!selectedStack) return;

    if (form.stack.includes(selectedStack)) return;

    setForm((prev) => ({
      ...prev,
      stack: [...prev.stack, selectedStack],
    }));

    setSelectedStack("");
  };

  const handleRemoveStack = (stackName) => {
    setForm((prev) => ({
      ...prev,
      stack: prev.stack.filter((item) => item !== stackName),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createProject(
      {
        name: form.name,
        description: form.description,
        stack: form.stack,
        profile_id: profileId,
      },
      {
        onSuccess: () => {
          setForm({
            name: "",
            description: "",
            stack: [],
          });

          setSelectedStack("");
          onCreated?.();
        },
      },
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
      <section className="w-full max-w-xl rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-2xl">
        <div className="mb-6">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
            Primer proyecto
          </p>

          <h2 className="mt-2 text-2xl font-bold text-white">
            Creá tu primer proyecto
          </h2>

          <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
            Para usar DevBoard necesitás tener al menos un proyecto. Se creará y
            quedarás asignado automáticamente como Owner.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
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
              placeholder="Sistema de tareas y reportes para desarrolladores."
              value={form.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full resize-none rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-sidebar)] px-4 py-3 text-sm text-[var(--color-text)] outline-none transition placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-secondary)]"
            />
          </label>

          <div>
            <span className="mb-2 block text-sm font-semibold text-[var(--color-text-soft)]">
              Stack tecnológico
            </span>

            <div className="flex gap-3">
              <select
                value={selectedStack}
                onChange={(e) => setSelectedStack(e.target.value)}
                className="w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-sidebar)] px-4 py-3 text-sm text-[var(--color-text)] outline-none transition focus:border-[var(--color-secondary)]"
              >
                <option value="">Seleccionar tecnología</option>

                {STACK_OPTIONS.map((stack) => (
                  <option key={stack} value={stack}>
                    {stack}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={handleAddStack}
                className="rounded-[var(--radius-md)] bg-[var(--color-light)] px-4 py-3 text-sm font-bold text-[var(--color-primary)] transition hover:bg-white"
              >
                Agregar
              </button>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {form.stack.length > 0 ? (
                form.stack.map((stack) => (
                  <span
                    key={stack}
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-primary)] px-3 py-1 text-xs font-semibold text-[var(--color-light)]"
                  >
                    {stack}

                    <button
                      type="button"
                      onClick={() => handleRemoveStack(stack)}
                      className="text-[var(--color-text-muted)] transition hover:text-white"
                    >
                      ×
                    </button>
                  </span>
                ))
              ) : (
                <p className="text-sm text-[var(--color-text-muted)]">
                  Todavía no agregaste tecnologías.
                </p>
              )}
            </div>
          </div>

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
  );
};

const Dashboard = () => {
  const { data: profile, isLoading: isLoadingProfile } = useAuth();

  const { data: projectsData, isLoading: isLoadingProjects } = useProjects(
    profile?.profile_id,
  );

  const [selectedProjectId, setSelectedProjectId] = useState(null);

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

  const showCreateProjectModal =
    !isLoadingProfile &&
    !isLoadingProjects &&
    profile?.profile_id &&
    projects.length === 0;

  if (isLoadingProfile || isLoadingProjects) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[var(--color-bg)] text-[var(--color-text)]">
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
    <main className="min-h-screen bg-[var(--color-bg)] p-5 text-[var(--color-text)]">
      {showCreateProjectModal && (
        <CreateProjectModal
          profileId={profile.profile_id}
          onCreated={() => setSelectedProjectId(null)}
        />
      )}

      <div className="space-y-5">
        <section className="rounded-[var(--radius-lg)] border border-[var(--color-border)] border-l-4 border-l-[var(--status-todo)] bg-[var(--color-surface)] p-5">
          {!selectedProject ? (
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
                      {selectedProject.name}
                    </h2>

                    <Badge className="border-[var(--status-todo)] bg-blue-500/10 text-blue-400">
                      {selectedProject.status || "En desarrollo"}
                    </Badge>
                  </div>

                  <p className="mt-2 max-w-2xl text-sm text-[var(--color-text-soft)]">
                    {selectedProject.description || "Sin descripción."}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {selectedProject.stack?.length > 0 ? (
                      selectedProject.stack.map((tech) => (
                        <Badge
                          key={tech}
                          className="border-[var(--color-border-strong)] bg-[var(--color-primary)] text-[var(--color-light)]"
                        >
                          {tech}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-sm text-[var(--color-text-muted)]">
                        Sin stack definido
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <select
                    value={selectedProject.id}
                    onChange={(e) => setSelectedProjectId(e.target.value)}
                    className="rounded-[var(--radius-md)] border border-[var(--color-border-strong)] bg-[var(--color-sidebar)] px-4 py-2 text-sm font-semibold text-[var(--color-text)] outline-none transition hover:bg-[var(--color-surface-soft)]"
                  >
                    {projects.map((project) => (
                      <option key={project.id} value={project.id}>
                        {project.name}
                      </option>
                    ))}
                  </select>

                  <button className="rounded-[var(--radius-md)] bg-[var(--color-light)] px-4 py-2 text-sm font-semibold text-[var(--color-primary)] transition hover:bg-white">
                    Crear tarea
                  </button>
                </div>
              </div>

              <div className="mt-5 grid gap-5 md:grid-cols-3">
                <div>
                  <div className="mb-2 flex justify-between text-xs font-bold uppercase text-[var(--color-text-muted)]">
                    <span>Progreso general</span>
                    <span>0%</span>
                  </div>

                  <div className="h-2 rounded-full bg-[var(--color-border)]">
                    <div className="h-full w-[0%] rounded-full bg-[var(--status-todo)]" />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex justify-between text-xs font-bold uppercase text-[var(--color-text-muted)]">
                    <span>MVP</span>
                    <span>0%</span>
                  </div>

                  <div className="h-2 rounded-full bg-[var(--color-border)]">
                    <div className="h-full w-[0%] rounded-full bg-[var(--status-in-progress)]" />
                  </div>
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

        <section className="grid gap-5 xl:grid-cols-2">
          <SectionCard
            title="Avisos importantes"
            subtitle="Avisos del proyecto seleccionado"
            icon={FiAlertTriangle}
            actionText="Ver todos"
          >
            <EmptyState
              title="No hay avisos importantes"
              description="Cuando el equipo envíe avisos, van a aparecer acá."
            />
          </SectionCard>

          <SectionCard
            title="Mis tareas pendientes"
            subtitle="Tareas asignadas a tu usuario"
            icon={FiCheckSquare}
            actionText="Ver todas"
          >
            <EmptyState
              title="No tenés tareas pendientes"
              description="Cuando crees o te asignen tareas, las vas a ver acá."
            />
          </SectionCard>

          <SectionCard
            title="Bugs abiertos"
            subtitle="Problemas reportados del proyecto"
            icon={FiAlertCircle}
            actionText="Ver bugs"
          >
            <EmptyState
              title="No hay bugs abiertos"
              description="Los bugs reportados del proyecto van a aparecer acá."
            />
          </SectionCard>

          <SectionCard
            title="Reportes recientes"
            subtitle="Últimos reportes generados"
            icon={FiFileText}
            actionText="Ver reportes"
          >
            <EmptyState
              title="No hay reportes recientes"
              description="Cuando generes reportes, se van a listar acá."
            />
          </SectionCard>
        </section>
      </div>
    </main>
  );
};

export default Dashboard;
