import { db } from "../db";
import type {
  SourceCreateInput,
  SourceListInput,
  SourceUpdateInput,
  SourceDeleteInput,
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
  const { researchId } = input;

  return db.source.findMany({
    where: {
      researchId,
    },
    orderBy: [{ updatedAt: "desc" }, { id: "asc" }],
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

export const source = {
  create,
  list,
  update,
  delete: remove,
};
