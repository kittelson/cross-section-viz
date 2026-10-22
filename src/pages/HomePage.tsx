import { Link } from 'react-router-dom';
import { BlueLink } from '@/components/BlueLink';
import { Button } from '@/components/ui/button';
import { paths } from '@/paths';

export function HomePage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-semibold tracking-tight text-balance">
        MassDOT Cross Section Reallocation Tool
      </h1>
      <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
        <p>
          Streets make up more than 80 percent of public space in cities and
          towns. From one edge of the right-of-way to the other, planners,
          engineers, and community groups are coming together to decide how they
          want to allocate this precious resource.
        </p>
        <p>
          The MassDOT Cross Section Reallocation Tool lets you design multiple
          roadway alternatives using StreetMix. Then, the tool compares how each
          alternative influences not just transportation outcomes, but
          livability, economic and environmental health, equity, and many other
          concerns. Based on research report{' '}
          <BlueLink
            href="https://www.nationalacademies.org/publications/26788"
            target="_blank"
            rel="noreferrer"
          >
            NCHRP 1036 - Roadway Cross Section Reallocation: A Guide
          </BlueLink>
          .
        </p>
      </div>
      <Button asChild className="mt-8">
        <Link to={paths.existingCrossSection}>Start Analysis</Link>
      </Button>
    </div>
  );
}
