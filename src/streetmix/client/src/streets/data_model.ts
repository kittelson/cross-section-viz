import { segmentsChanged } from '../segments/view.js'
import store from '../store'
import { setUpdateTime, updateEditCount } from '../store/slices/street.js'
import { createNewUndoIfNecessary } from './undo_stack.js'

import type {
  SliceItemForServerTransmission,
  StreetState,
} from '@/streetmix/packages/types/src'

let _lastStreet: Partial<StreetState>

export function setLastStreet() {
  _lastStreet = trimStreetData(store.getState().street)
}

export function setUpdateTimeToNow() {
  const updateTime = new Date().toISOString()
  store.dispatch(setUpdateTime(updateTime))
}

let ignoreStreetChanges = false

export function setIgnoreStreetChanges(value: boolean) {
  ignoreStreetChanges = value
}

export function recordStreetChanges(force = false) {
  if (ignoreStreetChanges) {
    return
  }

  const street = store.getState().street
  const currentData = trimStreetData(street)

  if (
    JSON.stringify(currentData) !== JSON.stringify(_lastStreet) ||
    force === true
  ) {
    if (street.editCount !== null) {
      store.dispatch(updateEditCount(street.editCount + 1))
    }
    setUpdateTimeToNow()

    // Some parts of the UI need to know this happened to respond to it
    // TODO: figure out appropriate event name
    window.dispatchEvent(new window.CustomEvent('stmx:save_street'))

    createNewUndoIfNecessary(_lastStreet, currentData)

    _lastStreet = currentData
  }
}

// Copies only the data necessary for save/undo.
export function trimStreetData(street: StreetState): Partial<StreetState> {
  const newData: Partial<StreetState> = {
    schemaVersion: street.schemaVersion,
    showAnalytics: street.showAnalytics,
    capacitySource: street.capacitySource,
    width: street.width,
    name: street.name,
    id: street.id,
    namespacedId: street.namespacedId,
    creatorId: street.creatorId,
    originalStreetId: street.originalStreetId,
    units: street.units,
    location: street.location,
    userUpdated: street.userUpdated,
    skybox: street.skybox,
    weather: street.weather,
    boundary: street.boundary,
    // @ts-expect-error TS2322 vendored streetmix, fix during cleanup
    segments: street.segments.map((s) => {
      // TODO: don't manually copy, just delete the properties that don't exist?
      const slice: SliceItemForServerTransmission = {
        id: s.id,
        type: s.type,
        variantString: s.variantString,
        width: s.width,
        elevation: s.elevation,
        // Clear slope values when off, don't retain between sessions.
        slope: s.slope.on ? s.slope : { on: false, values: [] },
        label: s.label,
      }

      if (s.elevationChanged === true) {
        slice.elevationChanged = true
      }

      return slice
    }),
  }

  if (street.editCount !== null) {
    newData.editCount = street.editCount
  }

  return newData
}

export function updateEverything() {
  setIgnoreStreetChanges(true)
  segmentsChanged()
  setIgnoreStreetChanges(false)

  setLastStreet()
}
