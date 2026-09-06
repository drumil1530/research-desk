import { db } from "../db";
import type {
  NoteCreateInput,
  NoteDeleteInput,
  NoteGetLatestUpdated,
  NoteUpdateInput,
} from "../types/note";

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
  const { noteId: id, content, researchId } = input;
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
  const { noteId: id, researchId } = input;
  return db.note.delete({
    where: {
      id_researchId: {
        id,
        researchId,
      },
    },
  });
}

async function getLatestUpdated(input: NoteGetLatestUpdated) {
  return db.note.findMany({
    where: {
      research: {
        userId: input.userId,
      },
    },
    select: {
      id: true,
      content: true,
      sourceId: true,
      researchId: true,
    },
    take: 5,
    orderBy: [{ updatedAt: "desc" }, { id: "asc" }],
  });
}

export const note = {
  create,
  update,
  delete: remove,
  getLatestUpdated,
};
