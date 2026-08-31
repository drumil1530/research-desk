"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import FormError from "@/components/form/form-error";
import FormTextField from "@/components/form/form-text-field";
import FormTextAreaField from "@/components/form/form-textarea-field";
import { Button } from "@/coss/ui/button";
import { DialogClose, DialogFooter, DialogPanel } from "@/coss/ui/dialog";
import { Form } from "@/coss/ui/form";
import createResearch from "@/features/research/actions/create-research";
import { type CreateResearchInput, createResearchSchema } from "@/features/research/schemas";
import type { FormErrors } from "@/shared/types/form";
import { setFormErrors } from "@/shared/utils/form";

type CreateResearchFormProps = {
  onSuccess: () => void;
};

export default function CreateResearchForm({ onSuccess }: CreateResearchFormProps) {
  const form = useForm<CreateResearchInput>({
    resolver: zodResolver(createResearchSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const errors: FormErrors = Object.fromEntries(
    Object.entries(form.formState.errors).map(([name, error]) => [name, error?.message ?? ""]),
  );

  async function onSubmit(data: CreateResearchInput) {
    form.clearErrors("form");

    const result = await createResearch(data);

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
    <Form className="contents" errors={errors} onSubmit={form.handleSubmit(onSubmit)}>
      <DialogPanel className="grid gap-4">
        <FormTextField
          {...form.register("title")}
          label="Title"
          placeholder="What do you want to research?"
          autoComplete="off"
        />

        <FormTextAreaField
          {...form.register("description")}
          label="Description"
          placeholder="What is this research about?"
        />

        <FormError>{form.formState.errors.form?.message}</FormError>
      </DialogPanel>

      <DialogFooter variant="bare">
        <DialogClose render={<Button variant="ghost" />}>Cancel</DialogClose>
        <Button loading={form.formState.isSubmitting} type="submit">
          Create
        </Button>
      </DialogFooter>
    </Form>
  );
}
