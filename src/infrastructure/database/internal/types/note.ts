export type NoteCreateInput = {
  researchId: string;
  sourceId?: string;
  content: string;
};

export type NoteUpdateInput = {
  id: string;
  researchId: string;
  content: string;
};

export type NoteDeleteInput = {
  id: string;
  researchId: string;
};
