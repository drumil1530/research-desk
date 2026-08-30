export type AuthActionError<T> =
  | {
      type: "validation";
      fieldErrors: Partial<Record<keyof T, string[]>>;
    }
  | {
      type: "auth";
      message: string;
    };
