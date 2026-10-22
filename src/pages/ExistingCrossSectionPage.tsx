import { zodResolver } from '@hookform/resolvers/zod';
import { useSetAtom } from 'jotai';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { submittedNameAtom } from '@/atoms';
import { paths } from '@/paths';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters.')
    .max(50, 'Name must be at most 50 characters.'),
});

type FormValues = z.infer<typeof formSchema>;

export function ExistingCrossSectionPage() {
  const setSubmittedName = useSetAtom(submittedNameAtom);
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '' },
  });

  function onSubmit(values: FormValues) {
    setSubmittedName(values.name);
    navigate(paths.home);
  }

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle>Existing Cross Section</CardTitle>
        <CardDescription>
          Submitting saves the name to jotai and returns you home.
        </CardDescription>
      </CardHeader>
      <form id="name-form" onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <CardContent>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  {...field}
                  id="name"
                  placeholder="Ada Lovelace"
                  autoComplete="name"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid ? (
                  <FieldError errors={[fieldState.error]} />
                ) : (
                  <FieldDescription>
                    Between 2 and 50 characters.
                  </FieldDescription>
                )}
              </Field>
            )}
          />
        </CardContent>
      </form>
      <CardFooter className="gap-2">
        <Button type="submit" form="name-form">
          Submit
        </Button>
        <Button type="button" variant="outline" onClick={() => form.reset()}>
          Reset
        </Button>
      </CardFooter>
    </Card>
  );
}
