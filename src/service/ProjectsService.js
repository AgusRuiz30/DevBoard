import { client } from "../lib/NeonClient";

export const PROJECT_ROLES = [
  "Owner",
  "Project Manager",
  "Technical Lead",
  "Frontend UI",
  "Logic Frontend",
  "Backend",
  "Full Stack",
  "QA Tester",
  "UI/UX Designer",
  "DevOps",
  "Database Manager",
  "Viewer",
];

export const createProject = async ({
  name,
  description,
  stack = [],
  profile_id,
}) => {
  if (!profile_id) {
    throw new Error("El profile_id es obligatorio para crear un proyecto");
  }

  const { data: projectData, error: projectError } = await client
    .from("projects")
    .insert({
      name,
      description,
      stack,
      profile_id,
    })
    .select();

  if (projectError) {
    throw new Error(projectError.message || "Error al crear el proyecto");
  }

  const project = projectData?.[0];

  if (!project?.id) {
    throw new Error("No se pudo obtener el proyecto creado");
  }

  const { data: memberData, error: memberError } = await client
    .from("project_members")
    .insert({
      project_id: project.id,
      profile_id,
      role: "Owner",
    })
    .select();

  if (memberError) {
    await client.from("projects").delete().eq("id", project.id);

    throw new Error(
      memberError.message || "Error al asignar el owner del proyecto",
    );
  }

  return {
    project,
    member: memberData?.[0],
  };
};

export const getProjectsByProfile = async (profile_id) => {
  if (!profile_id) {
    throw new Error("El profile_id es obligatorio");
  }

  const { data, error } = await client
    .from("project_members")
    .select("*, projects(*)")
    .eq("profile_id", profile_id);

  if (error) {
    throw new Error(error.message || "Error al obtener los proyectos");
  }

  return data;
};

export const getProjectById = async (project_id) => {
  if (!project_id) {
    throw new Error("El project_id es obligatorio");
  }

  const { data, error } = await client
    .from("projects")
    .select("*")
    .eq("id", project_id);

  if (error) {
    throw new Error(error.message || "Error al obtener el proyecto");
  }

  return data?.[0] || null;
};

export const updateProject = async ({
  project_id,
  name,
  description,
  stack,
}) => {
  if (!project_id) {
    throw new Error("El project_id es obligatorio");
  }

  const { data, error } = await client
    .from("projects")
    .update({
      name,
      description,
      stack,
    })
    .eq("id", project_id)
    .select();

  if (error) {
    throw new Error(error.message || "Error al actualizar el proyecto");
  }

  return data?.[0];
};

export const deleteProject = async (project_id) => {
  if (!project_id) {
    throw new Error("El project_id es obligatorio");
  }

  const { error } = await client.from("projects").delete().eq("id", project_id);

  if (error) {
    throw new Error(error.message || "Error al eliminar el proyecto");
  }

  return true;
};

export const getProjectMembers = async (project_id) => {
  if (!project_id) {
    throw new Error("El project_id es obligatorio");
  }

  const { data, error } = await client
    .from("project_members")
    .select("*, profiles(*)")
    .eq("project_id", project_id);

  if (error) {
    throw new Error(error.message || "Error al obtener miembros del proyecto");
  }

  return data;
};

export const addProjectMember = async ({ project_id, profile_id, role }) => {
  if (!project_id || !profile_id || !role) {
    throw new Error("project_id, profile_id y role son obligatorios");
  }

  const { data, error } = await client
    .from("project_members")
    .insert({
      project_id,
      profile_id,
      role,
    })
    .select();

  if (error) {
    throw new Error(error.message || "Error al agregar miembro al proyecto");
  }

  return data?.[0];
};

export const updateProjectMemberRole = async ({
  project_id,
  profile_id,
  role,
}) => {
  if (!project_id || !profile_id || !role) {
    throw new Error("project_id, profile_id y role son obligatorios");
  }

  const { data, error } = await client
    .from("project_members")
    .update({
      role,
    })
    .eq("project_id", project_id)
    .eq("profile_id", profile_id)
    .select();

  if (error) {
    throw new Error(error.message || "Error al actualizar rol del miembro");
  }

  return data?.[0];
};

export const removeProjectMember = async ({ project_id, profile_id }) => {
  if (!project_id || !profile_id) {
    throw new Error("project_id y profile_id son obligatorios");
  }

  const { error } = await client
    .from("project_members")
    .delete()
    .eq("project_id", project_id)
    .eq("profile_id", profile_id);

  if (error) {
    throw new Error(error.message || "Error al eliminar miembro del proyecto");
  }

  return true;
};
