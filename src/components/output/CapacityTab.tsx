import { FileText } from 'lucide-react';
import { CapacityForm } from '@/components/output/CapacityForm';
import { ExportAnalysisDialog } from '@/components/ExportAnalysisDialog';
import { Button } from '@/components/ui/button';

export function CapacityTab() {
  return (
    <div>
      <CapacityForm />
      <div className="mt-8 flex flex-wrap items-center gap-3 border-t pt-6">
        <ExportAnalysisDialog triggerClassName="border hover:bg-muted" />
        <Button type="button" onClick={() => alert('Coming soon')}>
          <FileText />
          Generate Report
        </Button>
      </div>
    </div>
  );
}
