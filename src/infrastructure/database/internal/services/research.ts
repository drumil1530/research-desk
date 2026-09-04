import { notFound, redirect } from "next/navigation";

import type { ResearchWhereInput } from "@/generated/prisma/models";
import ROUTES from "@/shared/routes";

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
  ResearchGetMetadataByIdInput as ResearchGetTitleByIdInput,
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

async function getTitleById(input: ResearchGetTitleByIdInput) {
  const { id, userId } = input;

  return db.research.findUnique({
    where: {
      id_userId: {
        id,
        userId,
      },
    },
    select: {
      title: true,
      description: true,
    },
  });
}

async function list(input: ResearchListInput) {
  const { userId, page, search } = input;

  const where = {
    userId,
    ...(search
      ? {
          OR: [
            { title: { contains: search, mode: "insensitive" } },
            { description: { contains: search, mode: "insensitive" } },
          ],
        }
      : {}),
  } satisfies ResearchWhereInput;

  const pageSize = 10;
  const total = await db.research.count({
    where,
  });

  const totalPages = Math.ceil(total / pageSize);

  if (totalPages === 0) {
    if (page !== 1) redirect(ROUTES.researchList);
  } else if (page < 1 || page > totalPages) {
    notFound();
  }

  const researches = await db.research.findMany({
    where,
    take: pageSize,
    skip: (page - 1) * pageSize,
    orderBy: [{ updatedAt: "desc" }, { id: "asc" }],
  });

  return {
    researches,
    total,
    totalPages,
  };
}

async function sourceList(input: ResearchSourceListInput) {
  const { id, userId, page, search } = input;

  const pageSize = 10;

  const research = await db.research.findUnique({
    where: {
      id_userId: {
        id,
        userId,
      },
    },
    select: {
      id: true,
      title: true,

      _count: {
        select: {
          sources: true,
        },
      },
      sources: {
        where: {
          ...(search
            ? {
                OR: [
                  { title: { contains: search, mode: "insensitive" } },
                  { description: { contains: search, mode: "insensitive" } },
                ],
              }
            : {}),
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
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

  if (!research) return null;

  const totalSources = research._count.sources;
  const totalSourcePages = Math.ceil(totalSources / pageSize);

  if (totalSourcePages === 0) {
    if (page !== 1) redirect(ROUTES.research(id).sources);
  } else if (page < 1 || page > totalSourcePages) {
    notFound();
  }

  return {
    ...research,
    totalSources,
    totalSourcePages,
  };
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
      title: true,

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
  getTitleById,
  list,
  noteList,
  sourceList,
  update,
  delete: remove,
  isOwnedBy,
};
