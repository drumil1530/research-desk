import { db } from "../db";
import type {
  ResearchGetByIdInput,
  ResearchCreateInput,
  ResearchListInput,
  ResearchUpdateInput,
  ResearchDeleteInput,
  ResearchOwnedByInput,
} from "../types/research";

async function create(input: ResearchCreateInput) {
  const { userId, title, description } = input;

  return db.research.create({
    data: {
      userId,
      title,
      description,
    },
  });
}

async function getById(input: ResearchGetByIdInput) {
  const { id, userId } = input;

  return db.research.findUnique({
    where: {
      id_userId: {
        id,
        userId,
      },
    },
  });
}

async function list(input: ResearchListInput) {
  const { userId } = input;

  return db.research.findMany({
    where: {
      userId,
    },
    orderBy: [{ updatedAt: "desc" }, { id: "asc" }],
  });
}

async function update(input: ResearchUpdateInput) {
  const { id, userId, ...data } = input;

  return db.research.update({
    where: {
      id_userId: {
        id,
        userId,
      },
    },
    data,
  });
}

async function remove(input: ResearchDeleteInput) {
  const { id, userId } = input;

  return db.research.delete({
    where: {
      id_userId: {
        id,
        userId,
      },
    },
  });
}

async function isOwnedBy(input: ResearchOwnedByInput) {
  const { researchId: id, userId } = input;

  const research = await db.research.findUnique({
    where: {
      id_userId: {
        id,
        userId,
      },
    },
    select: {
      id: true,
    },
  });

  return research !== null;
}

export const research = {
  create,
  getById,
  list,
  update,
  delete: remove,
  isOwnedBy,
};
