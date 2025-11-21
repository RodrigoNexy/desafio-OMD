import { memo } from "react";
import { Label, Input, Textarea, ErrorMessage } from "../../atoms";

interface FormFieldProps {
  label: string;
  name?: string;
  error?: string;
  type?: "text" | "email" | "password" | "date" | "textarea";
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  id?: string;
}

export const FormField = memo<FormFieldProps>(({
  label,
  name: nameProp,
  error,
  type = "text",
  required = false,
  value,
  onChange,
  onBlur,
  placeholder,
  disabled,
  id,
  ...restProps
}) => {
  // Extrair name de restProps se vier do register (prioridade)
  const fieldName = (restProps as { name?: string }).name || nameProp || "";
  const fieldId = id || fieldName;

  return (
    <div>
      <Label htmlFor={fieldId}>
        {label}
        {required && " *"}
      </Label>
      {type === "textarea" ? (
        <Textarea
          id={fieldId}
          name={fieldName}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          hasError={!!error}
          {...restProps}
        />
      ) : (
        <Input
          id={fieldId}
          name={fieldName}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          hasError={!!error}
          {...restProps}
        />
      )}
      {error && <ErrorMessage message={error} />}
    </div>
  );
});

FormField.displayName = "FormField";

