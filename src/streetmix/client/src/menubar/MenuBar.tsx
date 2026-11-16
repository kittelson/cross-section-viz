import { useEffect, useRef } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import logo from '../../images/logo_horizontal.svg?url'
import AccessibleIcon from '../ui/AccessibleIcon.js'
import { Icon } from '../ui/Icon.js'
import { InstanceBadge } from './InstanceBadge.js'
import { MenuBarItem } from './MenuBarItem.js'

import './MenuBar.css'

export interface MenuCoords {
  leftMenuBarRightPos?: number
  rightMenuBarLeftPos?: number
}

interface MenuBarProps {
  onMenuDropdownClick: (menu: string, node: HTMLElement) => void
}

export function MenuBar({ onMenuDropdownClick }: MenuBarProps) {
  const menuBarRightEl = useRef<HTMLUListElement>(null)
  const menuBarLeftEl = useRef<HTMLUListElement>(null)
  const intl = useIntl()

  const languageLabel = intl.formatMessage({
    id: 'settings.language.label',
    defaultMessage: 'Language',
  })

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize)

    // StreetNameplateContainer needs to know the left position of the right
    // menu bar when it's mounted
    window.addEventListener('stmx:streetnameplate_mounted', handleWindowResize)

    // Clean up event listeners
    return () => {
      window.removeEventListener('resize', handleWindowResize)
      window.removeEventListener(
        'stmx:streetnameplate_mounted',
        handleWindowResize
      )
    }
  })

  /**
   * Handles clicks on <button> elements which result in a dropdown menu.
   * Pass in the name of this menu, and it returns (curries) a function
   * that handles the event.
   */
  function handleClick(menu: string): (event: React.MouseEvent) => void {
    return (event: React.MouseEvent) => {
      const el = (event.target as HTMLElement).closest('button')
      if (el !== null) {
        onMenuDropdownClick(menu, el)
      }
    }
  }

  function handleWindowResize(): void {
    // Throw this event so that the StreetName can figure out if it needs
    // to push itself lower than the menubar
    const rightMenuBarLeftPos =
      menuBarRightEl.current?.getBoundingClientRect().left
    const leftMenuBarRightPos =
      menuBarLeftEl.current?.getBoundingClientRect().right
    window.dispatchEvent(
      new CustomEvent<MenuCoords>('stmx:menu_bar_resized', {
        detail: {
          rightMenuBarLeftPos,
          leftMenuBarRightPos,
        },
      })
    )
  }

  return (
    <nav className="menu-bar">
      <ul className="menu-bar-left" ref={menuBarLeftEl}>
        <li className="menu-bar-title">
          <img
            src={logo}
            // eslint-disable-next-line formatjs/no-literal-string-in-jsx
            alt="Streetmix"
            className="menu-bar-logo"
            draggable={false}
          />
          {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
          <h1>Streetmix</h1>
        </li>
        <MenuBarItem id="menubar-help" onClick={handleClick('help')}>
          <FormattedMessage id="menu.item.help" defaultMessage="Help" />
        </MenuBarItem>
      </ul>
      <ul className="menu-bar-right" ref={menuBarRightEl}>
        <MenuBarItem id="menubar-share" onClick={handleClick('share')}>
          <FormattedMessage id="menu.item.share" defaultMessage="Share" />
        </MenuBarItem>
        <MenuBarItem
          id="menubar-locale"
          onClick={handleClick('locale')}
          tooltip={languageLabel}
        >
          <AccessibleIcon label={languageLabel}>
            <Icon name="language" size="18" />
          </AccessibleIcon>
        </MenuBarItem>
      </ul>
      <InstanceBadge />
    </nav>
  )
}
