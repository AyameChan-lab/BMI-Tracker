import { z } from "zod";

export const RegisterSchema = z
  .object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required"),
    confirmPassword: z.string(),
    displayName: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterFormState = {
  errors?: {
    username?: string[];
    password?: string[];
    confirmPassword?: string[];
    displayName?: string[];
  };
  message?: string | null;
};
