import { type SourceType } from "@/generated/prisma/enums";

export type SourceCreateInput = {
  researchId: string;
  title: string;
  url: string;
  description?: string;
  type: SourceType;
};

export type SourceGetByIdInput = {
  sourceId: string;
  researchId: string;
  userId: string;
};

export type SourceGetMetadataByIdInput = {
  sourceId: string;
  researchId: string;
  userId: string;
};

export type SourceUpdateInput = {
  sourceId: string;
  researchId: string;
  title?: string;
  url?: string;
  description?: string | null;
  type?: SourceType;
};

export type SourceDeleteInput = {
  sourceId: string;
  researchId: string;
};

export type SourceBelongsToResearchInput = {
  sourceId: string;
  researchId: string;
};

export type SourceGetLatestUpdatedInput = {
  userId: string;
};
