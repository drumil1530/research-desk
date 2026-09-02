import z from "zod";

import { SourceType } from "@/generated/prisma/enums";

import { researchIdSchema } from "../research/schemas";

export const sourceIdSchema = z.uuid({ error: "Invalid source ID.", version: "v7" });

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

const urlSchema = z.url({ error: "Invalid URL provided." });

const typeSchema = z.enum(SourceType);

export const createSourceSchema = z.object({
  researchId: researchIdSchema,
  title: titleSchema,
  description: descriptionSchema,
  url: urlSchema,
  type: typeSchema,
});

export const updateSourceSchema = z.object({
  id: sourceIdSchema,
  researchId: researchIdSchema,
  title: titleSchema,
  description: descriptionSchema.nullable(),
  url: urlSchema,
  type: typeSchema,
});

export const deleteSourceSchema = z.object({
  id: sourceIdSchema,
  researchId: researchIdSchema,
});

export type CreateSourceInput = z.infer<typeof createSourceSchema>;
export type UpdateSourceInput = z.infer<typeof updateSourceSchema>;
export type DeleteSourceInput = z.infer<typeof deleteSourceSchema>;
