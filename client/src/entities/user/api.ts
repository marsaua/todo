import { fetchPublic } from "@/helpers/fetchPublic";
import { fetchWithAuth } from "@/helpers/fetchWithAuth";

export const registerUser = (data: {
  name: string;
  surname: string;
  email: string;
  password: string;
}) => fetchPublic("POST", "auth/register", data);

export const loginUser = (data: { email: string; password: string }) =>
  fetchPublic("POST", "auth/login", data);

export const logoutUser = () => fetchWithAuth("POST", "auth/logout");
