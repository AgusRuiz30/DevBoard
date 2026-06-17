import { Link } from "react-router";
import { FiLock, FiMail } from "react-icons/fi";
import { FaCode } from "react-icons/fa6";
import AuthInput from "../components/AuthInput";

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login enviado");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--color-bg)] px-4 py-10 text-[var(--color-text)]">
      <section className="grid w-full max-w-5xl overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl md:grid-cols-[1fr_1.1fr]">
        <div className="hidden border-r border-[var(--color-border)] bg-[var(--color-sidebar)] p-8 md:flex md:flex-col md:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white">
              DevBoard
              <FaCode />
            </h1>

            <p className="mt-4 max-w-sm text-sm leading-6 text-[var(--color-text-muted)]">
              Organizá proyectos, tareas, avisos, bugs y reportes desde un
              dashboard profesional para desarrolladores.
            </p>
          </div>

          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
            <p className="text-sm font-semibold text-white">
              Proyecto seleccionado
            </p>

            <p className="mt-2 text-sm text-[var(--color-text-muted)]">
              Trabajá sobre un proyecto y visualizá solo lo importante: tareas,
              avisos, bugs y reportes.
            </p>
          </div>
        </div>

        <div className="p-6 sm:p-8 md:p-10">
          <div className="mb-8">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
              Bienvenido de nuevo
            </p>

            <h2 className="mt-3 text-3xl font-bold text-white">
              Iniciar sesión
            </h2>

            <p className="mt-2 text-sm text-[var(--color-text-muted)]">
              Entrá a tu espacio de trabajo en DevBoard.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
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
              placeholder="Ingresá tu contraseña"
              icon={FiLock}
            />

            <button className="w-full rounded-[var(--radius-md)] bg-[var(--color-light)] px-4 py-3 text-sm font-bold text-[var(--color-primary)] transition hover:bg-white">
              Ingresar
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[var(--color-text-muted)]">
            ¿No tenés cuenta?{" "}
            <Link
              to="/register"
              className="font-semibold text-blue-400 transition hover:text-blue-300"
            >
              Crear cuenta
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Login;
