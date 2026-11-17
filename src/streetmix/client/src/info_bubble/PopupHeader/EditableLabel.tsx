import { Icon } from '@/streetmix/client/src/ui/Icon.js'
import './EditableLabel.css'

import type { SectionType } from '@/streetmix/packages/types/src'

interface EditableLabelProps {
  readonly label: string | React.JSX.Element
  readonly type: SectionType
  readonly handleClickEdit: React.MouseEventHandler
}

export function EditableLabel({
  label,
  type,
  handleClickEdit,
}: EditableLabelProps) {
  // Boundary labels are not currently editable, so labels are not interactive
  if (type === 'boundary') {
    return <h3 className="popup-label">{label}</h3>
  }

  return (
    <h3 className="popup-label popup-label-editable" onClick={handleClickEdit}>
      {label}
      <Icon name="edit" size="18" className="popup-label-editable-icon" />
    </h3>
  )
}
