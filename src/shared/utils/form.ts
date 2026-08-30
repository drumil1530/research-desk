import type { FieldErrors, FieldPath, FieldValues, UseFormSetError } from "react-hook-form";
import type { FormErrors } from "../types/form";

export function setFormErrors<T extends FieldValues>(
  setError: UseFormSetError<T>,
  errors: FormErrors,
) {
  for (const [field, messages] of Object.entries(errors)) {
    const message = Array.isArray(messages) ? messages[0] : messages;

    if (message) {
      setError(field as FieldPath<T>, {
        type: "server",
        message,
      });
    }
  }
}

export function toFormErrors<T extends Record<string, unknown>>(errors: FieldErrors<T>) {
  return Object.fromEntries(
    Object.entries(errors)
      .filter(([name]) => name !== "root" && name !== "form")
      .map(([name, error]) => [name, error?.message ?? ""]),
  ) as FormErrors;
}
