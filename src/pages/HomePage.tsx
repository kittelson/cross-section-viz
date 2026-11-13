import { Link } from 'react-router-dom';
import { BlueLink } from '@/components/BlueLink';
import { ImportAnalysisDialog } from '@/components/ImportAnalysisDialog';
import { LearnMoreSection } from '@/components/LearnMoreSection';
import { Button } from '@/components/ui/button';
import { paths } from '@/paths';

const primaryActionClassName = 'h-12 px-6 text-base';

export function HomePage() {
  return (
    <div className="mx-auto max-w-3xl">
      <section className="flex min-h-[min(32rem,calc(100svh-12rem))] flex-col justify-center py-10 sm:py-16">
        <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          MassDOT Cross Section Reallocation Tool
        </h1>
        <div className="mt-4 max-w-2xl space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
          <p>
            Design roadway alternatives using{' '}
            <BlueLink
              href="https://streetmix.net"
              target="_blank"
              rel="noreferrer"
            >
              StreetMix
            </BlueLink>{' '}
            and compare their impacts.
          </p>
        </div>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button asChild size="lg" className={primaryActionClassName}>
            <Link to={paths.existingCrossSection}>New Analysis</Link>
          </Button>
          <ImportAnalysisDialog
            triggerSize="lg"
            triggerClassName={primaryActionClassName}
          />
        </div>
      </section>

      <LearnMoreSection />
    </div>
  );
}
