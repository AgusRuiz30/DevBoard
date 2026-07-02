import { client } from "../lib/NeonClient";

export const createTask = async ({
  title,
  status,
  profile_id,
  priority,
  checklist = [],
  role,
  project_id,
}) => {
  const payload = {
    name: title,
    status,
    profile_id,
    priority,
    checklist,
    rol: role,
    project_id,
  };

  console.log("Payload createTask:", payload);

  const { data, error } = await client
    .from("tasks")
    .insert(payload)
    .select()
    .single();

  if (error) {
    console.log("Error createTask:", error);
    throw new Error(error.message || "Error al crear la tarea");
  }

  return data;
};

export const getTasksByProject = async (project_id) => {
  const { data, error } = await client
    .from("tasks")
    .select("*")
    .eq("project_id", project_id);

  if (error) {
    console.log("Error getTasksByProject:", error);
    throw new Error(error.message || "Error al obtener tareas");
  }

  return data;
};

export const updateTask = async ({
  task_id,
  title,
  status,
  priority,
  checklist,
  role,
}) => {
  const { data, error } = await client
    .from("tasks")
    .update({
      name: title,
      status,
      priority,
      checklist,
      rol: role,
    })
    .eq("id", task_id)
    .select()
    .single();

  if (error) {
    console.log("Error updateTask:", error);
    throw new Error(error.message || "Error al actualizar la tarea");
  }

  return data;
};

export const updateTaskStatus = async ({ task_id, status }) => {
  const { data, error } = await client
    .from("tasks")
    .update({
      status,
    })
    .eq("id", task_id)
    .select()
    .single();

  if (error) {
    console.log("Error updateTaskStatus:", error);
    throw new Error(error.message || "Error al actualizar el estado");
  }

  return data;
};

export const deleteTask = async ({ task_id }) => {
  const { data, error } = await client
    .from("tasks")
    .delete()
    .eq("id", task_id)
    .select()
    .single();

  if (error) {
    console.log("Error deleteTask:", error);
    throw new Error(error.message || "Error al eliminar la tarea");
  }

  return data;
};
