const DashboardSection = ({
  title,
  subtitle,
  icon: Icon,
  children,
  actionText,
  onActionClick,
}) => {
  return (
    <section className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)]">
      <header className="flex items-center justify-between border-b border-[var(--color-border)] px-5 py-4">
        <div>
          <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-[var(--color-text)]">
            {Icon && <Icon className="text-[var(--color-text-muted)]" />}
            {title}
          </h3>

          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
            {subtitle}
          </p>
        </div>

        {actionText && (
          <button
            type="button"
            onClick={onActionClick}
            className="text-sm font-semibold text-blue-400 transition hover:text-blue-300"
          >
            {actionText}
          </button>
        )}
      </header>

      <div>{children}</div>
    </section>
  );
};

export default DashboardSection;
