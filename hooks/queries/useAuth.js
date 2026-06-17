import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../src/service/AuthService.js";

export const useAuth = () => {
  return useQuery({
    queryKey: ["auth-user"],
    queryFn: getProfile,
    staleTime: Infinity,
  });
};
