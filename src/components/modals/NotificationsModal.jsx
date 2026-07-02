import {
  FiAlertTriangle,
  FiBell,
  FiCheckCircle,
  FiFileText,
  FiInfo,
  FiX,
} from "react-icons/fi";

const getNotificationIcon = (type) => {
  const icons = {
    info: FiInfo,
    task: FiCheckCircle,
    bug: FiAlertTriangle,
    report: FiFileText,
    urgent: FiAlertTriangle,
  };

  return icons[type] || FiBell;
};

const getNotificationStyle = (type) => {
  const styles = {
    info: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    task: "bg-green-500/10 text-green-400 border-green-500/20",
    bug: "bg-red-500/10 text-red-400 border-red-500/20",
    report: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    urgent: "bg-red-500/10 text-red-400 border-red-500/20",
  };

  return styles[type] || styles.info;
};

export const NotificationsModal = ({
  notifications = [],
  onClose,
  onMarkAsRead,
  onMarkAllAsRead,
}) => {
  const unreadCount = notifications.filter((item) => !item.is_read).length;

  return (
    <div className="absolute right-0 top-[calc(100%+10px)] z-50 w-[380px] overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl">
      <header className="flex items-start justify-between gap-4 border-b border-[var(--color-border)] px-4 py-4">
        <div>
          <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-white">
            <FiBell className="text-[var(--color-text-muted)]" />
            Notificaciones
          </h3>

          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
            {unreadCount > 0
              ? `${unreadCount} sin leer`
              : "No tenés notificaciones pendientes"}
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-2 text-[var(--color-text-muted)] transition hover:bg-[var(--color-surface-soft)] hover:text-white"
        >
          <FiX size={18} />
        </button>
      </header>

      {notifications.length > 0 && (
        <div className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-3">
          <span className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
            Recientes
          </span>

          <button
            type="button"
            onClick={onMarkAllAsRead}
            className="text-xs font-bold text-blue-400 transition hover:text-blue-300"
          >
            Marcar todo como leído
          </button>
        </div>
      )}

      <div className="max-h-[420px] overflow-y-auto">
        {notifications.length > 0 ? (
          notifications.map((notification) => {
            const Icon = getNotificationIcon(notification.type);

            return (
              <button
                key={notification.id}
                type="button"
                onClick={() => onMarkAsRead?.(notification.id)}
                className={`flex w-full gap-3 border-b border-[var(--color-border)] px-4 py-4 text-left transition last:border-b-0 hover:bg-[var(--color-surface-soft)] ${
                  !notification.is_read ? "bg-[var(--color-sidebar)]" : ""
                }`}
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${getNotificationStyle(
                    notification.type,
                  )}`}
                >
                  <Icon size={18} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="text-sm font-bold text-white">
                      {notification.title}
                    </h4>

                    {!notification.is_read && (
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[var(--color-primary)]" />
                    )}
                  </div>

                  <p className="mt-1 line-clamp-2 text-sm leading-5 text-[var(--color-text-soft)]">
                    {notification.message}
                  </p>

                  <div className="mt-2 flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
                    <span>{notification.project_name || "DevBoard"}</span>
                    <span>•</span>
                    <span>{notification.created_at || "Ahora"}</span>
                  </div>
                </div>
              </button>
            );
          })
        ) : (
          <div className="px-4 py-10 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-sidebar)] text-[var(--color-text-muted)]">
              <FiBell size={20} />
            </div>

            <p className="mt-4 font-semibold text-white">
              No hay notificaciones
            </p>

            <p className="mt-2 text-sm text-[var(--color-text-muted)]">
              Cuando tengas avisos, tareas asignadas o reportes, van a aparecer
              acá.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
