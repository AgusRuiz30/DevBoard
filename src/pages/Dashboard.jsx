import {
  FiAlertTriangle,
  FiCheckSquare,
  FiFileText,
  FiFolder,
  FiBarChart,
  FiUsers,
} from "react-icons/fi";
import Avatar from "../components/Avatar";

const Badge = ({ children, className = "" }) => {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-1 text-xs font-semibold ${className}`}
    >
      {children}
    </span>
  );
};

const SectionCard = ({ title, subtitle, icon: Icon, children, actionText }) => {
  return (
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

      <div>{children}</div>
    </section>
  );
};

const DashboardItem = ({
  children,
  borderColor = "border-[var(--color-border)]",
}) => {
  return (
    <article
      className={`border-b ${borderColor} px-5 py-4 transition last:border-b-0 hover:bg-[var(--color-surface-soft)]`}
    >
      {children}
    </article>
  );
};

const notices = [
  {
    id: 1,
    title: "Revisar módulo de tareas",
    message:
      "Antes de avanzar con reportes, revisar la asignación obligatoria de miembros.",
    priority: "Urgente",
    badgeClass: "border-[var(--notice-urgent)] bg-red-500/10 text-red-400",
    borderClass: "border-l-4 border-l-[var(--notice-urgent)]",
    author: "Sofia",
    date: "2026-06-13",
    recipients: "FrontEnd UI",
  },
  {
    id: 2,
    title: "Deploy programado",
    message: "Subimos a producción el viernes a las 18hs.",
    priority: "Importante",
    badgeClass:
      "border-[var(--notice-important)] bg-orange-500/10 text-orange-400",
    borderClass: "border-l-4 border-l-[var(--notice-important)]",
    author: "Martin",
    date: "2026-06-12",
    recipients: "Todo el equipo",
  },
];

const tasks = [
  {
    id: 1,
    title: "Crear sistema de tareas",
    description: "Permitir que cada proyecto tenga sus propias tareas.",
    priority: "Alta",
    priorityClass:
      "border-[var(--priority-high)] bg-orange-500/10 text-orange-400",
    status: "In Progress",
    statusClass:
      "border-[var(--status-in-progress)] bg-violet-500/10 text-violet-400",
    role: "FrontEnd UI",
    assignee: "Agustin",
    date: "2026-06-20",
    checklist: "2/5",
  },
  {
    id: 2,
    title: "Reporte semanal automático",
    description: "Generar PDF automático del progreso del proyecto.",
    priority: "Media",
    priorityClass:
      "border-[var(--priority-medium)] bg-blue-500/10 text-blue-400",
    status: "To Do",
    statusClass: "border-[var(--status-todo)] bg-blue-500/10 text-blue-400",
    role: "Logic FrontEnd",
    assignee: "Agustin",
    date: "2026-06-22",
    checklist: "1/4",
  },
];

const bugs = [
  {
    id: 1,
    title: "El dashboard no actualiza tareas",
    priority: "Crítica",
    priorityClass:
      "border-[var(--priority-critical)] bg-red-500/10 text-red-400",
    status: "Abierto",
    statusClass: "border-[var(--priority-critical)] bg-red-500/10 text-red-400",
    reporter: "Manuel",
    assignee: "Agustin",
    date: "2026-06-14",
  },
  {
    id: 2,
    title: "Error al cambiar proyecto seleccionado",
    priority: "Alta",
    priorityClass:
      "border-[var(--priority-high)] bg-orange-500/10 text-orange-400",
    status: "En revisión",
    statusClass:
      "border-[var(--status-review)] bg-orange-500/10 text-orange-400",
    reporter: "Sofia",
    assignee: "Martin",
    date: "2026-06-12",
  },
];

const reports = [
  {
    id: 1,
    title: "Reporte semanal",
    summary: "Se completaron 4 tareas y quedan 2 bugs abiertos.",
    status: "Generado",
    statusClass:
      "border-[var(--report-generated)] bg-blue-500/10 text-blue-400",
    author: "Agustin",
    date: "2026-06-16",
  },
  {
    id: 2,
    title: "Reporte de MVP",
    summary: "Faltan 3 funcionalidades para cerrar el MVP inicial.",
    status: "Pendiente",
    statusClass:
      "border-[var(--report-pending)] bg-orange-500/10 text-orange-400",
    author: "Sofia",
    date: "2026-06-15",
  },
];

const Dashboard = () => {
  return (
    <main className="min-h-screen bg-[var(--color-bg)] p-5 text-[var(--color-text)]">
      <div className="space-y-5">
        <section className="rounded-[var(--radius-lg)] border border-[var(--color-border)] border-l-4 border-l-[var(--status-todo)] bg-[var(--color-surface)] p-5">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
            <div>
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                <FiFolder />
                Proyecto seleccionado
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-3">
                <h2 className="text-2xl font-bold text-white">Karga App</h2>

                <Badge className="border-[var(--status-todo)] bg-blue-500/10 text-blue-400">
                  En desarrollo
                </Badge>
              </div>

              <p className="mt-2 max-w-2xl text-sm text-[var(--color-text-soft)]">
                Plataforma de logística para conductores independientes.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <Badge className="border-[var(--color-border-strong)] bg-[var(--color-primary)] text-[var(--color-light)]">
                  React
                </Badge>
                <Badge className="border-[var(--color-border-strong)] bg-[var(--color-primary)] text-[var(--color-light)]">
                  Supabase
                </Badge>
                <Badge className="border-[var(--color-border-strong)] bg-[var(--color-primary)] text-[var(--color-light)]">
                  Zustand
                </Badge>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="rounded-[var(--radius-md)] border border-[var(--color-border-strong)] px-4 py-2 text-sm font-semibold text-[var(--color-text)] transition hover:bg-[var(--color-surface-soft)]">
                Cambiar proyecto
              </button>

              <button className="rounded-[var(--radius-md)] bg-[var(--color-light)] px-4 py-2 text-sm font-semibold text-[var(--color-primary)] transition hover:bg-white">
                Crear tarea
              </button>
            </div>
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-3">
            <div>
              <div className="mb-2 flex justify-between text-xs font-bold uppercase text-[var(--color-text-muted)]">
                <span>Progreso general</span>
                <span>45%</span>
              </div>

              <div className="h-2 rounded-full bg-[var(--color-border)]">
                <div className="h-full w-[45%] rounded-full bg-[var(--status-todo)]" />
              </div>
            </div>

            <div>
              <div className="mb-2 flex justify-between text-xs font-bold uppercase text-[var(--color-text-muted)]">
                <span>MVP</span>
                <span>50%</span>
              </div>

              <div className="h-2 rounded-full bg-[var(--color-border)]">
                <div className="h-full w-[50%] rounded-full bg-[var(--status-in-progress)]" />
              </div>
            </div>

            <div className="flex items-end gap-2">
              <div>
                <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase text-[var(--color-text-muted)]">
                  <FiUsers />
                  Miembros activos
                </p>

                <div className="flex items-center gap-2">
                  {[
                    { initial: "A", name: "Agustin" },
                    { initial: "M", name: "Manuel" },
                    { initial: "S", name: "Sofia" },
                    { initial: "L", name: "Lucas" },
                  ].map((member) => (
                    <Avatar
                      key={member.name}
                      initial={member.initial}
                      name={member.name}
                      size="sm"
                    />
                  ))}

                  <span className="text-sm text-[var(--color-text-muted)]">
                    4 activos
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-5 xl:grid-cols-2">
          <SectionCard
            title="Avisos importantes"
            subtitle="2 sin leer · 3 importantes"
            icon={FiAlertTriangle}
            actionText="Ver todos"
          >
            {notices.map((notice) => (
              <DashboardItem key={notice.id} borderColor={notice.borderClass}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="font-semibold text-white">{notice.title}</h4>

                    <p className="mt-2 text-sm text-[var(--color-text-soft)]">
                      {notice.message}
                    </p>
                  </div>

                  <Badge className={notice.badgeClass}>{notice.priority}</Badge>
                </div>

                <div className="mt-3 flex flex-wrap gap-3 text-xs text-[var(--color-text-muted)]">
                  <span>{notice.author}</span>
                  <span>{notice.date}</span>
                  <span>{notice.recipients}</span>
                </div>
              </DashboardItem>
            ))}
          </SectionCard>

          <SectionCard
            title="Mis tareas pendientes"
            subtitle="4 asignadas a ti"
            icon={FiCheckSquare}
            actionText="Ver todas"
          >
            {tasks.map((task) => (
              <DashboardItem key={task.id}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="font-semibold text-white">{task.title}</h4>

                    <p className="mt-2 text-sm text-[var(--color-text-soft)]">
                      {task.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap justify-end gap-2">
                    <Badge className={task.priorityClass}>
                      {task.priority}
                    </Badge>

                    <Badge className={task.statusClass}>{task.status}</Badge>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-3 text-xs text-[var(--color-text-muted)]">
                  <span>{task.role}</span>
                  <span>Asignado a: {task.assignee}</span>
                  <span>{task.date}</span>
                  <span>Checklist: {task.checklist}</span>
                </div>
              </DashboardItem>
            ))}
          </SectionCard>

          <SectionCard
            title="Bugs abiertos"
            subtitle="2 requieren revisión"
            icon={FiBarChart}
            actionText="Ver bugs"
          >
            {bugs.map((bug) => (
              <DashboardItem key={bug.id}>
                <div className="flex items-start justify-between gap-3">
                  <h4 className="font-semibold text-white">{bug.title}</h4>

                  <div className="flex flex-wrap justify-end gap-2">
                    <Badge className={bug.priorityClass}>{bug.priority}</Badge>

                    <Badge className={bug.statusClass}>{bug.status}</Badge>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-3 text-xs text-[var(--color-text-muted)]">
                  <span>Reportado por: {bug.reporter}</span>
                  <span>Asignado a: {bug.assignee}</span>
                  <span>{bug.date}</span>
                </div>
              </DashboardItem>
            ))}
          </SectionCard>

          <SectionCard
            title="Reportes recientes"
            subtitle="Últimos reportes generados"
            icon={FiFileText}
            actionText="Ver reportes"
          >
            {reports.map((report) => (
              <DashboardItem key={report.id}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="font-semibold text-white">{report.title}</h4>

                    <p className="mt-2 text-sm text-[var(--color-text-soft)]">
                      {report.summary}
                    </p>
                  </div>

                  <Badge className={report.statusClass}>{report.status}</Badge>
                </div>

                <div className="mt-3 flex flex-wrap gap-3 text-xs text-[var(--color-text-muted)]">
                  <span>{report.author}</span>
                  <span>{report.date}</span>
                </div>
              </DashboardItem>
            ))}
          </SectionCard>
        </section>
      </div>
    </main>
  );
};

export default Dashboard;
