import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createStore, Provider } from 'jotai';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { paths } from '@/paths';
import { routes } from '@/routes';

function renderAt(path: string) {
  const router = createMemoryRouter(routes, { initialEntries: [path] });
  render(
    <Provider store={createStore()}>
      <RouterProvider router={router} />
    </Provider>,
  );
}

describe('App', () => {
  it('shows the tool title on the home page', () => {
    renderAt(paths.home);
    expect(
      screen.getByRole('heading', {
        name: 'MassDOT Cross Section Reallocation Tool',
      }),
    ).toBeTruthy();
  });

  it('keeps About in the header and future steps unlinked', () => {
    renderAt(paths.home);

    expect(screen.getByRole('link', { name: 'About' })).toBeTruthy();
    expect(
      screen.queryByRole('link', { name: 'Existing Cross Section' }),
    ).toBeNull();
    expect(screen.queryByRole('link', { name: 'Project Details' })).toBeNull();
  });

  it('lets you return to completed steps but not skip ahead', async () => {
    const user = userEvent.setup();
    renderAt(paths.home);

    await user.click(screen.getByRole('link', { name: 'Start Analysis' }));

    expect(await screen.findByRole('link', { name: 'Home' })).toBeTruthy();
    expect(screen.queryByRole('link', { name: 'Project Details' })).toBeNull();

    await user.click(screen.getByRole('link', { name: 'Home' }));
    expect(
      await screen.findByRole('link', { name: 'Existing Cross Section' }),
    ).toBeTruthy();
  });
});
