import { forwardRef } from "react";

const AuthInput = forwardRef(
  (
    {
      label,
      icon: Icon,
      error,
      helperText,
      rightElement,
      className = "",
      inputClassName = "",
      containerClassName = "",
      ...props
    },
    ref,
  ) => {
    const hasError = Boolean(error);

    return (
      <label className={`block ${containerClassName}`}>
        {label && (
          <span className="mb-2 block text-sm font-semibold text-[var(--color-text-soft)]">
            {label}
          </span>
        )}

        <div
          className={`
            flex items-center gap-3 rounded-[var(--radius-md)] border px-4 py-3 transition
            bg-[var(--color-sidebar)]
            ${
              hasError
                ? "border-[var(--priority-critical)]"
                : "border-[var(--color-border)] focus-within:border-[var(--color-secondary)]"
            }
            ${className}
          `}
        >
          {Icon && (
            <Icon
              size={18}
              className={
                hasError
                  ? "text-[var(--priority-critical)]"
                  : "text-[var(--color-text-muted)]"
              }
            />
          )}

          <input
            ref={ref}
            className={`
              w-full bg-transparent text-sm text-[var(--color-text)] outline-none
              placeholder:text-[var(--color-text-muted)]
              disabled:cursor-not-allowed disabled:opacity-60
              ${inputClassName}
            `}
            {...props}
          />

          {rightElement && (
            <div className="flex items-center justify-center">
              {rightElement}
            </div>
          )}
        </div>

        {error && (
          <p className="mt-2 text-xs font-medium text-[var(--priority-critical)]">
            {error}
          </p>
        )}

        {!error && helperText && (
          <p className="mt-2 text-xs text-[var(--color-text-muted)]">
            {helperText}
          </p>
        )}
      </label>
    );
  },
);

AuthInput.displayName = "AuthInput";

export default AuthInput;
