import { BlueLink } from '@/components/BlueLink';
import flowchart1036 from '@/images/flowchart1036.jpg';

export function LearnMoreSection() {
  return (
    <section className="mt-16 border-t pt-12 text-base leading-relaxed text-muted-foreground sm:mt-24 sm:pt-16">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Improve Outcomes on Your Street
        </h2>
        <p>
          Streets make up more than 80 percent of public space in cities and
          towns. From one edge of the right-of-way to the other, planners,
          engineers, and community groups are coming together to decide how they
          want to allocate this precious resource.
        </p>
        <p>
          The MassDOT Cross Section Reallocation Tool lets you design multiple
          roadway alternatives and visualize their impacts on traffic,
          livability, equity, economic/environmental health, and more.
        </p>
        <p>
          Based on research report{' '}
          <BlueLink
            href="https://www.nationalacademies.org/publications/26788"
            target="_blank"
            rel="noreferrer"
          >
            NCHRP 1036 - Roadway Cross Section Reallocation: A Guide
          </BlueLink>
          .
        </p>
        <div className="mt-4">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            Tool Methodology
          </h3>
          <p className="mt-2">
            This web tool walks you through the decision making process outlined
            in NCHRP 1036.
          </p>
          <img
            src={flowchart1036}
            alt="Flowchart of the NCHRP 1036 decision-making process with six steps and two paths. Step 1: Define your limits and set your goals. Step 2: Consider the context through a safety lens. Step 3 asks: Is there enough space to build a safe road? If no—work within your constraints to ensure safety—go to step 4, Overcome the physical barriers to safe road design, then continue to step 5. If yes—what do you want to achieve beyond safety?—go directly to step 5. Step 5: Develop design options, including the question: What happens when you change your cross section? Step 6: Evaluate and choose the cross section that serves your community’s vision and needs."
            className="mt-6 w-full"
          />
        </div>
      </div>
    </section>
  );
}
