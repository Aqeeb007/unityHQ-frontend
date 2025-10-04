import { URLs } from "@/api/urls";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../../../api/client";

export type TWorkspaces = {
  id: string;
  name: string;
  orgId: string;
  createdAt: string;
  updatedAt: string;
};

export const useGetWorkspaces = () => {
  const query = useQuery({
    queryKey: ["workspaces"],
    queryFn: async () => {
      const response = await apiClient.get(URLs.workspaces.getWorkspaces);
      return response.data;
    },
  });

  return query;
};
