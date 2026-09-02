import { db } from "../db";
import type { NoteCreateInput, NoteDeleteInput, NoteUpdateInput } from "../types/note";

async function create(input: NoteCreateInput) {
  const { content, researchId, sourceId } = input;
  return db.note.create({
    data: {
      content,
      researchId,
      sourceId: sourceId || null,
    },
  });
}

async function update(input: NoteUpdateInput) {
  const { id, content, researchId } = input;
  return db.note.update({
    where: {
      id_researchId: {
        id,
        researchId,
      },
    },
    data: {
      content,
    },
  });
}

async function remove(input: NoteDeleteInput) {
  const { id, researchId } = input;
  return db.note.delete({
    where: {
      id_researchId: {
        id,
        researchId,
      },
    },
  });
}

export const note = {
  create,
  update,
  delete: remove,
};
