import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function BottomNavButtons({
  backTo,
  continueTo,
  continueSubmit = false,
}: {
  backTo?: string;
  continueTo?: string;
  continueSubmit?: boolean;
}) {
  return (
    <div className="mt-8 flex gap-2">
      {backTo ? (
        <Button asChild variant="outline">
          <Link to={backTo}>Back</Link>
        </Button>
      ) : null}
      {continueTo ? (
        <Button asChild>
          <Link to={continueTo}>Continue</Link>
        </Button>
      ) : continueSubmit ? (
        <Button type="submit">Continue</Button>
      ) : null}
    </div>
  );
}
