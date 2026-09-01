"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import FormError from "@/components/form/form-error";
import FormTextField from "@/components/form/form-text-field";
import FormTextAreaField from "@/components/form/form-textarea-field";
import { Button } from "@/coss/ui/button";
import { DialogClose, DialogFooter, DialogPanel } from "@/coss/ui/dialog";
import { Field, FieldError } from "@/coss/ui/field";
import { Form } from "@/coss/ui/form";
import {
  Select,
  SelectItem,
  SelectLabel,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/coss/ui/select";
import updateSource from "@/features/source/actions/update-source";
import { sourceTypes } from "@/features/source/contants";
import { updateSourceSchema, type UpdateSourceInput } from "@/features/source/schemas";
import { type Source } from "@/generated/prisma/client";
import { type FormErrors } from "@/shared/types/form";
import { setFormErrors } from "@/shared/utils/form";

type UpdateSourceFormProps = {
  source: Source;
  onSuccess: () => void;
};

export default function UpdateSourceForm({ source, onSuccess }: UpdateSourceFormProps) {
  const form = useForm<UpdateSourceInput>({
    resolver: zodResolver(updateSourceSchema),
    defaultValues: {
      id: source.id,
      researchId: source.researchId,
      title: source.title,
      url: source.url,
      description: source.description ?? "",
      type: source.type,
    },
  });

  const errors: FormErrors = Object.fromEntries(
    Object.entries(form.formState.errors).map(([name, error]) => [name, error?.message ?? ""]),
  );

  async function onSubmit(data: UpdateSourceInput) {
    form.clearErrors("form");

    const result = await updateSource(data);

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
    <Form className="contents" errors={errors} onSubmit={form.handleSubmit(onSubmit)}>
      <DialogPanel className="grid gap-4">
        <FormTextField
          {...form.register("title")}
          label="Title"
          placeholder="What is this source?"
          autoComplete="off"
        />

        <FormTextField
          {...form.register("url")}
          label="URL"
          placeholder="https://example.com"
          type="url"
          autoComplete="url"
        />

        <FormTextAreaField
          {...form.register("description")}
          label="Description"
          placeholder="What is this source about?"
        />

        <Controller
          control={form.control}
          name="type"
          render={({ field }) => (
            <Field name={field.name}>
              <Select
                aria-label="Source type"
                items={sourceTypes}
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectLabel>Source Type</SelectLabel>

                <SelectTrigger>
                  <SelectValue placeholder="Select source type" />
                </SelectTrigger>

                <SelectPopup alignItemWithTrigger={false}>
                  {sourceTypes.map(({ label, value }) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectPopup>
              </Select>

              <FieldError />
            </Field>
          )}
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
