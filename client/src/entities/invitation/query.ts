import { useMutation } from "@tanstack/react-query";
import { invitationApi } from "./api";

const qk = {
  invitation: "invitation",
};

export const useInvitationQuery = () => {
  return useMutation({
    mutationFn: (email: string) => invitationApi.createInvitation(email),
    retry: 1,
  });
};

export const useRedeemInvitationMutation = () => {
  return useMutation({
    mutationFn: (token: string) => invitationApi.redeemInvitation(token),
    retry: 1,
  });
};
