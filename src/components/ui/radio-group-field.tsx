import { useId } from 'react';
import { InfoTooltip } from '@/components/InfoTooltip';
import {
  Field,
  FieldError,
  FieldLabel,
  FieldTitle,
} from '@/components/ui/field';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

type RadioGroupOption = {
  label: string;
  value: string | number;
};

export function RadioGroupField({
  name,
  label,
  tooltip,
  value,
  invalid = false,
  error,
  options,
  onChange,
}: {
  name: string;
  label?: string;
  tooltip?: string;
  value: string | number;
  invalid?: boolean;
  error?: { message?: string };
  options: readonly RadioGroupOption[];
  onChange: (value: string | number) => void;
}) {
  const labelId = useId();

  return (
    <Field data-invalid={invalid}>
      {label ? (
        <FieldTitle id={labelId} className="leading-snug">
          {label}
          {tooltip ? <InfoTooltip label={label}>{tooltip}</InfoTooltip> : null}
        </FieldTitle>
      ) : null}
      <RadioGroup
        aria-labelledby={label ? labelId : undefined}
        value={String(value)}
        onValueChange={(nextValue) => {
          const selected = options.find(
            (option) => String(option.value) === nextValue,
          );
          onChange(selected?.value ?? nextValue);
        }}
        className="flex w-auto flex-row gap-6"
      >
        {options.map((option) => {
          const optionValue = String(option.value);
          const optionId = `${name}-${optionValue}`;

          return (
            <div key={optionValue} className="flex items-center gap-2">
              <RadioGroupItem
                value={optionValue}
                id={optionId}
                label={option.label}
                aria-invalid={invalid}
              />
              <FieldLabel htmlFor={optionId} className="font-normal">
                {option.label}
              </FieldLabel>
            </div>
          );
        })}
      </RadioGroup>
      {invalid && <FieldError errors={[error]} />}
    </Field>
  );
}
