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
