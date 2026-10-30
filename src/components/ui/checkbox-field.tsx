import { LabelWithTooltip } from '@/components/LabelWithTooltip';
import { Checkbox } from '@/components/ui/checkbox';
import { Field, FieldError } from '@/components/ui/field';

export function CheckboxField({
  name,
  label,
  tooltip,
  value,
  invalid = false,
  error,
  onChange,
}: {
  name: string;
  label?: string;
  tooltip?: string;
  value: boolean;
  invalid?: boolean;
  error?: { message?: string };
  onChange: (value: boolean) => void;
}) {
  return (
    <Field
      orientation="horizontal"
      className="justify-between"
      data-invalid={invalid}
    >
      {label ? (
        <LabelWithTooltip htmlFor={name} label={label} tooltip={tooltip} />
      ) : null}
      <Checkbox
        id={name}
        label={label}
        checked={value}
        onCheckedChange={(checked) => onChange(checked === true)}
        aria-invalid={invalid}
      />
      {invalid && <FieldError errors={[error]} />}
    </Field>
  );
}
