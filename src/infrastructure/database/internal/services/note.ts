import { db } from "../db";
import type * as Note from "../types/note";

async function create(input: Note.CreateInput) {
  const { content, researchId, sourceId } = input;
  return db.note.create({
    data: {
      content,
      researchId,
      sourceId: sourceId || null,
    },
  });
}

async function update(input: Note.UpdateInput) {
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

async function remove(input: Note.DeleteInput) {
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

async function getLatestUpdated(input: Note.GetLatestUpdated) {
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
