import { db } from "../db";
import type * as Source from "../types/source";

async function create(input: Source.CreateInput) {
  const { researchId, title, description, url, type } = input;

  return db.source.create({
    data: {
      title,
      description,
      url,
      type,
      researchId,
    },
  });
}

async function getById(input: Source.GetByIdInput) {
  const { sourceId: id, researchId, userId } = input;

  return db.source.findUnique({
    where: {
      id_researchId: {
        id,
        researchId,
      },
      research: {
        userId,
      },
    },

    include: {
      research: {
        select: {
          id: true,
          title: true,
        },
      },
      notes: {
        select: {
          id: true,
          content: true,
        },
      },
    },
  });
}

async function getTitleById(input: Source.GetTitleByIdInput) {
  const { sourceId: id, researchId, userId } = input;

  return db.source.findUnique({
    where: {
      id_researchId: {
        id,
        researchId,
      },
      research: {
        userId,
      },
    },
    select: {
      title: true,
    },
  });
}

async function update(input: Source.UpdateInput) {
  const { sourceId: id, researchId, ...data } = input;

  return db.source.update({
    where: {
      id_researchId: {
        id,
        researchId,
      },
    },
    data,
  });
}

async function remove(input: Source.DeleteInput) {
  const { sourceId: id, researchId } = input;

  return db.source.delete({
    where: {
      id_researchId: {
        id,
        researchId,
      },
    },
  });
}

async function belongsToResearch(input: Source.BelongsToResearchInput) {
  const { sourceId: id, researchId } = input;
  const source = await db.source.findUnique({
    where: {
      id_researchId: {
        id,
        researchId,
      },
    },
    select: { id: true },
  });

  return source !== null;
}

async function getLatestUpdated(input: Source.GetLatestUpdatedInput) {
  return db.source.findMany({
    where: {
      research: {
        userId: input.userId,
      },
    },
    select: {
      id: true,
      researchId: true,
      title: true,
    },
    take: 5,
    orderBy: [{ updatedAt: "desc" }, { id: "asc" }],
  });
}

export const source = {
  create,
  getById,
  getTitleById,
  update,
  delete: remove,
  belongsToResearch,
  getLatestUpdated,
};
