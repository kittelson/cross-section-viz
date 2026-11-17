import { formatMessage } from '../locales/locale.js'

const APP_TITLE = 'Streetmix'

/**
 * Updates page title.
 * This is called whenever the name of the street changes and it affects
 * the document title.
 */
export function updatePageTitle(name: string | null): void {
  const streetName = name ?? formatMessage('street.default-name', 'Unnamed St')

  document.title = `${streetName} – ${APP_TITLE}`
}
