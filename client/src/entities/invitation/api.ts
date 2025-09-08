import { fetchWithAuth } from "@/helpers/fetchWithAuth";

export const invitationApi = {
  createInvitation: async (email: string) => {
    return await fetchWithAuth("POST", "invitation", {
      email,
    });
  },
  redeemInvitation: async (token: string) => {
    return await fetchWithAuth("POST", "invitation/redeem", {
      token,
    });
  },
};
