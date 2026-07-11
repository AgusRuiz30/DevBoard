import { useMemo, useState } from "react";
import {
  FiAlertTriangle,
  FiBell,
  FiFilter,
  FiInfo,
  FiPlus,
} from "react-icons/fi";

import { useAuth } from "../../hooks/queries/useAuth";
import { useProjects } from "../../hooks/queries/useProjects";

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
  {
    id: "3",
    title: "Nuevo bug crítico asignado",
    message: "Revisar el 500 en updateProject.",
    type: "important",
    label: "Importante",
    author: "Sofia",
    date: "2026-06-10",
    recipients: "2 destinatarios",
    isRead: true,
  },
  {
    id: "4",
    title: "Bienvenido a DevBoard",
    message:
      "Explorá tu proyecto, asigná tareas y mantené tu equipo sincronizado.",
    type: "info",
    label: "Informativo",
    author: "Sofia",
    date: "2026-06-01",
    recipients: "Todo el equipo",
    isRead: false,
  },
];

const getNoticeStyles = (type) => {
  const styles = {
    urgent: {
      border: "border-l-[var(--notice-urgent)]",
      badge: "border-[var(--notice-urgent)] bg-red-500/10 text-red-400",
      dot: "bg-[var(--notice-urgent)]",
      icon: "text-red-400",
      avatar: "bg-orange-500",
    },
    important: {
      border: "border-l-[var(--notice-important)]",
      badge:
        "border-[var(--notice-important)] bg-orange-500/10 text-orange-400",
      dot: "bg-[var(--notice-important)]",
      icon: "text-orange-400",
      avatar: "bg-emerald-500",
    },
    info: {
      border: "border-l-[var(--notice-info)]",
      badge: "border-[var(--notice-info)] bg-sky-500/10 text-sky-400",
      dot: "bg-[var(--notice-info)]",
      icon: "text-sky-400",
      avatar: "bg-blue-500",
    },
  };

  return styles[type] || styles.info;
};

const NoticeCard = ({ notice }) => {
  const styles = getNoticeStyles(notice.type);

  return (
    <article
      className={`rounded-[var(--radius-lg)] border border-[var(--color-border)] border-l-4 ${styles.border} bg-[var(--color-surface)] px-5 py-4 transition hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-soft)]`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            {!notice.isRead && (
              <span className={`h-2 w-2 rounded-full ${styles.dot}`} />
            )}

            {notice.type === "urgent" && (
              <FiAlertTriangle className={styles.icon} size={16} />
            )}

            {notice.type === "info" && (
              <FiInfo className={styles.icon} size={16} />
            )}

            <h3 className="font-bold text-white">{notice.title}</h3>
          </div>

          <p className="mt-2 text-sm leading-5 text-[var(--color-text-soft)]">
            {notice.message}
          </p>
        </div>

        <span
          className={`shrink-0 rounded-md border px-2 py-1 text-xs font-semibold ${styles.badge}`}
        >
          {notice.label}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-[var(--color-text-muted)]">
        <div className="flex flex-wrap items-center gap-4">
          <span className="flex items-center gap-2">
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full ${styles.avatar} text-xs font-bold text-white`}
            >
              {notice.author.charAt(0)}
            </span>

            {notice.author}
          </span>

          <span>{notice.date}</span>
          <span>{notice.recipients}</span>
        </div>

        <button
          type="button"
          className={`text-xs font-bold transition ${
            notice.isRead
              ? "text-[var(--color-text-muted)]"
              : "text-blue-400 hover:text-blue-300"
          }`}
        >
          {notice.isRead ? "Leído" : "Marcar leído"}
        </button>
      </div>
    </article>
  );
};

export const Notices = () => {
  const [filter, setFilter] = useState("all");

  const { data: profile } = useAuth();

  const { data: projectsData } = useProjects(profile?.profile_id);

  const projects = useMemo(() => {
    if (!projectsData) return [];

    return projectsData
      .map((item) => item.projects || item.project || item)
      .filter(Boolean);
  }, [projectsData]);

  const selectedProject = projects[0] ?? null;

  const filteredNotices = useMemo(() => {
    if (filter === "unread") {
      return notices.filter((notice) => !notice.isRead);
    }

    if (filter === "urgent") {
      return notices.filter((notice) => notice.type === "urgent");
    }

    if (filter === "important") {
      return notices.filter((notice) => notice.type === "important");
    }

    return notices;
  }, [filter]);

  const unreadCount = notices.filter((notice) => !notice.isRead).length;

  return (
    <main className="min-h-full bg-[var(--color-bg)] text-[var(--color-text)]">
      <section className="mb-6 flex flex-col justify-between gap-4 rounded-[var(--radius-lg)] border border-[var(--color-border)] border-l-4 border-l-[var(--notice-info)] bg-[var(--color-surface)] p-5 lg:flex-row lg:items-start">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
            Avisos
          </p>

          <h1 className="mt-2 text-2xl font-bold text-white">
            Avisos — {selectedProject?.name || "Sin proyecto"}
          </h1>

          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            Comunicación interna del equipo.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-sidebar)] px-3 py-2">
            <FiFilter className="text-[var(--color-text-muted)]" size={16} />

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-transparent text-sm font-semibold text-[var(--color-text)] outline-none"
            >
              <option value="all">Todos</option>
              <option value="unread">Sin leer</option>
              <option value="urgent">Urgentes</option>
              <option value="important">Importantes</option>
            </select>
          </div>

          <button className="flex items-center justify-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500">
            <FiPlus />
            Nuevo aviso
          </button>
        </div>
      </section>

      <section>
        <div className="mb-4">
          <h2 className="text-sm font-bold uppercase tracking-wide text-white">
            Bandeja
          </h2>

          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
            {filteredNotices.length} de {notices.length} · {unreadCount} sin
            leer
          </p>
        </div>

        <div className="space-y-3">
          {filteredNotices.length > 0 ? (
            filteredNotices.map((notice) => (
              <NoticeCard key={notice.id} notice={notice} />
            ))
          ) : (
            <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-10 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-sidebar)] text-[var(--color-text-muted)]">
                <FiBell size={20} />
              </div>

              <p className="mt-4 font-semibold text-white">
                No hay avisos para este filtro
              </p>

              <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                Probá cambiando el filtro o creando un nuevo aviso.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Notices;
