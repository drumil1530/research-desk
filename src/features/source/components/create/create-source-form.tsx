"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";

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
import createSource from "@/features/source/actions/create-source";
import { sourceTypes } from "@/features/source/contants";
import { type CreateSourceInput, createSourceSchema } from "@/features/source/schemas";
import { setFormErrors, toFormErrors } from "@/shared/utils/form";

type CreateSourceFormProps = {
  researchId: string;
  onSuccess: (sourceId: string) => void;
};

export default function CreateSourceForm({ researchId, onSuccess }: CreateSourceFormProps) {
  const form = useForm<CreateSourceInput>({
    resolver: zodResolver(createSourceSchema),
    defaultValues: {
      researchId,
      title: "",
      url: "",
      description: "",
      type: "OTHER",
    },
  });

  async function onSubmit(data: CreateSourceInput) {
    form.clearErrors("form");

    const result = await createSource(data);

    if (!result.success) {
      switch (result.error.type) {
        case "validation":
          setFormErrors(form.setError, result.error.fieldErrors);
          break;
      }

      return;
    }

    onSuccess(result.data.id);
  }

  return (
    <Form
      className="contents"
      errors={toFormErrors(form.formState.errors)}
      onSubmit={form.handleSubmit(onSubmit)}
    >
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
          Add
        </Button>
      </DialogFooter>
    </Form>
  );
}
