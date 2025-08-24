import { useMutation } from "@tanstack/react-query";
import apiClient from "../../../api/client";
import { URLs } from "@/api/urls";

type LoginData = {
  email: string;
  password: string;
};

export const useLogin = () => {
  const mutation = useMutation({
    mutationFn: async (data: LoginData) => {
      const response = await apiClient.post(URLs.auth.login, data);
      return response.data;
    },
  });

  return mutation;
};
