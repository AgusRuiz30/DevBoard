import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { FiEye, FiEyeOff, FiLock, FiMail } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import AuthInput from "../components/AuthInput";
import { loginSchema } from "../schemas/authSchema";
import { useLogin } from "../../hooks/mutations/useAuthMutations";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });

  const { mutate: loginUser, isPending } = useLogin();

  const isLoading = isSubmitting || isPending;

  const onSubmit = async (data) => {
    loginUser(data, {
      onSuccess: () => {
        navigate("/");
        console.log("Login exitoso, redirigiendo a DevBoard...");
      },
      onError: (error) => {
        console.log("Error al iniciar sesión:", error.message);
      },
    });
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--color-bg)] px-4 py-10 text-[var(--color-text)]">
      <section className="grid w-full max-w-5xl overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl md:grid-cols-[1fr_1.1fr]">
        <div className="hidden border-r border-[var(--color-border)] bg-[var(--color-sidebar)] p-8 md:flex md:flex-col md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">DevBoard</h1>

            <p className="mt-4 max-w-sm text-sm leading-6 text-[var(--color-text-muted)]">
              Organizá proyectos, tareas, avisos, bugs y reportes desde un
              dashboard profesional para desarrolladores.
            </p>
          </div>

          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
            <p className="text-sm font-semibold text-white">
              Dashboard por proyecto
            </p>

            <p className="mt-2 text-sm text-[var(--color-text-muted)]">
              Seleccioná un proyecto y visualizá solo tareas, avisos, bugs y
              reportes relacionados.
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

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <AuthInput
              label="Email"
              type="email"
              placeholder="tuemail@gmail.com"
              icon={FiMail}
              disabled={isLoading}
              {...register("email")}
              error={errors.email?.message}
            />

            <AuthInput
              label="Contraseña"
              type={showPassword ? "text" : "password"}
              placeholder="Ingresá tu contraseña"
              icon={FiLock}
              disabled={isLoading}
              {...register("password")}
              error={errors.password?.message}
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  disabled={isLoading}
                  className="text-[var(--color-text-muted)] transition hover:text-[var(--color-text)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              }
            />

            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-3 rounded-[var(--radius-md)] bg-[var(--color-light)] px-4 py-3 text-sm font-bold text-[var(--color-primary)] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading && (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--color-primary)] border-t-transparent" />
              )}

              {isLoading ? "Ingresando..." : "Ingresar"}
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
