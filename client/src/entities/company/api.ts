import { fetchPublic } from "@/helpers/fetchPublic";

export const createCompany = (data: {
  companyName: string;
  email: string;
  password: string;
  confirmPassword: string;
  description?: string;
  companyLogo?: string;
}) => fetchPublic("POST", "companies", data);
