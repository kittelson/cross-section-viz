import { render, screen } from '@testing-library/react';
import { Provider } from 'jotai';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { routes } from '@/routes';

function renderAt(path: string) {
  const router = createMemoryRouter(routes, { initialEntries: [path] });
  render(
    <Provider>
      <RouterProvider router={router} />
    </Provider>,
  );
}

describe('App', () => {
  it('shows an empty state on the home page', () => {
    renderAt('/');
    expect(
      screen.getByRole('heading', {
        name: 'MassDOT Cross Section Reallocation Tool',
      }),
    ).toBeInTheDocument();
  });
});
