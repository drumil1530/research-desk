import { type SourceType } from "@/generated/prisma/enums";

export type CreateInput = {
  researchId: string;
  title: string;
  url: string;
  description?: string;
  type: SourceType;
};

export type GetByIdInput = {
  sourceId: string;
  researchId: string;
  userId: string;
};

export type GetTitleByIdInput = {
  sourceId: string;
  researchId: string;
  userId: string;
};

export type UpdateInput = {
  sourceId: string;
  researchId: string;
  title?: string;
  url?: string;
  description?: string | null;
  type?: SourceType;
};

export type DeleteInput = {
  sourceId: string;
  researchId: string;
};

export type BelongsToResearchInput = {
  sourceId: string;
  researchId: string;
};

export type GetLatestUpdatedInput = {
  userId: string;
};
