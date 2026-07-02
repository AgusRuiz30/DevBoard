import { useEffect, useState } from "react";
import { FiPlus, FiTrash2, FiX } from "react-icons/fi";
import { useCreateTask } from "../../../hooks/mutations/useTaskMutations";

const STATUS_OPTIONS = [
  { value: "backlog", label: "Backlog / Ideas" },
  { value: "todo", label: "To Do" },
  { value: "in_progress", label: "En proceso" },
  { value: "review", label: "Testing / Review" },
  { value: "done", label: "Hecho" },
];

const PRIORITY_OPTIONS = ["Baja", "Media", "Alta", "Crítica"];

const ROLE_OPTIONS = [
  "FrontEnd UI",
  "Logic FrontEnd",
  "Backend",
  "Full Stack",
  "QA Tester",
  "UI/UX Designer",
  "DevOps",
];

const NewTaskModal = ({
  isOpen,
  onClose,
  defaultStatus = "todo",
  members = [],
  projectId,
  profileId,
}) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: defaultStatus,
    priority: "Media",
    assignee: "",
    role: "FrontEnd UI",
    tags: "",
    dueDate: "",
    checklist: [],
  });

  const [checklistInput, setChecklistInput] = useState("");

  const { mutate: createTask, isPending } = useCreateTask();

  useEffect(() => {
    if (isOpen) {
      setForm((prev) => ({
        ...prev,
        status: defaultStatus,
      }));
    }
  }, [defaultStatus, isOpen]);

  if (!isOpen) return null;

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      status: defaultStatus,
      priority: "Media",
      assignee: "",
      role: "FrontEnd UI",
      tags: "",
      dueDate: "",
      checklist: [],
    });

    setChecklistInput("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddChecklistItem = () => {
    const value = checklistInput.trim();

    if (!value) return;

    setForm((prev) => ({
      ...prev,
      checklist: [...prev.checklist, value],
    }));

    setChecklistInput("");
  };

  const handleRemoveChecklistItem = (itemToRemove) => {
    setForm((prev) => ({
      ...prev,
      checklist: prev.checklist.filter((item) => item !== itemToRemove),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!projectId || !profileId) {
      console.log("Falta projectId o profileId");
      return;
    }

    createTask({
      title: form.title,
      status: form.status,
      profile_id: profileId,
      priority: form.priority,
      checklist: form.checklist,
      role: form.role,
      project_id: projectId,
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
      <section className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-2xl custom-scroll">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Nueva tarea</h2>

          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="rounded-lg p-2 text-[var(--color-text-muted)] transition hover:bg-[var(--color-surface-soft)] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FiX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block">
            <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-[var(--color-text-muted)]">
              Título
            </span>

            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-sidebar)] px-4 py-3 text-sm text-[var(--color-text)] outline-none transition focus:border-[var(--color-secondary)]"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-[var(--color-text-muted)]">
              Descripción
            </span>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full resize-none rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-sidebar)] px-4 py-3 text-sm text-[var(--color-text)] outline-none transition focus:border-[var(--color-secondary)]"
            />
          </label>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-[var(--color-text-muted)]">
                Estado
              </span>

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-sidebar)] px-4 py-3 text-sm font-semibold text-[var(--color-text)] outline-none transition focus:border-[var(--color-secondary)]"
              >
                {STATUS_OPTIONS.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-[var(--color-text-muted)]">
                Prioridad
              </span>

              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-sidebar)] px-4 py-3 text-sm font-semibold text-[var(--color-text)] outline-none transition focus:border-[var(--color-secondary)]"
              >
                {PRIORITY_OPTIONS.map((priority) => (
                  <option key={priority} value={priority}>
                    {priority}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-[var(--color-text-muted)]">
                Miembro asignado *
              </span>

              <select
                name="assignee"
                value={form.assignee}
                onChange={handleChange}
                required
                className="w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-sidebar)] px-4 py-3 text-sm font-semibold text-[var(--color-text)] outline-none transition focus:border-[var(--color-secondary)]"
              >
                <option value="">Seleccionar miembro</option>

                {members.map((member) => (
                  <option key={member.id} value={member.name}>
                    {member.name} — {member.role}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-[var(--color-text-muted)]">
                Rol
              </span>

              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-sidebar)] px-4 py-3 text-sm font-semibold text-[var(--color-text)] outline-none transition focus:border-[var(--color-secondary)]"
              >
                {ROLE_OPTIONS.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-[var(--color-text-muted)]">
                Stack / Tags
              </span>

              <input
                name="tags"
                value={form.tags}
                onChange={handleChange}
                placeholder="React, Supabase"
                className="w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-sidebar)] px-4 py-3 text-sm text-[var(--color-text)] outline-none transition placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-secondary)]"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-[var(--color-text-muted)]">
                Fecha límite
              </span>

              <input
                type="date"
                name="dueDate"
                value={form.dueDate}
                onChange={handleChange}
                className="w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-sidebar)] px-4 py-3 text-sm text-[var(--color-text)] outline-none transition focus:border-[var(--color-secondary)]"
              />
            </label>
          </div>

          <div>
            <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-[var(--color-text-muted)]">
              Checklist
            </span>

            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                value={checklistInput}
                onChange={(e) => setChecklistInput(e.target.value)}
                placeholder="Crear tabla"
                className="w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-sidebar)] px-4 py-3 text-sm text-[var(--color-text)] outline-none transition placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-secondary)]"
              />

              <button
                type="button"
                onClick={handleAddChecklistItem}
                className="flex items-center justify-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-light)] px-4 py-3 text-sm font-bold text-[var(--color-primary)] transition hover:bg-white"
              >
                <FiPlus />
                Agregar
              </button>
            </div>

            <div className="mt-3 space-y-2">
              {form.checklist.length > 0 ? (
                form.checklist.map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-sidebar)] px-3 py-2"
                  >
                    <span className="text-sm text-[var(--color-text)]">
                      {item}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleRemoveChecklistItem(item)}
                      className="text-[var(--color-text-muted)] transition hover:text-[var(--priority-critical)]"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-sm text-[var(--color-text-muted)]">
                  Todavía no agregaste items al checklist.
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isPending}
              className="rounded-[var(--radius-md)] px-4 py-2 text-sm font-bold text-[var(--color-text)] transition hover:bg-[var(--color-surface-soft)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={isPending || !projectId || !profileId}
              className="flex items-center justify-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-light)] px-5 py-2 text-sm font-bold text-[var(--color-primary)] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending && (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--color-primary)] border-t-transparent" />
              )}

              {isPending ? "Creando..." : "Crear tarea"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default NewTaskModal;
