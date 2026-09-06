import z from "zod";

export const updateUserSchema = z.object({
  name: z.string().trim().min(1, {
    error: "Name is required",
  }),
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;
