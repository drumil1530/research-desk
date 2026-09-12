import { type SourceType, type ResearchStatus } from "@/generated/prisma/client";

export type CreateInput = {
  userId: string;
  title: string;
  description?: string;
};

export type GetByIdInput = {
  researchId: string;
  userId: string;
};

export type GetTitleByIdInput = {
  researchId: string;
  userId: string;
};

export type ListInput = {
  userId: string;

  page: number;
  search?: string;
  status: "ALL" | ResearchStatus;
};

export type NoteListInput = {
  researchId: string;
  userId: string;
};

export type SourceListInput = {
  researchId: string;
  userId: string;

  page: number;
  search?: string;
  type: SourceType | "ALL";
};

export type UpdateInput = {
  researchId: string;
  userId: string;
  title?: string;
  description?: string | null;
  status?: ResearchStatus;
  summary?: string | null;
  completedAt?: Date | null;
};

export type DeleteInput = {
  researchId: string;
  userId: string;
};

export type OwnedByInput = {
  researchId: string;
  userId: string;
};

export type GetLatestActive = {
  userId: string;
};

export type GetLatestCompleted = {
  userId: string;
};
