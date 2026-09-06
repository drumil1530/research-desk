import { db } from "../db";
import type {
  SourceCreateInput,
  SourceUpdateInput,
  SourceDeleteInput,
  SourceBelongsToResearchInput,
  SourceGetByIdInput,
  SourceGetMetadataByIdInput as SourceGetTitleByIdInput,
  SourceGetLatestUpdatedInput,
} from "../types/source";

async function create(input: SourceCreateInput) {
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

async function getById(input: SourceGetByIdInput) {
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
        orderBy: [{ updatedAt: "desc" }, { id: "asc" }],
      },
      _count: {
        select: { notes: true },
      },
    },
  });
}

async function getTitleById(input: SourceGetTitleByIdInput) {
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

async function update(input: SourceUpdateInput) {
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

async function remove(input: SourceDeleteInput) {
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

async function belongsToResearch(input: SourceBelongsToResearchInput) {
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

async function getLatestUpdated(input: SourceGetLatestUpdatedInput) {
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
