import type { RouteObject } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { paths } from '@/paths';
import { AboutPage } from '@/pages/AboutPage';
import { EditCrossSectionPage } from '@/pages/EditCrossSectionPage';
import { ExistingCrossSectionPage } from '@/pages/ExistingCrossSectionPage';
import { HomePage } from '@/pages/HomePage';
import { MinSafeDimensionPage } from '@/pages/MinSafeDimensionPage';
import { OutputPage } from '@/pages/OutputPage';
import { ProjectDetailsPage } from '@/pages/ProjectDetailsPage';

export { paths };

export const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/';

export const routes: RouteObject[] = [
  {
    Component: AppLayout,
    children: [
      { path: paths.home, Component: HomePage },
      { path: paths.about, Component: AboutPage },
      {
        path: paths.existingCrossSection,
        Component: ExistingCrossSectionPage,
      },
      { path: paths.projectDetails, Component: ProjectDetailsPage },
      { path: paths.minSafeDimension, Component: MinSafeDimensionPage },
      { path: paths.editCrossSection, Component: EditCrossSectionPage },
      { path: paths.output, Component: OutputPage },
    ],
  },
];
