import { useLayoutEffect, useRef } from 'react';
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
  const selectRef = useRef<HTMLDivElement>(null);
  const nativeSelectId = `${name}-native`;

  useLayoutEffect(() => {
    const nativeSelect = selectRef.current?.querySelector('select');
    if (nativeSelect) {
      nativeSelect.id = nativeSelectId;
    }
  });

  return (
    <Field data-invalid={invalid}>
      {label ? (
        <LabelWithTooltip htmlFor={name} label={label} tooltip={tooltip} />
      ) : null}
      {label ? (
        <label htmlFor={nativeSelectId} className="sr-only">
          {label}
        </label>
      ) : null}
      <div ref={selectRef}>
        <Select value={value || undefined} onValueChange={onValueChange}>
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
      </div>
      {invalid && <FieldError errors={[error]} />}
    </Field>
  );
}
