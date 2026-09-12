export type CreateInput = {
  researchId: string;
  sourceId?: string;
  content: string;
};

export type UpdateInput = {
  noteId: string;
  researchId: string;
  content: string;
};

export type DeleteInput = {
  noteId: string;
  researchId: string;
};

export type GetLatestUpdated = {
  userId: string;
};
