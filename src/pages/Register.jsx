import { Link } from "react-router";
import { FiLock, FiMail, FiUser } from "react-icons/fi";
import AuthInput from "../components/AuthInput";

const Register = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registro enviado");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--color-bg)] px-4 py-10 text-[var(--color-text)]">
      <section className="grid w-full max-w-5xl overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl md:grid-cols-[1fr_1.1fr]">
        <div className="hidden border-r border-[var(--color-border)] bg-[var(--color-sidebar)] p-8 md:flex md:flex-col md:justify-inital gap-10">
          <div>
            <h1 className="text-3xl font-bold text-white">DevBoard</h1>

            <p className="mt-4 max-w-sm text-sm leading-6 text-[var(--color-text-muted)]">
              Creá tu cuenta y empezá a gestionar proyectos, tareas, bugs,
              avisos y reportes desde una sola plataforma.
            </p>
          </div>

          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
            <p className="text-sm font-semibold text-white">
              Pensado para developers
            </p>

            <p className="mt-2 text-sm text-[var(--color-text-muted)]">
              Asigná tareas a miembros, marcá avances, definí el MVP y mantené
              el progreso visible.
            </p>
          </div>
        </div>

        <div className="p-6 sm:p-8 md:p-10">
          <div className="mb-8">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
              Nuevo workspace
            </p>

            <h2 className="mt-3 text-3xl font-bold text-white">Crear cuenta</h2>

            <p className="mt-2 text-sm text-[var(--color-text-muted)]">
              Registrate para comenzar a usar DevBoard.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <AuthInput
              label="Nombre"
              type="text"
              name="name"
              placeholder="Agustin"
              icon={FiUser}
            />

            <AuthInput
              label="Email"
              type="email"
              name="email"
              placeholder="tuemail@gmail.com"
              icon={FiMail}
            />

            <AuthInput
              label="Contraseña"
              type="password"
              name="password"
              placeholder="Creá una contraseña"
              icon={FiLock}
            />

            <AuthInput
              label="Confirmar contraseña"
              type="password"
              name="confirmPassword"
              placeholder="Repetí tu contraseña"
              icon={FiLock}
            />

            <button className="w-full rounded-[var(--radius-md)] bg-[var(--color-light)] px-4 py-3 text-sm font-bold text-[var(--color-primary)] transition hover:bg-white">
              Crear cuenta
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[var(--color-text-muted)]">
            ¿Ya tenés cuenta?{" "}
            <Link
              to="/login"
              className="font-semibold text-blue-400 transition hover:text-blue-300"
            >
              Iniciar sesión
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Register;
