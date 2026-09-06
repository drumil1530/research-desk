"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import FormError from "@/components/form/form-error";
import FormTextAreaField from "@/components/form/form-textarea-field";
import { Button } from "@/coss/ui/button";
import { DialogClose, DialogFooter, DialogPanel } from "@/coss/ui/dialog";
import { Form } from "@/coss/ui/form";
import createNote from "@/features/note/actions/create-note";
import { type CreateNoteInput, createNoteSchema } from "@/features/note/schemas";
import { setFormErrors, toFormErrors } from "@/shared/utils/form";

type CreateNoteFormProps = {
  researchId: string;
  sourceId: string | null;
  onSuccess: () => void;
};

export default function CreateNoteForm({ researchId, sourceId, onSuccess }: CreateNoteFormProps) {
  const form = useForm<CreateNoteInput>({
    resolver: zodResolver(createNoteSchema),
    defaultValues: {
      researchId,
      sourceId: sourceId ?? undefined,
      content: "",
    },
  });

  async function onSubmit(data: CreateNoteInput) {
    form.clearErrors("form");

    const result = await createNote(data);

    if (!result.success) {
      switch (result.error.type) {
        case "validation":
          setFormErrors(form.setError, result.error.fieldErrors);
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
          Add Note
        </Button>
      </DialogFooter>
    </Form>
  );
}
