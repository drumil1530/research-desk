import { type SourceType } from "@/generated/prisma/enums";

export type SourceCreateInput = {
  researchId: string;
  title: string;
  url: string;
  description?: string;
  type: SourceType;
};

export type SourceListInput = {
  researchId: string;
  userId: string;
};

export type SourceGetByIdInput = {
  id: string;
  researchId: string;
  userId: string;
};

export type SourceGetMetadataByIdInput = {
  id: string;
  researchId: string;
  userId: string;
};

export type SourceUpdateInput = {
  id: string;
  researchId: string;
  title?: string;
  url?: string;
  description?: string | null;
  type?: SourceType;
};

export type SourceDeleteInput = {
  id: string;
  researchId: string;
};

export type SourceBelongsToResearchInput = {
  id: string;
  researchId: string;
};
