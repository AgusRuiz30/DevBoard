import { client } from "../lib/NeonClient";

export const login = async ({ email, password }) => {
  const { data, error } = await client.auth.signIn.email({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message || "Error al iniciar sesión");
  }

  return data;
};

export const registerUser = async ({ name, email, password }) => {
  const { data, error } = await client.auth.signUp.email({
    name,
    email,
    password,
  });

  if (error) {
    throw new Error(error.message || "Error al registrar usuario");
  }

  const user = data?.user;

  if (!user?.id) {
    throw new Error("No se pudo obtener el usuario registrado");
  }

  const { data: profile, error: profileError } = await client
    .from("profiles")
    .insert({
      name,
      email,
      profile_id: user.id,
    })
    .select();

  if (profileError) {
    throw new Error(profileError.message || "Error al crear el perfil");
  }

  return {
    user,
    profile,
  };
};

export const logout = async () => {
  const { error } = await client.auth.signOut();

  if (error) {
    throw new Error(error.message || "Error al cerrar sesión");
  }

  return true;
};

export const getProfile = async () => {
  const { data: sessionData, error: sessionError } =
    await client.auth.getSession();

  if (sessionError) {
    throw new Error(sessionError.message || "Error al obtener la sesión");
  }

  const user = sessionData.session.userId;

  if (!user) {
    return null;
  }
  console.log(user);
  const { data, error } = await client
    .from("profiles")
    .select("*")
    .eq("profile_id", user)
    .single();

  if (error) {
    throw new Error(error.message || "Error al obtener el perfil");
  }

  return data;
};
