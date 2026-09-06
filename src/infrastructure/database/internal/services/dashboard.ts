import { db } from "../db";

async function getCounts({ userId }: { userId: string }) {
  const [researches, sources, notes] = await Promise.all([
    db.research.count({
      where: { userId },
    }),
    db.source.count({
      where: {
        research: {
          userId,
        },
      },
    }),
    db.note.count({
      where: {
        research: {
          userId,
        },
      },
    }),
  ]);

  return {
    researches,
    sources,
    notes,
  };
}

export const dashboard = {
  getCounts,
};
