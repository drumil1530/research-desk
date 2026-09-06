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

const summarySchema = z
  .string()
  .trim()
  .min(1, { error: "Summary is required." })
  .max(5000, { error: "Summary must be 5000 characters or less." });

const researchStatusFilters = ["all", "active", "completed"] as const;

export const createResearchSchema = z.object({
  title: titleSchema,
  description: descriptionSchema,
});

export const updateResearchSchema = z.object({
  researchId: researchIdSchema,
  title: titleSchema,
  description: descriptionSchema.nullable(),
});

export const updateResearchSummarySchema = z.object({
  researchId: researchIdSchema,
  summary: summarySchema,
});

export const completeResearchSchema = z.object({
  researchId: researchIdSchema,
  summary: summarySchema,
});

export const reopenResearchSchema = z.object({
  researchId: researchIdSchema,
});

export const deleteResearchSchema = z.object({
  researchId: researchIdSchema,
});

export const listResearchesFilterSchema = z.object({
  search: z.string().trim().toLowerCase().optional(),
  status: z.enum(researchStatusFilters).default("active"),
});

export type CreateResearchInput = z.infer<typeof createResearchSchema>;
export type UpdateResearchInput = z.infer<typeof updateResearchSchema>;
export type UpdateResearchSummaryInput = z.infer<typeof updateResearchSummarySchema>;
export type CompleteResearchInput = z.infer<typeof completeResearchSchema>;
export type ReopenResearchInput = z.infer<typeof reopenResearchSchema>;
export type DeleteResearchInput = z.infer<typeof deleteResearchSchema>;
export type ListResearchesFilterInput = z.infer<typeof listResearchesFilterSchema>;
