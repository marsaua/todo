import { fetchWithAuth } from "@/helpers/fetchWithAuth";

export const invitationApi = {
  createInvitation: async (email: string) => {
    return await fetchWithAuth("POST", "invitation", {
      email,
    });
  },
  redeemInvitation: async (token: string) => {
    try {
      return await fetchWithAuth("POST", "invitation/redeem", {
        token,
      });
    } catch (error) {
      console.error("Error redeeming invitation:", error);
      throw error;
    }
  },
};
