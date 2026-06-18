import { useQuery } from "@tanstack/react-query";
import {
  getProjectsByProfile,
  getProjectById,
  getProjectMembers,
} from "../../src/service/ProjectsService";

export const useProjects = (profile_id) => {
  return useQuery({
    queryKey: ["projects", profile_id],
    queryFn: () => getProjectsByProfile(profile_id),
    enabled: !!profile_id,
  });
};

export const useProject = (project_id) => {
  return useQuery({
    queryKey: ["project", project_id],
    queryFn: () => getProjectById(project_id),
    enabled: !!project_id,
  });
};

export const useProjectMembers = (project_id) => {
  return useQuery({
    queryKey: ["project-members", project_id],
    queryFn: () => getProjectMembers(project_id),
    enabled: !!project_id,
  });
};
