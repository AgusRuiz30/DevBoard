const LoadingScreen = ({ message = "Cargando tu workspace..." }) => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--color-bg)] px-4 text-[var(--color-text)]">
      <section className="w-full max-w-sm rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center shadow-2xl">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-sidebar)]">
          <div className="relative flex h-10 w-10 items-center justify-center">
            <div className="absolute h-10 w-10 rounded-full border-2 border-[var(--color-border-strong)]" />

            <div className="absolute h-10 w-10 animate-spin rounded-full border-2 border-transparent border-r-[var(--color-secondary)] border-t-[var(--color-light)]" />

            <span className="text-xs font-black text-[var(--color-light)]">
              DB
            </span>
          </div>
        </div>

        <h1 className="text-xl font-bold text-white">DevBoard</h1>

        <p className="mt-2 text-sm text-[var(--color-text-muted)]">{message}</p>

        <div className="mt-6 flex justify-center gap-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--color-secondary)]" />
          <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--color-light)] delay-150" />
          <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--color-secondary)] delay-300" />
        </div>
      </section>
    </main>
  );
};

export default LoadingScreen;
