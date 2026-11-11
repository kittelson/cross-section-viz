import { useEffect, useState } from 'react';
import { LabelWithTooltip } from '@/components/LabelWithTooltip';
import { Field, FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

function toDraft(value: number | undefined) {
  return value == null || Number.isNaN(value) ? '' : String(value);
}

export function NumberField({
  name,
  label,
  tooltip,
  value,
  invalid = false,
  error,
  onChange,
  onBlur,
  min = 0,
  max,
  step,
  inputMode = 'numeric',
  placeholder,
}: {
  name: string;
  label?: string;
  tooltip?: string;
  value?: number;
  invalid?: boolean;
  error?: { message?: string };
  onChange: (value: number | undefined) => void;
  onBlur?: () => void;
  min?: number;
  max?: number;
  step?: number | string;
  inputMode?: 'numeric' | 'decimal';
  placeholder?: string;
}) {
  const [draft, setDraft] = useState(() => toDraft(value));

  useEffect(() => {
    setDraft((current) => {
      if (value == null || Number.isNaN(value)) {
        return current !== '' && Number.isFinite(Number(current))
          ? ''
          : current;
      }
      return Number(current) !== value ? String(value) : current;
    });
  }, [value]);

  return (
    <Field data-invalid={invalid}>
      {label ? (
        <LabelWithTooltip htmlFor={name} label={label} tooltip={tooltip} />
      ) : null}
      <Input
        id={name}
        type="number"
        inputMode={inputMode}
        min={min}
        max={max}
        step={step}
        placeholder={placeholder}
        value={draft}
        onChange={(event) => {
          const nextDraft = event.target.value;
          setDraft(nextDraft);
          if (nextDraft === '') {
            onChange(undefined);
            return;
          }
          const parsed = Number(nextDraft);
          if (Number.isFinite(parsed)) {
            onChange(parsed);
          }
        }}
        onBlur={onBlur}
        aria-invalid={invalid}
      />
      {invalid && <FieldError errors={[error]} />}
    </Field>
  );
}
