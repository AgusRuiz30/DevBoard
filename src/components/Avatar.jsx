import { useMemo } from "react";

const RANDOM_VARIANTS = [
  "primary",
  "secondary",
  "blue",
  "violet",
  "orange",
  "red",
  "green",
];

function hashString(value) {
  let hash = 0;

  for (let i = 0; i < value.length; i += 1) {
    hash = value.charCodeAt(i) + ((hash << 5) - hash);
  }

  return Math.abs(hash);
}

export default function Avatar({
  src,
  initial,
  icon: Icon,
  variant = "random",
  size = "md",
  className = "",
}) {
  const sizes = {
    sm: "w-8 h-8 text-xs",
    md: "w-12 h-12 text-base",
    lg: "w-16 h-16 text-xl",
  };

  const variants = {
    primary: "bg-[var(--color-primary)] text-[var(--color-light)]",
    secondary: "bg-[var(--color-secondary)] text-white",
    surface: "bg-[var(--color-surface-soft)] text-[var(--color-text)]",

    blue: "bg-[var(--status-todo)] text-white",
    violet: "bg-[var(--status-in-progress)] text-white",
    orange: "bg-[var(--priority-high)] text-white",
    red: "bg-[var(--priority-critical)] text-white",
    green: "bg-[var(--status-done)] text-white",
  };

  const seed = initial ?? src ?? "";

  const selectedVariant = useMemo(() => {
    if (variant !== "random") return variant;

    return RANDOM_VARIANTS[hashString(seed) % RANDOM_VARIANTS.length];
  }, [variant, seed]);
  const baseStyles =
    "flex items-center justify-center rounded-full font-bold overflow-hidden shrink-0 border border-[var(--color-border)]";

  return (
    <div
      className={`${baseStyles} ${sizes[size]} ${variants[selectedVariant]} ${className}`}
    >
      {src ? (
        <img src={src} alt="avatar" className="h-full w-full object-cover" />
      ) : Icon ? (
        <Icon size={size === "sm" ? 16 : size === "lg" ? 28 : 22} />
      ) : (
        <span>{initial}</span>
      )}
    </div>
  );
}
