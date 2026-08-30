import { Field, FieldError, FieldLabel } from "@/coss/ui/field";
import { Textarea } from "@/coss/ui/textarea";

type FormTextareaFieldProps = React.ComponentProps<typeof Textarea> & {
  label: string;
};

export default function FormTextareaField({
  name,
  label,
  placeholder,
  ...props
}: FormTextareaFieldProps) {
  return (
    <Field name={name}>
      <FieldLabel>{label}</FieldLabel>
      <Textarea name={name} placeholder={placeholder} {...props} />
      <FieldError />
    </Field>
  );
}
