import { db } from "../db";
import type {
  ResearchGetByIdInput,
  ResearchCreateInput,
  ResearchListInput,
  ResearchUpdateInput,
  ResearchDeleteInput,
  ResearchOwnedByInput,
  ResearchNoteListInput,
  ResearchSourceListInput,
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
    include: {
      _count: {
        select: {
          sources: true,
          notes: {
            where: { sourceId: null },
          },
        },
      },
      sources: {
        select: {
          id: true,
          title: true,
          url: true,
          type: true,
        },
        orderBy: [{ updatedAt: "desc" }, { id: "asc" }],
        take: 5,
      },
      notes: {
        where: { sourceId: null },
        select: {
          id: true,
          content: true,
        },
        orderBy: [{ updatedAt: "desc" }, { id: "asc" }],
        take: 5,
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

async function sourceList(input: ResearchSourceListInput) {
  const { id, userId } = input;

  return db.research.findUnique({
    where: {
      id_userId: {
        id,
        userId,
      },
    },
    select: {
      id: true,
      _count: {
        select: {
          sources: true,
        },
      },
      sources: {
        include: {
          _count: {
            select: {
              notes: {
                where: {
                  sourceId: { not: null },
                },
              },
            },
          },
        },
        orderBy: [{ updatedAt: "desc" }, { id: "asc" }],
      },
    },
  });
}

async function noteList(input: ResearchNoteListInput) {
  const { id, userId } = input;

  return db.research.findUnique({
    where: {
      id_userId: {
        id,
        userId,
      },
    },
    select: {
      id: true,
      _count: {
        select: {
          notes: {
            where: { sourceId: null },
          },
        },
      },
      notes: {
        where: { sourceId: null },
        select: {
          id: true,
          content: true,
        },
        orderBy: [{ updatedAt: "desc" }, { id: "asc" }],
      },
    },
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
  noteList,
  sourceList,
  update,
  delete: remove,
  isOwnedBy,
};
