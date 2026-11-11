import { cn } from 'cn';
import { InfoTooltip } from '@/components/InfoTooltip';
import { Checkbox } from '@/components/ui/checkbox';
import { Field, FieldError } from '@/components/ui/field';

export function CheckboxField({
  name,
  label,
  tooltip,
  description,
  value,
  invalid = false,
  error,
  className,
  onChange,
}: {
  name: string;
  label?: string;
  tooltip?: string;
  description?: string;
  value: boolean;
  invalid?: boolean;
  error?: { message?: string };
  className?: string;
  onChange: (value: boolean) => void;
}) {
  const descriptionId = description ? `${name}-description` : undefined;

  return (
    <div className={cn('relative w-full', className)}>
      <label htmlFor={name} className="absolute inset-0 cursor-pointer">
        <span className="sr-only">{label ?? name}</span>
      </label>
      <div className="pointer-events-none relative z-10">
        <Field
          orientation="horizontal"
          className="justify-between"
          data-invalid={invalid}
        >
          {label ? (
            <span className="flex w-fit items-center gap-2 text-sm leading-none font-medium">
              {label}
              {tooltip ? (
                <span
                  className="pointer-events-auto"
                  onClick={(event) => event.preventDefault()}
                >
                  <InfoTooltip label={label}>{tooltip}</InfoTooltip>
                </span>
              ) : null}
            </span>
          ) : null}
          <span className="pointer-events-auto">
            <Checkbox
              id={name}
              label={label}
              checked={value}
              onCheckedChange={(checked) => onChange(checked === true)}
              aria-invalid={invalid}
              aria-describedby={descriptionId}
            />
          </span>
          {invalid && <FieldError errors={[error]} />}
        </Field>
        {description ? (
          <p id={descriptionId} className="mt-2 text-sm text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
