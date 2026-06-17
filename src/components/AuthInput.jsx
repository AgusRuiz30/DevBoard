const AuthInput = ({
  label,
  type = "text",
  placeholder,
  icon: Icon,
  value,
  onChange,
  name,
}) => {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-[var(--color-text-soft)]">
        {label}
      </span>

      <div className="flex items-center gap-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-sidebar)] px-4 py-3 transition focus-within:border-[var(--color-secondary)]">
        {Icon && <Icon className="text-[var(--color-text-muted)]" size={18} />}

        <input
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full bg-transparent text-sm text-[var(--color-text)] outline-none placeholder:text-[var(--color-text-muted)]"
        />
      </div>
    </label>
  );
};

export default AuthInput;
