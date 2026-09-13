import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";

import { Button } from "@/coss/ui/button";
import { Field, FieldError, FieldLabel } from "@/coss/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/coss/ui/input-group";

type PasswordInputProps = React.ComponentProps<typeof InputGroupInput> & {
  label: string;
};

export default function PasswordInput({ name, label, ...props }: PasswordInputProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Field name={name}>
      <FieldLabel>{label}</FieldLabel>
      <InputGroup>
        <InputGroupInput name={name} type={isOpen ? "text" : "password"} {...props} />
        <InputGroupAddon align="inline-end">
          <Button
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            size="icon-xs"
            variant="ghost"
          >
            {isOpen ? <Eye /> : <EyeClosed />}
          </Button>
        </InputGroupAddon>
      </InputGroup>
      <FieldError />
    </Field>
  );
}
