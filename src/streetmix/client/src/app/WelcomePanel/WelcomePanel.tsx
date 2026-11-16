import { useEffect, useCallback } from 'react'

import { useSelector, useDispatch } from '@/streetmix/client/src/store/hooks.js'
import {
  setWelcomePanelVisible,
  setWelcomePanelDismissed,
} from '@/streetmix/client/src/store/slices/ui.js'
import { CloseButton } from '@/streetmix/client/src/ui/CloseButton.js'
import { registerKeypress, deregisterKeypress } from '../keypress.js'
import { getIsReturningUser, setIsReturningUser } from './localstorage.js'
import { FirstTimeNewStreet } from './FirstTimeNewStreet.js'
import { WelcomeNewStreet } from './WelcomeNewStreet.js'
import './WelcomePanel.css'

const WELCOME_NONE = 0
const WELCOME_NEW_STREET = 1
const WELCOME_FIRST_TIME_NEW_STREET = 2

function determineWelcomeType(): number {
  return getIsReturningUser()
    ? WELCOME_NEW_STREET
    : WELCOME_FIRST_TIME_NEW_STREET
}

export function WelcomePanel() {
  const { readOnly } = useSelector((state) => state.app)
  const { welcomePanelVisible: isVisible, welcomePanelDismissed: isDismissed } =
    useSelector((state) => state.ui)
  const dispatch = useDispatch()

  // Determine what type of welcome panel to show
  const type = determineWelcomeType()

  // Handler function is a callback to prevent re-running effects
  const handleDismissed = useCallback(() => {
    setIsReturningUser()
    dispatch(setWelcomePanelDismissed())
  }, [dispatch])

  // Figure out what to display inside the panel
  let content
  switch (type) {
    case WELCOME_FIRST_TIME_NEW_STREET:
      content = <FirstTimeNewStreet />
      break
    case WELCOME_NEW_STREET:
      content = <WelcomeNewStreet handleDismiss={handleDismissed} />
      break
    case WELCOME_NONE:
    default:
      content = null
      break
  }

  // Do not show under the following conditions:
  // If app is read-only
  // If user has dismissed the panel this session
  // If the welcome type is `WELCOME_NONE`
  // If there is no content to show
  //
  // When rendering, the dispatch call below affects the state of another
  // component (`StreetNameplateContainer`), which throws an error in React.
  // This is considered a bug, despite the functionality behaving as expected.
  // The fix is to wrap this in `useEffect` so that the dispatch call occurs
  // after the render is done. For more information see the discussion at
  // https://github.com/streetmix/streetmix/issues/2324
  useEffect(() => {
    if (!readOnly && !isDismissed && type !== WELCOME_NONE) {
      dispatch(setWelcomePanelVisible(true))
    } else if (readOnly || isDismissed || content === null) {
      dispatch(setWelcomePanelVisible(false))
    }
  }, [readOnly, isDismissed, type, content, dispatch])

  // Set up and tear down when a welcome panel is shown
  useEffect(() => {
    if (!isVisible) return

    // Hide welcome panel on certain events
    // TODO: Consider dispatching from elsewhere, and not via event listeners
    window.addEventListener('stmx:save_street', handleDismissed)

    // Hide welcome panel when someone presses Escape
    registerKeypress('esc', handleDismissed)

    return () => {
      // Clean up event listeners
      window.removeEventListener('stmx:save_street', handleDismissed)
      deregisterKeypress('esc', handleDismissed)
    }
  }, [isVisible, handleDismissed])

  if (!isVisible) {
    return null
  }

  return (
    <div className="welcome-panel-container">
      <div className="welcome-panel">
        <CloseButton onClick={handleDismissed} />
        {content}
      </div>
    </div>
  )
}
