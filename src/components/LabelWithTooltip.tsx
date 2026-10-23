import { InfoTooltip } from '@/components/InfoTooltip';
import { FieldLabel } from '@/components/ui/field';

export function LabelWithTooltip({
  htmlFor,
  label,
  tooltip,
}: {
  htmlFor?: string;
  label: string;
  tooltip?: string;
}) {
  return (
    <FieldLabel htmlFor={htmlFor}>
      {label}
      {tooltip ? <InfoTooltip label={label}>{tooltip}</InfoTooltip> : null}
    </FieldLabel>
  );
}
