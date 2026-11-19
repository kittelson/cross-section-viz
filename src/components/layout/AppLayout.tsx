import { Link, NavLink, Outlet } from 'react-router-dom';
import Userback from '@userback/widget';
import { ExportAnalysisDialog } from '@/components/ExportAnalysisDialog';
import { Stepper } from '@/components/layout/Stepper';
import { cn } from '@/lib/utils';
import { paths } from '@/paths';

// identify your logged-in users (optional)
const options = {
  user_data: {
    id: '123456', // example data
    info: {
      name: 'someone', // example data
      email: 'someone@example.com', // example data
    },
  },
};

// initialize Userback
await Userback('A-eeYuutQIhHQAs5pegjunETiA7', options);

export function AppLayout() {
  return (
    <div className="flex min-h-svh flex-col bg-muted/40">
      <header className="bg-primary text-primary-foreground shadow-sm">
        <div className="flex h-14 items-center justify-between px-6">
          <Link to={paths.home} className="flex items-center gap-2">
            <span className="text-lg font-semibold tracking-tight hover:underline">
              MassDOT Cross Section Reallocation Tool
            </span>
          </Link>
          <div className="flex items-center gap-1">
            <ExportAnalysisDialog />
            <NavLink
              to={paths.about}
              className={({ isActive }) =>
                cn(
                  'rounded-md px-3 py-1.5 text-sm font-medium transition-colors hover:bg-white/15',
                  isActive && 'bg-white/20',
                )
              }
            >
              About
            </NavLink>
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="w-64 shrink-0 border-r bg-card px-5 py-8">
          <Stepper />
        </aside>
        <main className="flex-1 px-6 py-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
