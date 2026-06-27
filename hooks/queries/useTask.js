import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../../src/service/taskService";

export const useTasks = (project_id) => {
  return useQuery({
    queryKey: ["tasks", project_id],
    queryFn: () => getTasks(project_id),
    enabled: !!project_id,
  });
};
