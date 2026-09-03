import { db } from "../db";
import type {
  SourceCreateInput,
  SourceListInput,
  SourceUpdateInput,
  SourceDeleteInput,
  SourceBelongsToResearchInput,
  SourceGetByIdInput,
  SourceGetMetadataByIdInput as SourceGetTitleByIdInput,
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

async function list(input: SourceListInput) {
  const { researchId, userId } = input;

  return db.source.findMany({
    where: {
      researchId,

      research: {
        userId,
      },
    },

    orderBy: [{ updatedAt: "desc" }, { id: "asc" }],
  });
}

async function getById(input: SourceGetByIdInput) {
  const { id, researchId, userId } = input;

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
  const { id, researchId, userId } = input;

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
  const { id, researchId, ...data } = input;

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
  const { id, researchId } = input;

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
  const { id, researchId } = input;
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

export const source = {
  create,
  list,
  getById,
  getTitleById,
  update,
  delete: remove,
  belongsToResearch,
};
