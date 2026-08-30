import z from "zod";

export const emailSchema = z.email({
  error: "Enter a valid email address",
});

export const signUpSchema = z.object({
  name: z.string().trim().min(1, {
    error: "Name is required",
  }),
  email: emailSchema,
  password: z.string().min(8, {
    error: "Password must be at least 8 characters",
  }),
});

export const signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, {
    error: "Password is required",
  }),
});

export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;
