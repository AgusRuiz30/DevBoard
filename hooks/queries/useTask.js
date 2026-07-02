import { useQuery } from "@tanstack/react-query";
import { getTasksByProject } from "../../src/service/taskService";

export const useTasks = (project_id) => {
  return useQuery({
    queryKey: ["tasks", project_id],
    queryFn: () => getTasksByProject(project_id),
    enabled: !!project_id,
  });
};
