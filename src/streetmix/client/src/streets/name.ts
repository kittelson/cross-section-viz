import { updatePageTitle } from '../app/page_title.js'
import { observeStore, type RootState } from '../store'

/**
 * Initializes a subscriber to changes in the street name,
 * and updates various parts of the UI in response.
 */
export function initStreetNameChangeListener() {
  const select = (state: RootState) => state.street.name

  return observeStore(select, updatePageTitle)
}
