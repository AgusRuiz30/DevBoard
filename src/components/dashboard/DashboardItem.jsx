const DashboardItem = ({ children, className = "" }) => {
  return (
    <article
      className={`border-b border-[var(--color-border)] px-5 py-4 transition last:border-b-0 hover:bg-[var(--color-surface-soft)] ${className}`}
    >
      {children}
    </article>
  );
};

export default DashboardItem;
