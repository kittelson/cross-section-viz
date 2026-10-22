import { NavLink, Outlet } from 'react-router-dom';
import { Stepper } from '@/components/layout/Stepper';
import { cn } from '@/lib/utils';
import { paths } from '@/paths';

export function AppLayout() {
  return (
    <div className="flex min-h-svh flex-col bg-muted/40">
      <header className="bg-primary text-primary-foreground shadow-sm">
        <div className="flex h-14 items-center justify-between px-6">
          <span className="text-lg font-semibold tracking-tight">
            MassDOT Cross Section Reallocation Tool
          </span>
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
      </header>
      <div className="flex flex-1">
        <aside className="w-64 shrink-0 border-r bg-card px-5 py-8">
          <Stepper />
        </aside>
        <main className="flex-1 px-6 py-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
