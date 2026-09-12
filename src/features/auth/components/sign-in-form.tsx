"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import FormError from "@/components/form/form-error";
import FormTextField from "@/components/form/form-text-field";
import { Button } from "@/coss/ui/button";
import { Form } from "@/coss/ui/form";
import { setFormErrors, toFormErrors } from "@/shared/utils/form";

import signIn from "../actions/sign-in";
import { signInSchema, type SignInInput } from "../schemas";

export default function SignInForm() {
  const form = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: SignInInput) {
    form.clearErrors("form");

    const result = await signIn(data);

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
      errors={toFormErrors(form.formState.errors)}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FormTextField
        {...form.register("email")}
        label="Email"
        placeholder="you@example.com"
        autoComplete="email"
        type="email"
      />

      <FormTextField
        {...form.register("password")}
        label="Password"
        placeholder="Your password"
        autoComplete="current-password"
        type="password"
      />

      <FormError>{form.formState.errors.form?.message}</FormError>

      <Button className="w-full" loading={form.formState.isSubmitting} type="submit">
        Sign in
      </Button>
    </Form>
  );
}
