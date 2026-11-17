import { LabelWithTooltip } from '@/components/LabelWithTooltip';
import { Field, FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

export function TextField({
  name,
  label,
  tooltip,
  value,
  invalid = false,
  error,
  onChange,
  placeholder,
}: {
  name: string;
  label?: string;
  tooltip?: string;
  value: string;
  invalid?: boolean;
  error?: { message?: string };
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <Field data-invalid={invalid}>
      {label ? (
        <LabelWithTooltip htmlFor={name} label={label} tooltip={tooltip} />
      ) : null}
      <Input
        id={name}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={invalid}
      />
      {invalid && <FieldError errors={[error]} />}
    </Field>
  );
}
