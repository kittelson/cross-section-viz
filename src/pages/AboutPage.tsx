import { BlueLink } from '@/components/BlueLink';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  nchrp1036Url,
  reconstructionSpreadsheetUrl,
  repavingSpreadsheetUrl,
  sourceCodeUrl,
  massdotUrl,
} from '@/lib/links';

export function AboutPage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">
            <h1>About the Application</h1>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-base leading-relaxed text-muted-foreground">
          <p>
            The MassDOT Cross Section Reallocation Tool is a web application
            that walks through the steps of the{' '}
            <BlueLink href={nchrp1036Url} target="_blank" rel="noreferrer">
              NCHRP 1036 Roadway Cross Section Reallocation Guide
            </BlueLink>
            . The tool makes it easy to apply the NCHRP 1036 research to a given
            cross section and see how changes to the roadway would affect
            livability, economic and environmental health, equity, and other
            concerns.
          </p>
          <p>
            The web application is based on two spreadsheets developed
            previously: one on{' '}
            <BlueLink
              href={reconstructionSpreadsheetUrl}
              target="_blank"
              rel="noreferrer"
            >
              Reconstruction
            </BlueLink>{' '}
            and another on{' '}
            <BlueLink
              href={repavingSpreadsheetUrl}
              target="_blank"
              rel="noreferrer"
            >
              Repaving
            </BlueLink>
            .
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Source Code</CardTitle>
            <CardDescription>
              The source code for this application lives on GitHub.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild>
              <a href={sourceCodeUrl} target="_blank" rel="noreferrer">
                View source
              </a>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact</CardTitle>
          </CardHeader>
          <CardContent className="leading-relaxed text-muted-foreground">
            <p>
              This site was developed by Kittelson and Associates for{' '}
              <BlueLink href={massdotUrl} target="_blank" rel="noreferrer">
                MassDOT
              </BlueLink>{' '}
              in 2026. Contact the developer at{' '}
              <BlueLink href="mailto:swdev@kittelson.com?subject=MassDOT Cross Section Reallocation Tool">
                swdev@kittelson.com
              </BlueLink>
              .
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
