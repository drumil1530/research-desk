import { Field, FieldError, FieldLabel } from "@/coss/ui/field";
import { Input } from "@/coss/ui/input";

type FormTextFieldProps = React.ComponentProps<typeof Input> & {
  label: string;
};

export default function FormTextField({
  name,
  label,
  type = "text",
  ...props
}: FormTextFieldProps) {
  return (
    <Field name={name}>
      <FieldLabel>{label}</FieldLabel>
      <Input name={name} type={type} {...props} />
      <FieldError />
    </Field>
  );
}
