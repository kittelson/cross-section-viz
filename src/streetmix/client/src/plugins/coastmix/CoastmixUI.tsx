import { CoastalFloodingPanel } from '@/streetmix/client/src/plugins/coastmix'
import { useSelector } from '@/streetmix/client/src/store/hooks.js'
import { FloodingDebugOverlay } from './FloodingDebugOverlay.js'
import './CoastmixUI.css'

export function CoastmixUI() {
  const coastmixMode = useSelector((state) => state.flags.COASTMIX_MODE.value)

  if (!coastmixMode) return null

  return (
    <>
      <FloodingDebugOverlay on={false} />
      <CoastalFloodingPanel />
    </>
  )
}
