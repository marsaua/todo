export type Company = {
  id: number;
  companyName: string;
  email: string;
  createdAt: Date;
  description?: string;
  companyLogo?: string;
  password: string;
  confirmPassword: string;
};
