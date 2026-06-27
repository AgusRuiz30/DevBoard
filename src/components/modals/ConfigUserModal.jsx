import { FiLogOut, FiSettings, FiUser, FiX } from "react-icons/fi";

const ConfigUserModal = ({ profile, onClose, onLogout, isLoggingOut }) => {
  return (
    <div className="absolute right-0 top-[calc(100%+10px)] z-50 w-72 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-3 shadow-2xl">
      <div className="flex items-start justify-between gap-3 border-b border-[var(--color-border)] pb-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-secondary)] text-sm font-bold text-white">
            {profile?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <div>
            <h3 className="text-sm font-bold text-white">
              {profile?.name || "Usuario"}
            </h3>

            <p className="max-w-[170px] truncate text-xs text-[var(--color-text-muted)]">
              {profile?.email || "Sin email"}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-1 text-[var(--color-text-muted)] transition hover:bg-[var(--color-surface-soft)] hover:text-white"
        >
          <FiX size={16} />
        </button>
      </div>

      <div className="mt-3 space-y-1">
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-semibold text-[var(--color-text)] transition hover:bg-[var(--color-surface-soft)] hover:text-white"
        >
          <FiUser size={17} />
          Mi perfil
        </button>

        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-semibold text-[var(--color-text)] transition hover:bg-[var(--color-surface-soft)] hover:text-white"
        >
          <FiSettings size={17} />
          Configuración
        </button>

        <div className="mt-2 border-t border-[var(--color-border)] pt-2">
          <button
            type="button"
            onClick={onLogout}
            disabled={isLoggingOut}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-semibold text-red-400 transition hover:bg-red-500/10 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FiLogOut size={17} />
            {isLoggingOut ? "Cerrando sesión..." : "Cerrar sesión"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfigUserModal;
