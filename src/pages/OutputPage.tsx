import { CapacityTab } from '@/components/output/CapacityTab';
import { ComparisonTab } from '@/components/output/ComparisonTab';
import { ImpactsTab } from '@/components/output/ImpactsTab';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function OutputPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="text-2xl font-semibold tracking-tight">Output</h1>
      <Tabs defaultValue="comparison" className="mt-6">
        <TabsList>
          <TabsTrigger value="comparison">Comparison</TabsTrigger>
          <TabsTrigger value="impacts">Impacts</TabsTrigger>
          <TabsTrigger value="capacity">Capacity</TabsTrigger>
        </TabsList>
        <TabsContent value="comparison" className="mt-6">
          <ComparisonTab />
        </TabsContent>
        <TabsContent value="impacts" className="mt-6">
          <ImpactsTab />
        </TabsContent>
        <TabsContent value="capacity" className="mt-6">
          <CapacityTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
