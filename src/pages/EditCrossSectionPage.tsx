import { useAtom } from 'jotai';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { projectDetailsAtom } from '@/atoms';
import { SuggestedEditsDialog } from '@/components/SuggestedEditsDialog';
import { Button } from '@/components/ui/button';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { YesNoField } from '@/components/ui/yes-no-field';
import minSafeDimension from '@/images/streetmixPlaceholders/minSafeDimension.png';
import showDetails from '@/images/streetmixPlaceholders/showDetails.png';
import tooWide from '@/images/streetmixPlaceholders/tooWide.png';
import { paths } from '@/paths';

export function EditCrossSectionPage() {
  const [projectDetails] = useAtom(projectDetailsAtom);
  const [speedLimit, setSpeedLimit] = useState(
    projectDetails.postedSpeedLimitMph || '25',
  );
  const [hasParallelBikeFacility, setHasParallelBikeFacility] = useState(false);
  const [averageDailyTraffic, setAverageDailyTraffic] = useState(
    projectDetails.averageDailyTraffic || '6000',
  );

  return (
    <div className="mx-auto max-w-7xl">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Alternative 1 - Cross Section Creator
          </h1>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>
              Now, it&apos;s your turn to create your new cross-section. First,
              view the recommended cross-section changes based on your stated
              goals on the suggestions tool to the right.
            </p>
            <p>
              Then, using the minimum safe dimension as a start, insert
              components until you meet the right-of-way.
            </p>
            <p>
              If a dimension of an element is smaller than the minimum dimension
              for that element, the text will appear red. If an element
              dimension is larger than the minimum dimension, the text will
              appear green, indicating that the element width could be reduced
              if additional space is needed. Hover over the element in your
              cross-section to see the recommended dimensions.
            </p>
            <p>
              Use the input boxes to the right to change selected project inputs
              to reflect future conditions.
            </p>
          </div>
          <Tabs defaultValue="default" className="mt-6">
            <TabsList>
              <TabsTrigger value="default">Default</TabsTrigger>
              <TabsTrigger value="show-details">Show Details</TabsTrigger>
              <TabsTrigger value="too-wide">Element too wide</TabsTrigger>
            </TabsList>
            <TabsContent value="default" className="mt-4">
              <img
                src={minSafeDimension}
                alt="Minimum safe dimension cross section"
                className="w-full"
              />
            </TabsContent>
            <TabsContent value="show-details" className="mt-4">
              <img
                src={showDetails}
                alt="Cross section with element details"
                className="w-full"
              />
            </TabsContent>
            <TabsContent value="too-wide" className="mt-4">
              <img
                src={tooWide}
                alt="Cross section with an element that is too wide"
                className="w-full"
              />
            </TabsContent>
          </Tabs>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-6 lg:self-start">
          <SuggestedEditsDialog />
          <Field>
            <FieldLabel htmlFor="edit-speed-limit">
              What is the posted speed limit?
            </FieldLabel>
            <Input
              id="edit-speed-limit"
              type="number"
              inputMode="numeric"
              min={0}
              value={speedLimit}
              onChange={(event) => setSpeedLimit(event.target.value)}
            />
          </Field>
          <YesNoField
            name="parallelBikeFacility"
            label="Is there a parallel bike facility?"
            value={hasParallelBikeFacility}
            onChange={setHasParallelBikeFacility}
          />
          <Field>
            <FieldLabel htmlFor="edit-adt">
              What is the average daily traffic?
            </FieldLabel>
            <Input
              id="edit-adt"
              type="number"
              inputMode="numeric"
              min={0}
              value={averageDailyTraffic}
              onChange={(event) => setAverageDailyTraffic(event.target.value)}
            />
          </Field>
        </aside>
      </div>
      <div className="mt-8">
        <Button asChild>
          <Link to={paths.output}>Continue</Link>
        </Button>
      </div>
    </div>
  );
}
