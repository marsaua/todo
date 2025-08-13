import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerUser, loginUser, logoutUser } from "./api";

const qk = {
  users: {
    root: () => ["users"] as const,
  },
};

export function useRegisterUserMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      name: string;
      surname: string;
      email: string;
      password: string;
    }) => registerUser(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: qk.users.root() }),
    onError: (error) => error,
  });
}

export function useLoginUserMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: { email: string; password: string }) => loginUser(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: qk.users.root() }),
    onError: (error) => error,
  });
}

export function useLogoutUserMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => logoutUser(),
    onSuccess: () => qc.invalidateQueries({ queryKey: qk.users.root() }),
    onError: (error) => error,
  });
}
