import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createProject,
  updateProject,
  deleteProject,
  addProjectMember,
  updateProjectMemberRole,
  removeProjectMember,
} from "../../src/service/ProjectsService";

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProject,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["projects", variables.profile_id],
      });
    },
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProject,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["project", variables.project_id],
      });

      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
  });
};

export const useAddProjectMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addProjectMember,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["project-members", variables.project_id],
      });
    },
  });
};

export const useUpdateProjectMemberRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProjectMemberRole,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["project-members", variables.project_id],
      });
    },
  });
};

export const useRemoveProjectMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeProjectMember,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["project-members", variables.project_id],
      });
    },
  });
};
