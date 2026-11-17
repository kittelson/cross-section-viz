import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

function scrollToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
}

export function BottomNavButtons({
  backTo,
  continueTo,
  continueSubmit = false,
  continueDisabled = false,
}: {
  backTo?: string;
  continueTo?: string;
  continueSubmit?: boolean;
  continueDisabled?: boolean;
}) {
  return (
    <div className="mt-8 flex gap-2">
      {backTo ? (
        <Button asChild variant="outline">
          <Link to={backTo} onClick={scrollToTop}>
            Back
          </Link>
        </Button>
      ) : null}
      {continueTo ? (
        continueDisabled ? (
          <Button type="button" disabled>
            Continue
          </Button>
        ) : (
          <Button asChild>
            <Link to={continueTo} onClick={scrollToTop}>
              Continue
            </Link>
          </Button>
        )
      ) : continueSubmit ? (
        <Button type="submit" disabled={continueDisabled} onClick={scrollToTop}>
          Continue
        </Button>
      ) : null}
    </div>
  );
}
