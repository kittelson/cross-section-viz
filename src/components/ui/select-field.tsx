import { LabelWithTooltip } from '@/components/LabelWithTooltip';
import { Field, FieldError } from '@/components/ui/field';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type SelectOption = {
  value: string;
  label: string;
};

export function SelectField({
  name,
  label,
  tooltip,
  placeholder,
  value,
  invalid = false,
  error,
  options,
  onValueChange,
}: {
  name: string;
  label?: string;
  tooltip?: string;
  placeholder?: string;
  value: string;
  invalid?: boolean;
  error?: { message?: string };
  options: readonly SelectOption[];
  onValueChange: (value: string) => void;
}) {
  return (
    <Field data-invalid={invalid}>
      {label ? (
        <LabelWithTooltip htmlFor={name} label={label} tooltip={tooltip} />
      ) : null}
      <Select
        label={label}
        value={value || undefined}
        onValueChange={onValueChange}
      >
        <SelectTrigger id={name} className="w-full" aria-invalid={invalid}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent position="popper">
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {invalid && <FieldError errors={[error]} />}
    </Field>
  );
}
