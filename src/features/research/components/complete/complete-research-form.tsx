"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import FormError from "@/components/form/form-error";
import FormTextAreaField from "@/components/form/form-textarea-field";
import { Button } from "@/coss/ui/button";
import { DialogClose, DialogFooter, DialogPanel } from "@/coss/ui/dialog";
import { Form } from "@/coss/ui/form";
import completeResearch from "@/features/research/actions/complete-research";
import { completeResearchSchema, type CompleteResearchInput } from "@/features/research/schemas";
import { setFormErrors, toFormErrors } from "@/shared/utils/form";

type CompleteResearchFormProps = {
  researchId: string;
  summary: string | null;
  onSuccess: () => void;
};

export default function CompleteResearchForm({
  researchId,
  summary,
  onSuccess,
}: CompleteResearchFormProps) {
  const form = useForm<CompleteResearchInput>({
    resolver: zodResolver(completeResearchSchema),
    defaultValues: {
      researchId,
      summary: summary ?? "",
    },
  });

  async function onSubmit(data: CompleteResearchInput) {
    form.clearErrors("form");

    const result = await completeResearch(data);

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
          placeholder="What did you learn?"
        />

        <FormError>{form.formState.errors.form?.message}</FormError>
      </DialogPanel>

      <DialogFooter variant="bare">
        <DialogClose render={<Button variant="ghost" />}>Cancel</DialogClose>

        <Button loading={form.formState.isSubmitting} type="submit">
          Complete
        </Button>
      </DialogFooter>
    </Form>
  );
}
