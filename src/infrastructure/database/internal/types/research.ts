import { type ResearchStatus } from "@/generated/prisma/client";

export type ResearchCreateInput = {
  userId: string;
  title: string;
  description?: string;
};

export type ResearchGetByIdInput = {
  id: string;
  userId: string;
};

export type ResearchListInput = {
  userId: string;
};

export type ResearchUpdateInput = {
  id: string;
  userId: string;
  title?: string;
  description?: string | null;
  status?: ResearchStatus;
  summary?: string | null;
  completedAt?: Date | null;
};

export type ResearchDeleteInput = {
  id: string;
  userId: string;
};
