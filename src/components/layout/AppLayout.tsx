import { NavLink, Outlet } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { paths } from '@/routes';

const navItems = [
  { to: paths.home, label: 'Home' },
  { to: paths.about, label: 'About' },
  { to: paths.existingCrossSection, label: 'Existing' },
  { to: paths.projectDetails, label: 'Project Details' },
  { to: paths.minSafeDimension, label: 'Min Safe Dimension' },
  { to: paths.editCrossSection, label: 'Edit' },
  { to: paths.output, label: 'Output' },
];

export function AppLayout() {
  return (
    <div className="flex min-h-svh flex-col bg-muted/40">
      <header className="bg-primary text-primary-foreground shadow-sm">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
          <span className="text-lg font-semibold tracking-tight">
            MassDOT Cross Section Reallocation Tool
          </span>
          <nav className="flex gap-1">
            {navItems.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end
                className={({ isActive }) =>
                  cn(
                    'rounded-md px-3 py-1.5 text-sm font-medium transition-colors hover:bg-white/15',
                    isActive && 'bg-white/20',
                  )
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-10">
        <Outlet />
      </main>
    </div>
  );
}
