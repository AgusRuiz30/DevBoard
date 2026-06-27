import { client } from "../lib/NeonClient";

export const createTask = async ({
  title,
  description,
  dueDate,
  priority,
  assignee,
  checklist,
  stack,
}) => {
  const { data, error } = await client.from("tasks").insert({
    title,
    description,
    dueDate,
    priority,
    assignee,
    checklist,
    stack,
  });

  if (error) {
    throw new Error(error.message || "Error al crear la tarea");
  }

  return data;
};

export const updateTask = async ({ task_id, title, description }) => {
  const { data, error } = await client
    .from("tasks")
    .update({
      title,
      description,
    })
    .eq("id", task_id)
    .single();

  if (error) {
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
    .single();

  if (error) {
    throw new Error(error.message || "Error al actualizar el estado");
  }

  return data;
};

export const deleteTask = async ({ task_id }) => {
  const { data, error } = await client
    .from("tasks")
    .delete()
    .eq("id", task_id)
    .single();

  if (error) {
    throw new Error(error.message || "Error al eliminar la tarea");
  }

  return data;
};
