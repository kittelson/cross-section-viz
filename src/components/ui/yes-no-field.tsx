import { RadioGroupField } from '@/components/ui/radio-group-field';

const yesNoOptions = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
] as const;

export function YesNoField({
  name,
  label,
  tooltip,
  value,
  invalid = false,
  error,
  onChange,
}: {
  name: string;
  label: string;
  tooltip?: string;
  value: boolean;
  invalid?: boolean;
  error?: { message?: string };
  onChange: (value: boolean) => void;
}) {
  return (
    <RadioGroupField
      name={name}
      label={label}
      tooltip={tooltip}
      value={value ? 'yes' : 'no'}
      invalid={invalid}
      error={error}
      options={yesNoOptions}
      onChange={(nextValue) => onChange(nextValue === 'yes')}
    />
  );
}
