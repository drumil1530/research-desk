export type NoteCreateInput = {
  researchId: string;
  sourceId?: string;
  content: string;
};

export type NoteUpdateInput = {
  noteId: string;
  researchId: string;
  content: string;
};

export type NoteDeleteInput = {
  noteId: string;
  researchId: string;
};

export type NoteGetLatestUpdated = {
  userId: string;
};
