import { FiBell, FiSearch } from "react-icons/fi";

const Header = () => {
  return (
    <header className="flex items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-4">
      <div>
        <p className="text-sm text-[var(--color-text-muted)]">
          Proyecto actual
        </p>

        <select className="mt-1 rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-sidebar)] px-3 py-2 text-sm font-medium text-[var(--color-text)] outline-none transition focus:border-[var(--color-secondary)]">
          <option>Karga App</option>
          <option>DevBoard</option>
        </select>
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
          A
        </div>
      </div>
    </header>
  );
};

export default Header;
