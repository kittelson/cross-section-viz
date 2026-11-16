import { FormattedMessage } from 'react-intl'

import logo from '@/streetmix/client/images/logo_horizontal.svg?url'
import { ExternalLink } from '@/streetmix/client/src/ui/ExternalLink.js'
import { Dialog } from '../Dialog.js'
import './AboutDialog.css'

/* Too many false positives in this module. Check all strings manually. */
/* eslint-disable formatjs/no-literal-string-in-jsx */

export function AboutDialog() {
  return (
    <Dialog>
      {(closeDialog) => (
        <div className="about-dialog">
          <div className="dialog-content dialog-content-bleed">
            <header>
              <img
                src={logo}
                alt="Streetmix (logo)"
                className="about-dialog-logo"
                draggable={false}
              />
              <h1>
                <FormattedMessage
                  id="dialogs.about.heading"
                  defaultMessage="About Streetmix."
                />
              </h1>
            </header>
            <div className="about-dialog-content">
              <div className="about-dialog-left">
                <p>
                  <FormattedMessage
                    id="dialogs.about.description"
                    defaultMessage="Design, remix, and share your street. Add bike paths, widen sidewalks or traffic lanes, learn how all of this can impact your community."
                  />
                </p>
                <p>
                  This editor is based on{' '}
                  <ExternalLink href="https://github.com/streetmix/streetmix">
                    Streetmix
                  </ExternalLink>
                  , © Streetmix contributors, and is distributed under the{' '}
                  <ExternalLink href="https://www.gnu.org/licenses/agpl-3.0.html">
                    GNU Affero General Public License v3.0
                  </ExternalLink>
                  .
                </p>
                <p>
                  It is provided without any warranty, to the extent permitted
                  by law. See the license for details.
                </p>
              </div>
              <div className="about-dialog-right">
                <div>
                  <div>
                    <h3>
                      <FormattedMessage
                        id="dialogs.about.acknowledgements"
                        defaultMessage="Acknowledgements"
                      />
                    </h3>
                    <ul>
                      <li>
                        <FormattedMessage
                          id="dialogs.about.font-designed-by"
                          defaultMessage="{fontName} font designed by {fontAuthor}."
                          values={{
                            fontName: (
                              <ExternalLink href="https://manropefont.com/">
                                Manrope
                              </ExternalLink>
                            ),
                            fontAuthor: (
                              <ExternalLink href="https://gent.media/">
                                Mikhail Shiranda
                              </ExternalLink>
                            ),
                          }}
                        />{' '}
                        <FormattedMessage
                          id="dialogs.about.license-label"
                          defaultMessage="(<a>License</a>)"
                          values={{
                            a: (chunks) => (
                              <ExternalLink
                                href="https://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL"
                                title="SIL Open Font License, Version 1.1"
                              >
                                {chunks}
                              </ExternalLink>
                            ),
                          }}
                        />
                      </li>
                      <li>
                        <FormattedMessage
                          id="dialogs.about.font-designed-by"
                          defaultMessage="{fontName} font designed by {fontAuthor}."
                          values={{
                            fontName: (
                              <ExternalLink href="https://hubertfischer.com/work/type-rubik">
                                Rubik
                              </ExternalLink>
                            ),
                            fontAuthor: (
                              <ExternalLink href="https://hubertfischer.com/">
                                Hubert & Fischer
                              </ExternalLink>
                            ),
                          }}
                        />{' '}
                        <FormattedMessage
                          id="dialogs.about.license-label"
                          defaultMessage="(<a>License</a>)"
                          values={{
                            a: (chunks) => (
                              <ExternalLink
                                href="https://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL"
                                title="SIL Open Font License, Version 1.1"
                              >
                                {chunks}
                              </ExternalLink>
                            ),
                          }}
                        />
                      </li>
                      <li>
                        <FormattedMessage
                          id="dialogs.about.font-designed-by"
                          defaultMessage="{fontName} font designed by {fontAuthor}."
                          values={{
                            fontName: (
                              <ExternalLink href="https://delvefonts.com/fonts/overpass/">
                                Overpass
                              </ExternalLink>
                            ),
                            fontAuthor: (
                              <ExternalLink href="https://delvefonts.com/">
                                Delve Fonts
                              </ExternalLink>
                            ),
                          }}
                        />{' '}
                        <FormattedMessage
                          id="dialogs.about.license-label"
                          defaultMessage="(<a>License</a>)"
                          values={{
                            a: (chunks) => (
                              <ExternalLink
                                href="https://github.com/RedHatOfficial/Overpass/blob/master/OFL.txt"
                                title="SIL Open Font License, Version 1.1"
                              >
                                {chunks}
                              </ExternalLink>
                            ),
                          }}
                        />
                      </li>
                      <li>
                        <FormattedMessage
                          id="dialogs.about.icons-by"
                          defaultMessage="Icons by {author}."
                          values={{
                            author: (
                              <>
                                <ExternalLink href="https://tabler.io/icons">
                                  Tabler
                                </ExternalLink>
                                ,{' '}
                                <ExternalLink href="https://fontawesome.com/">
                                  Font Awesome
                                </ExternalLink>
                              </>
                            ),
                          }}
                        />{' '}
                        <FormattedMessage
                          id="dialogs.about.license-label"
                          defaultMessage="(<a>License</a>)"
                          values={{
                            a: (chunks) => (
                              <ExternalLink
                                href="https://fontawesome.com/license/free"
                                title="Creative Commons Share Alike License 4.0 (CC BY-SA 4.0)"
                              >
                                {chunks}
                              </ExternalLink>
                            ),
                          }}
                        />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button className="dialog-primary-action" onClick={closeDialog}>
            <FormattedMessage id="btn.close" defaultMessage="Close" />
          </button>
        </div>
      )}
    </Dialog>
  )
}
