import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'jotai'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { routes } from '@/routes'

function renderAt(path: string) {
  const router = createMemoryRouter(routes, { initialEntries: [path] })
  render(
    <Provider>
      <RouterProvider router={router} />
    </Provider>,
  )
}

describe('App', () => {
  it('shows an empty state on the home page', () => {
    renderAt('/')
    expect(screen.getByText('No name submitted yet.')).toBeInTheDocument()
  })

  it('shows a validation error for a too-short name', async () => {
    const user = userEvent.setup()
    renderAt('/form')

    await user.type(screen.getByLabelText('Name'), 'A')
    await user.click(screen.getByRole('button', { name: 'Submit' }))

    expect(
      await screen.findByText('Name must be at least 2 characters.'),
    ).toBeInTheDocument()
  })

  it('stores a valid name and shows it on the home page', async () => {
    const user = userEvent.setup()
    renderAt('/form')

    await user.type(screen.getByLabelText('Name'), 'Ada')
    await user.click(screen.getByRole('button', { name: 'Submit' }))

    expect(await screen.findByText('Ada')).toBeInTheDocument()
  })
})
