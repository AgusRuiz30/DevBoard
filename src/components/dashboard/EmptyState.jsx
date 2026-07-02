const EmptyState = ({ title, description }) => {
  return (
    <div className="px-5 py-8 text-center">
      <p className="font-semibold text-white">{title}</p>

      <p className="mt-2 text-sm text-[var(--color-text-muted)]">
        {description}
      </p>
    </div>
  );
};

export default EmptyState;
