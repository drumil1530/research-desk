"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import FormError from "@/components/form/form-error";
import FormTextAreaField from "@/components/form/form-textarea-field";
import { Button } from "@/coss/ui/button";
import { DialogClose, DialogFooter, DialogPanel } from "@/coss/ui/dialog";
import { Form } from "@/coss/ui/form";
import updateResearchSummary from "@/features/research/actions/update-research-summary";
import {
  updateResearchSummarySchema,
  type UpdateResearchSummaryInput,
} from "@/features/research/schemas";
import { setFormErrors, toFormErrors } from "@/shared/utils/form";

type UpdateResearchSummaryFormProps = {
  researchId: string;
  summary: string | null;
  onSuccess: () => void;
};

export default function UpdateResearchSummaryForm({
  researchId,
  summary,
  onSuccess,
}: UpdateResearchSummaryFormProps) {
  const form = useForm<UpdateResearchSummaryInput>({
    resolver: zodResolver(updateResearchSummarySchema),
    defaultValues: {
      researchId,
      summary: summary ?? "",
    },
  });

  async function onSubmit(data: UpdateResearchSummaryInput) {
    form.clearErrors("form");

    const result = await updateResearchSummary(data);

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
          {...form.register("summary")}
          label="Summary"
          placeholder="Write what you learned and concluded from this research..."
        />

        <FormError>{form.formState.errors.form?.message}</FormError>
      </DialogPanel>

      <DialogFooter variant="bare">
        <DialogClose render={<Button variant="ghost" />}>Cancel</DialogClose>

        <Button loading={form.formState.isSubmitting} type="submit">
          {summary ? "Save" : "Add"}
        </Button>
      </DialogFooter>
    </Form>
  );
}
