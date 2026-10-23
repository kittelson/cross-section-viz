import { useAtom } from 'jotai';
import { Ruler } from 'lucide-react';
import { Link } from 'react-router-dom';
import { roadwayWidthFtAtom } from '@/atoms';
import { Button } from '@/components/ui/button';
import { Field, FieldLabel } from '@/components/ui/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from '@/components/ui/input-group';
import existingCrossSection from '@/images/streetmixPlaceholders/existing.png';
import { paths } from '@/paths';

export function ExistingCrossSectionPage() {
  const [width, setWidth] = useAtom(roadwayWidthFtAtom);

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="text-2xl font-semibold tracking-tight">
        Existing Cross Section
      </h1>
      <p className="mt-2 text-muted-foreground">
        Use the widgets below to build your existing cross section.
      </p>
      <div className="mt-6">
        <Field className="max-w-40">
          <FieldLabel htmlFor="roadway-width">Width</FieldLabel>
          <InputGroup>
            <InputGroupInput
              id="roadway-width"
              type="number"
              inputMode="decimal"
              min={1}
              step="any"
              value={width ?? ''}
              onChange={(event) => {
                const value = event.target.value;
                setWidth(value === '' ? null : Number(value));
              }}
            />
            <InputGroupAddon>
              <Ruler aria-hidden />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">
              <InputGroupText>ft</InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </Field>
      </div>
      <img
        src={existingCrossSection}
        alt="Existing roadway cross section"
        className="mt-6 w-full"
      />
      <div className="mt-8">
        <Button asChild>
          <Link to={paths.projectDetails}>Continue</Link>
        </Button>
      </div>
    </div>
  );
}
