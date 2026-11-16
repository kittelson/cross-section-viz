import { useSelector } from '../store/hooks.js'
import { ErrorBoundary } from '../util/ErrorBoundary.js'

// Import all dialogs here
import { AboutDialog } from './About'
import { AnalyticsDialog } from './Analytics'
import { GeotagDialog } from './Geotag'
import { SaveAsImageDialog } from './SaveAsImage'
import { SettingsDialog } from './Settings'
import { ErrorDialog } from './ErrorDialog.js'

const DIALOG_COMPONENTS = {
  ABOUT: AboutDialog,
  ANALYTICS: AnalyticsDialog,
  GEOTAG: GeotagDialog,
  SAVE_AS_IMAGE: SaveAsImageDialog,
  SETTINGS: SettingsDialog,
}

export function DialogRoot() {
  const name = useSelector((state) => state.dialogs.name)

  // Bail if no dialog name is provided
  if (name === null) return null

  // Get the dialog we want, then render it
  const Dialog = DIALOG_COMPONENTS[name as keyof typeof DIALOG_COMPONENTS]

  // Wrap Dialog with an ErrorBoundary wrapper to catch errors
  return (
    <ErrorBoundary fallbackComponent={<ErrorDialog />}>
      {/* @ts-expect-error TS2741 vendored streetmix, fix during cleanup */}
      <Dialog />
    </ErrorBoundary>
  )
}
