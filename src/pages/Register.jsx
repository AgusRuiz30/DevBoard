import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { FiEye, FiEyeOff, FiLock, FiMail, FiUser } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import AuthInput from "../components/AuthInput";
import { registerSchema } from "../schemas/authSchema";
import { useRegister } from "../../hooks/mutations/useAuthMutations";

const Register = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onSubmit",
  });

  const { mutate: registerUser, isPending } = useRegister();

  const onSubmit = async (data) => {
    const formData = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    registerUser(formData, {
      onSuccess: () => {
        reset();
        navigate("/");
      },
    });
  };

  const isLoading = isSubmitting || isPending;

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--color-bg)] px-4 py-10 text-[var(--color-text)]">
      <section className="grid w-full max-w-5xl overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl md:grid-cols-[1fr_1.1fr]">
        <div className="hidden border-r border-[var(--color-border)] bg-[var(--color-sidebar)] p-8 md:flex md:flex-col md:justify-between">
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

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <AuthInput
              label="Nombre"
              type="text"
              placeholder="Agustin"
              icon={FiUser}
              {...register("name")}
              error={errors.name?.message}
            />

            <AuthInput
              label="Email"
              type="email"
              placeholder="tuemail@gmail.com"
              icon={FiMail}
              {...register("email")}
              error={errors.email?.message}
            />

            <AuthInput
              label="Contraseña"
              type={showPassword ? "text" : "password"}
              placeholder="Creá una contraseña"
              icon={FiLock}
              {...register("password")}
              error={errors.password?.message}
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="text-[var(--color-text-muted)] transition hover:text-[var(--color-text)]"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              }
            />

            <AuthInput
              label="Confirmar contraseña"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Repetí tu contraseña"
              icon={FiLock}
              {...register("confirmPassword")}
              error={errors.confirmPassword?.message}
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="text-[var(--color-text-muted)] transition hover:text-[var(--color-text)]"
                >
                  {showConfirmPassword ? (
                    <FiEyeOff size={18} />
                  ) : (
                    <FiEye size={18} />
                  )}
                </button>
              }
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-[var(--radius-md)] bg-[var(--color-light)] px-4 py-3 text-sm font-bold text-[var(--color-primary)] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Creando cuenta..." : "Crear cuenta"}
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
