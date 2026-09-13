"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { InfoIcon, Pencil, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/coss/ui/button";
import { Field } from "@/coss/ui/field";
import { Form } from "@/coss/ui/form";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/coss/ui/input-group";
import { Popover, PopoverPopup, PopoverTrigger } from "@/coss/ui/popover";
import { setFormErrors, toFormErrors } from "@/shared/utils/form";

import updateUser from "../actions/update-user";
import { type UpdateUserInput, updateUserSchema } from "../schemas";

type NameFieldProps = {
  name: string;
};

export default function NameField({ name }: NameFieldProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="space-y-1">
      <div className="flex gap-1 items-center text-sm font-medium">
        <span>Name</span>
        <Button
          onClick={() => setIsEditing(!isEditing)}
          variant="ghost"
          size="icon-xs"
          className="[&>svg]:size-3.5!"
        >
          {isEditing ? <X /> : <Pencil />}
        </Button>
      </div>
      {!isEditing ? (
        <p className="text-muted-foreground text-sm leading-6.5">{name}</p>
      ) : (
        <UpdateForm name={name} onSuccess={() => setIsEditing(false)} />
      )}
    </div>
  );
}

type UpdateFormProps = {
  name: string;
  onSuccess: () => void;
};

function UpdateForm({ name, onSuccess }: UpdateFormProps) {
  const form = useForm({
    resolver: zodResolver(updateUserSchema),
    defaultValues: { name },
  });

  async function onSubmit(data: UpdateUserInput) {
    form.clearErrors("form");
    const result = await updateUser(data);

    if (!result.success) {
      switch (result.error.type) {
        case "validation":
          setFormErrors(form.setError, result.error.fieldErrors);
          break;

        case "auth":
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
    <Form errors={toFormErrors(form.formState.errors)} onSubmit={form.handleSubmit(onSubmit)}>
      <Field name="name">
        <InputGroup className="max-w-64 border-0 bg-transparent! shadow-none before:shadow-none! ring-0!">
          <InputGroupInput
            {...form.register("name")}
            className="text-muted-foreground text-sm *:px-0"
            size="sm"
            unstyled
            disabled={form.formState.isSubmitting}
          />

          <InputGroupAddon align="inline-end">
            <Popover>
              <PopoverTrigger
                openOnHover
                render={<Button aria-label="Name saving guide" size="icon-xs" variant="ghost" />}
              >
                <InfoIcon />
              </PopoverTrigger>
              <PopoverPopup side="top" tooltipStyle>
                <p>Press Enter to save</p>
              </PopoverPopup>
            </Popover>
          </InputGroupAddon>
        </InputGroup>
      </Field>
    </Form>
  );
}
