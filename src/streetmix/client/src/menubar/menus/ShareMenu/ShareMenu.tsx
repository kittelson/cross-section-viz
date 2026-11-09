import Menu, { type MenuProps } from '../Menu.js'
import { PrintImage } from './PrintImage.js'
import { SaveImage } from './SaveImage.js'
import './ShareMenu.css'

export function ShareMenu(props: MenuProps) {
  return (
    <Menu className="share-menu" {...props}>
      <PrintImage />
      <SaveImage />
    </Menu>
  )
}
