"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import FormError from "@/components/form/form-error";
import FormTextField from "@/components/form/form-text-field";
import { Button } from "@/coss/ui/button";
import { Form } from "@/coss/ui/form";
import { setFormErrors, toFormErrors } from "@/shared/utils/form";

import { signUp } from "../actions/sign-up";
import { signUpSchema, type SignUpInput } from "../schemas/auth.schema";

export default function SignUpForm() {
  const form = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const errors = toFormErrors(form.formState.errors);

  async function onSubmit(data: SignUpInput) {
    form.clearErrors("form");

    const result = await signUp(data);

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
  }

  return (
    <Form
      className="flex w-full flex-col gap-5"
      errors={errors}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FormTextField
        {...form.register("name")}
        label="Name"
        placeholder="Your name"
        autoComplete="name"
      />

      <FormTextField
        {...form.register("email")}
        label="Email"
        placeholder="you@example.com"
        type="email"
        autoComplete="email"
      />

      <FormTextField
        {...form.register("password")}
        label="Password"
        placeholder="Create a password"
        type="password"
        autoComplete="new-password"
      />

      <FormError>{form.formState.errors.form?.message}</FormError>

      <Button className="w-full" loading={form.formState.isSubmitting} type="submit">
        Create account
      </Button>
    </Form>
  );
}
