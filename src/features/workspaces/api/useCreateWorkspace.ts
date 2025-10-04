import { useMutation } from "@tanstack/react-query";
import apiClient from "../../../api/client";
import { URLs } from "@/api/urls";

type TCreateWorkspace = {
  name: string;
  description: string;
};

export const useCreateWorkspace = () => {
  const mutation = useMutation({
    mutationFn: async (data: TCreateWorkspace) => {
      const response = await apiClient.post(
        URLs.workspaces.createWorkspace,
        data
      );
      return response.data;
    },
  });

  return mutation;
};
