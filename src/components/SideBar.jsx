import { NavLink } from "react-router";
import {
  FiHome,
  FiCheckSquare,
  FiBell,
  FiAlertCircle,
  FiFileText,
} from "react-icons/fi";

const links = [
  {
    path: "/dashboard",
    label: "Dashboard",
    icon: FiHome,
  },
  {
    path: "/tasks",
    label: "Tareas",
    icon: FiCheckSquare,
  },
  {
    path: "/notices",
    label: "Avisos",
    icon: FiBell,
  },
  {
    path: "/bugs",
    label: "Bugs",
    icon: FiAlertCircle,
  },
  {
    path: "/reports",
    label: "Reportes",
    icon: FiFileText,
  },
];

const Sidebar = () => {
  return (
    <aside className="hidden min-h-screen w-64 bg-[var(--color-surface)] p-5 text-[var(--color-light)] md:block">
      <h1 className="mb-8 text-2xl font-bold tracking-tight">DevBoard</h1>

      <nav className="space-y-2">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-secondary text-white"
                    : "text-light/80 hover:bg-secondary/40 hover:text-white"
                }`
              }
            >
              <Icon size={18} />
              {link.label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
