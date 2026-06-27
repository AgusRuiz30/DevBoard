import { useState } from "react";
import { useCreateProject } from "../../../hooks/mutations/useProjectsMutations";
import AuthInput from "../AuthInput";
import { FiX } from "react-icons/fi";
export default function CreateProjectModal({ profileId, onCreated, onClose }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    stack: [],
  });
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
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
              Primer proyecto
            </p>

            <h2 className="mt-2 text-2xl font-bold text-white">
              Creá tu primer proyecto
            </h2>

            <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
              Para usar DevBoard necesitás tener al menos un proyecto. Se creará
              y quedarás asignado automáticamente como Owner.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="rounded-xl border border-[var(--color-border)] p-2 text-[var(--color-text-muted)] transition hover:bg-[var(--color-surface-soft)] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FiX size={18} />
          </button>
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
                className="rounded-[var(--radius-md)] bg-[var(--color-secondary)] px-4 py-3 text-sm font-bold text-[var(--color-light)] transition hover:bg-purple-500"
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
            className="flex w-full items-center justify-center gap-3 rounded-[var(--radius-md)] bg-[var(--color-primary)] px-4 py-3 text-sm font-bold text-[var(--color-light)] transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
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
}
