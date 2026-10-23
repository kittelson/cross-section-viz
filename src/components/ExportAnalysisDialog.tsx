import { Download, Save } from 'lucide-react';
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

export function ExportAnalysisDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors hover:bg-white/15"
        >
          <Save className="size-4" />
          Export Analysis
        </button>
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
            Download .cross
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
