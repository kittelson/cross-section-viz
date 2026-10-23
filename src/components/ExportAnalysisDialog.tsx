import { Download } from 'lucide-react';
import { ExportAnalysisButton } from '@/components/ExportAnalysisButton';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export function ExportAnalysisDialog({
  triggerClassName,
}: {
  triggerClassName?: string;
} = {}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <ExportAnalysisButton className={triggerClassName} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Save Current Analysis</DialogTitle>
          <DialogDescription>
            Save your progress as a <span className="font-mono">.cross</span>{' '}
            file, then{' '}
            <span className="font-medium text-foreground">share</span> or{' '}
            <span className="font-medium text-foreground">import</span> later.
            Anyone with your file can import it and continue the analysis.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="button" onClick={() => alert('Coming soon')}>
            <Download />
            Download file
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
