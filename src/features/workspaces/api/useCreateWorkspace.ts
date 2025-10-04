import { useMutation } from "@tanstack/react-query";
import apiClient from "../../../api/client";
import { URLs } from "@/api/urls";

type SignupData = {
  email: string;
  password: string;
  name?: string;
};

export const useCreateWorkspace = () => {
  const mutation = useMutation({
    mutationFn: async (data: SignupData) => {
      const response = await apiClient.post(
        URLs.workspaces.createWorkspace,
        data
      );
      return response.data;
    },
  });

  return mutation;
};
