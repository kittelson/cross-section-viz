import { Upload } from 'lucide-react';
import type { VariantProps } from 'class-variance-authority';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export function ImportAnalysisDialog({
  triggerSize,
  triggerClassName,
}: {
  triggerSize?: VariantProps<typeof buttonVariants>['size'];
  triggerClassName?: string;
} = {}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size={triggerSize}
          className={triggerClassName}
        >
          Import analysis
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Import</DialogTitle>
          <DialogDescription>
            Upload a <span className="font-mono">.cross</span> file that
            contains a previously saved analysis.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="button" onClick={() => alert('Coming soon')}>
            <Upload />
            Upload .cross
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
