"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import FormError from "@/components/form/form-error";
import FormTextAreaField from "@/components/form/form-textarea-field";
import { Button } from "@/coss/ui/button";
import { DialogClose, DialogFooter, DialogPanel } from "@/coss/ui/dialog";
import { Form } from "@/coss/ui/form";
import updateNote from "@/features/note/actions/update-note";
import { updateNoteSchema, type UpdateNoteInput } from "@/features/note/schemas";
import { type Note } from "@/generated/prisma/client";
import { setFormErrors, toFormErrors } from "@/shared/utils/form";

type UpdateNoteFormProps = {
  note: Pick<Note, "id" | "content">;
  researchId: string;
  onSuccess: () => void;
};

export default function UpdateNoteForm({ note, researchId, onSuccess }: UpdateNoteFormProps) {
  const form = useForm<UpdateNoteInput>({
    resolver: zodResolver(updateNoteSchema),
    defaultValues: {
      noteId: note.id,
      researchId,
      content: note.content,
    },
  });

  async function onSubmit(data: UpdateNoteInput) {
    form.clearErrors("form");

    const result = await updateNote(data);

    if (!result.success) {
      switch (result.error.type) {
        case "validation":
          setFormErrors(form.setError, result.error.fieldErrors);
          break;

        case "notFound":
          form.setError("form", {
            type: "server",
            message: result.error.message,
          });
          break;
      }

      return;
    }

    onSuccess();
  }

  return (
    <Form
      className="contents"
      errors={toFormErrors(form.formState.errors)}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <DialogPanel className="grid gap-4">
        <FormTextAreaField
          {...form.register("content")}
          label="Content"
          placeholder="What is this note about?"
        />

        <FormError>{form.formState.errors.form?.message}</FormError>
      </DialogPanel>

      <DialogFooter variant="bare">
        <DialogClose render={<Button variant="ghost" />}>Cancel</DialogClose>

        <Button loading={form.formState.isSubmitting} type="submit">
          Save
        </Button>
      </DialogFooter>
    </Form>
  );
}
