import { useMutation } from "@tanstack/react-query";
import { createCompany } from "./api";
import { qk } from "../category/queries";
import { useQueryClient } from "@tanstack/react-query";

export const useCreateCompanyMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      companyName: string;
      email: string;
      password: string;
      confirmPassword: string;
      description?: string;
      companyLogo?: string;
    }) => createCompany(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: qk.categories.list() }),
    onError: (error) => error,
  });
};
