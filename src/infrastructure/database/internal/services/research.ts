import { db } from "../db";
import {
  type ResearchGetByIdInput,
  type ResearchCreateInput,
  type ResearchListInput,
  type ResearchUpdateInput,
  type ResearchDeleteInput,
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

export const research = {
  create,
  getById,
  list,
  update,
  delete: remove,
};
