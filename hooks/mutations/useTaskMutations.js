import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createTask,
  updateTask,
  updateTaskStatus,
  deleteTask,
} from "../../src/service/taskService";

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      title,
      status,
      profile_id,
      priority,
      checklist,
      role,
      project_id,
    }) =>
      createTask({
        title,
        status,
        profile_id,
        priority,
        checklist,
        role,
        project_id,
      }),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", variables.project_id],
      });
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      task_id,
      title,
      status,
      priority,
      checklist,
      role,
      project_id,
    }) =>
      updateTask({
        task_id,
        title,
        status,
        priority,
        checklist,
        role,
        project_id,
      }),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", variables.project_id],
      });
    },
  });
};

export const useUpdateTaskStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ task_id, status, project_id }) =>
      updateTaskStatus({
        task_id,
        status,
        project_id,
      }),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", variables.project_id],
      });
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ task_id, project_id }) =>
      deleteTask({
        task_id,
        project_id,
      }),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", variables.project_id],
      });
    },
  });
};
