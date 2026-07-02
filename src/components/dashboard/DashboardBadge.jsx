const DashboardBadge = ({ children, className = "" }) => {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-1 text-xs font-semibold ${className}`}
    >
      {children}
    </span>
  );
};

export default DashboardBadge;
