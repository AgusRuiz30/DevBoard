import {
  FiGrid,
  FiCheckSquare,
  FiMessageSquare,
  FiAlertCircle,
  FiTarget,
  FiTrendingUp,
  FiFileText,
  FiUsers,
  FiSettings,
} from "react-icons/fi";
import { FaCode } from "react-icons/fa";
import { NavLink } from "react-router";

const links = [
  {
    label: "Dashboard",
    path: "/",
    icon: FiGrid,
  },
  {
    label: "Tareas",
    path: "/task",
    icon: FiCheckSquare,
  },
  {
    label: "Avisos",
    path: "/notices",
    icon: FiMessageSquare,
    badge: 3,
  },
  {
    label: "Bugs",
    path: "/bugs",
    icon: FiAlertCircle,
  },
  {
    label: "MVP",
    path: "/mvp",
    icon: FiTarget,
  },
  {
    label: "Avances",
    path: "/progress",
    icon: FiTrendingUp,
  },
  {
    label: "Reportes",
    path: "/reports",
    icon: FiFileText,
  },
  {
    label: "Miembros",
    path: "/members",
    icon: FiUsers,
  },
  {
    label: "Configuración",
    path: "/settings",
    icon: FiSettings,
  },
];

const Sidebar = () => {
  return (
    <aside className="hidden min-h-screen min-w-75 border-r border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-5 text-[var(--color-text)] md:block ">
      <div className="mb-7 flex items-center gap-3 px-2 border-b border-[var(--color-border)] ">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-light)] text-[var(--color-primary)] ">
          <FaCode size={20} />
        </div>

        <h1 className="text-lg font-bold text-white">DevBoard</h1>
      </div>

      <nav className="flex flex-col gap-1">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/"}
              className={({ isActive }) =>
                `relative flex items-center justify-between rounded-sm px-3 py-3 text-sm font-semibold transition ${
                  isActive
                    ? "bg-[var(--color-surface-soft)] text-white before:absolute before:left-0 before:top-2 before:h-8 before:w-[3px] before:rounded-full before:bg-blue-400"
                    : "text-[var(--color-text-muted)] hover:bg-[var(--color-surface-soft)] hover:text-white"
                }`
              }
            >
              <div className="flex items-center gap-3">
                <Icon size={18} />
                <span>{link.label}</span>
              </div>

              {link.badge && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--notice-urgent)] px-1.5 text-xs font-bold text-white">
                  {link.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
