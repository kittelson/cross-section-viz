import { SuggestedEditsTable } from '@/components/SuggestedEditsTable';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export function SuggestedEditsDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant="outline" className="w-full">
          Suggested Cross Section Edits
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-6xl">
        <DialogHeader>
          <DialogTitle>Suggested Cross Section Edits</DialogTitle>
          <DialogDescription>
            Recommended changes based on your stated project goals. Checks are
            beneficial impacts; Xs are adverse impacts.
          </DialogDescription>
        </DialogHeader>
        <SuggestedEditsTable />
      </DialogContent>
    </Dialog>
  );
}
