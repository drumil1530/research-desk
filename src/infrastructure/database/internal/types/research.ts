import { type SourceType, type ResearchStatus } from "@/generated/prisma/client";

export type ResearchCreateInput = {
  userId: string;
  title: string;
  description?: string;
};

export type ResearchGetByIdInput = {
  researchId: string;
  userId: string;
};

export type ResearchGetMetadataByIdInput = {
  researchId: string;
  userId: string;
};

export type ResearchListInput = {
  userId: string;

  page: number;
  search?: string;
  status: "ALL" | ResearchStatus;
};

export type ResearchNoteListInput = {
  researchId: string;
  userId: string;
};

export type ResearchSourceListInput = {
  researchId: string;
  userId: string;

  page: number;
  search?: string;
  type: SourceType | "ALL";
};

export type ResearchUpdateInput = {
  researchId: string;
  userId: string;
  title?: string;
  description?: string | null;
  status?: ResearchStatus;
  summary?: string | null;
  completedAt?: Date | null;
};

export type ResearchDeleteInput = {
  researchId: string;
  userId: string;
};

export type ResearchOwnedByInput = {
  researchId: string;
  userId: string;
};

export type ResearchGetLatestActive = {
  userId: string;
};

export type ResearchGetLatestCompleted = {
  userId: string;
};
