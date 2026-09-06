import z from "zod";

import { researchIdSchema } from "../research/schemas";

export const noteIdSchema = z.uuid({ error: "Invalid note ID.", version: "v7" });

const contentSchema = z
  .string()
  .trim()
  .min(1, { error: "Content is required." })
  .max(2000, { error: "Content must be 2000 characters or less." });

export const createNoteSchema = z.object({
  researchId: researchIdSchema,
  sourceId: z.uuid({ error: "Invalid source ID.", version: "v7" }).optional(),
  content: contentSchema,
});

export const updateNoteSchema = z.object({
  noteId: noteIdSchema,
  researchId: researchIdSchema,
  content: contentSchema,
});

export const deleteNoteSchema = z.object({
  noteId: noteIdSchema,
  researchId: researchIdSchema,
});

export type CreateNoteInput = z.infer<typeof createNoteSchema>;
export type UpdateNoteInput = z.infer<typeof updateNoteSchema>;
export type DeleteNoteInput = z.infer<typeof deleteNoteSchema>;
