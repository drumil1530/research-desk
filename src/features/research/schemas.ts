import z from "zod";

export const researchIdSchema = z.uuid({ error: "Invalid research ID.", version: "v7" });

const titleSchema = z
  .string()
  .trim()
  .min(1, { error: "Title is required." })
  .max(200, { error: "Title must be 200 characters or less." });

const descriptionSchema = z
  .string()
  .trim()
  .max(2000, { error: "Description must be 2000 characters or less." })
  .optional();

export const createResearchSchema = z.object({
  title: titleSchema,
  description: descriptionSchema,
});

export const updateResearchSchema = z.object({
  id: researchIdSchema,
  title: titleSchema,
  description: descriptionSchema.nullable(),
});

export const completeResearchSchema = z.object({
  id: researchIdSchema,
  summary: z
    .string()
    .trim()
    .min(1, { error: "Summary is required." })
    .max(5000, { error: "Summary must be 5000 characters or less." }),
});

export const deleteResearchSchema = z.object({
  id: researchIdSchema,
});

export type CreateResearchInput = z.infer<typeof createResearchSchema>;
export type UpdateResearchInput = z.infer<typeof updateResearchSchema>;
export type CompleteResearchInput = z.infer<typeof completeResearchSchema>;
export type DeleteResearchInput = z.infer<typeof deleteResearchSchema>;
