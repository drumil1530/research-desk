export type SourceActionError<T> =
  | {
      type: "validation";
      fieldErrors: Partial<Record<keyof T, string[]>>;
    }
  | {
      type: "notFound" | "conflict";
      message: string;
    };
