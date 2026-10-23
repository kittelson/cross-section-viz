import { LabelWithTooltip } from '@/components/LabelWithTooltip';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

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
    <Field data-invalid={invalid}>
      <LabelWithTooltip label={label} tooltip={tooltip} />
      <RadioGroup
        value={value ? 'yes' : 'no'}
        onValueChange={(nextValue) => onChange(nextValue === 'yes')}
        className="flex w-auto flex-row gap-6"
      >
        <div className="flex items-center gap-2">
          <RadioGroupItem value="yes" id={`${name}-yes`} />
          <FieldLabel htmlFor={`${name}-yes`} className="font-normal">
            Yes
          </FieldLabel>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="no" id={`${name}-no`} />
          <FieldLabel htmlFor={`${name}-no`} className="font-normal">
            No
          </FieldLabel>
        </div>
      </RadioGroup>
      {invalid && <FieldError errors={[error]} />}
    </Field>
  );
}
