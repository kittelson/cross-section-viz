import { useState, useEffect, useRef } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { saveAs } from 'file-saver'

import alertIcon from '@/streetmix/client/images/warning_alert.svg?url'
import { useSelector, useDispatch } from '@/streetmix/client/src/store/hooks.js'
import { updateSettings } from '@/streetmix/client/src/store/slices/settings.js'
import { Button } from '@/streetmix/client/src/ui/Button.js'
import { Checkbox } from '@/streetmix/client/src/ui/Checkbox.js'
import { Terms } from '@/streetmix/client/src/app/Terms.js'
import { getStreetImage } from '@/streetmix/client/src/streets/image.js'
import { normalizeSlug } from '@/streetmix/client/src/util/helpers.js'
import { Dialog } from '../Dialog.js'
import { CustomScale } from './CustomScale.js'
import './SaveAsImageDialog.css'

const DEFAULT_IMAGE_DPI = 2

export function SaveAsImageDialog() {
  const imageCanvas = useRef<HTMLCanvasElement>(null)
  const [scale, setScale] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>()
  const [errorMessage2, setErrorMessage2] = useState<boolean>(false)
  const [downloadDataUrl, setDownloadDataUrl] = useState<string>()
  const [baseDimensions, setBaseDimensions] = useState({})
  const locale = useSelector((state) => state.locale.locale)
  const {
    saveAsImageTransparentSky: transparentSky,
    saveAsImageSegmentNamesAndWidths: segmentNames,
    saveAsImageStreetName: streetName,
  } = useSelector((state) => state.settings)
  const street = useSelector((state) => state.street)
  const intl = useIntl()
  const dispatch = useDispatch()

  useEffect(() => {
    async function update() {
      await updatePreview()
    }
    update()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setIsLoading(true)
    // Update preview when props change; make a slight delay because there is
    // a slight lag on image creation, but it's so short it feels weird.
    // Time delay makes the "Loading" feel "right."
    window.setTimeout(async () => {
      await updatePreview()
    }, 100)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transparentSky, segmentNames, streetName])

  function makeFilename() {
    let filename = normalizeSlug(street.name)
    if (filename === undefined) {
      filename = 'street'
    }
    filename += '.png'

    return filename
  }

  // When options change, this changes props.
  const toggleTransparentSky = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateSettings({
        saveAsImageTransparentSky: event.target.checked,
      })
    )
  }

  const toggleSegmentNames = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateSettings({
        saveAsImageSegmentNamesAndWidths: event.target.checked,
      })
    )
  }

  const toggleStreetName = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateSettings({ saveAsImageStreetName: event.target.checked }))
  }

  const handleChangeScale = (value: number) => {
    setErrorMessage2(false) // Clears "too big" error if present
    setScale(value)
  }

  const handlePreviewLoaded = () => {
    setIsLoading(false)
  }

  const handlePreviewError = () => {
    setIsLoading(false)
    setErrorMessage(
      intl.formatMessage({
        id: 'dialogs.save.error-preview',
        defaultMessage: 'There was an error displaying a preview image.',
      })
    )
  }

  /**
   * When download links are clicked, convert the dataURL to a blob for download.
   * Designed to get around a limitation in IE where a dataURL is not downloadable
   * directly (https://msdn.microsoft.com/en-us/library/cc848897(v=vs.85).aspx)
   */
  const handleClickDownloadImage = (event: React.MouseEvent) => {
    event.preventDefault()
    setIsSaving(true)

    try {
      // Update the image with the actual size before saving.
      // Images that are too large can throw an error, so catch it
      // and show an error
      updatePreviewImage(scale)

      imageCanvas.current?.toBlob((blob) => {
        if (blob) {
          // Save that file
          const filename = makeFilename()
          saveAs(blob, filename)
          window.setTimeout(() => {
            setIsSaving(false)
          }, 0)
        } else {
          // Throw an error if .toBlob() returns `null`
          throw new Error()
        }
      })
    } catch (err) {
      setIsSaving(false)
      setErrorMessage2(true)
    }
  }

  const updatePreviewImage = async (scale = 1): Promise<void> => {
    // The preview is rendered at the default scale at first.
    imageCanvas.current = await getStreetImage(
      street,
      transparentSky,
      segmentNames,
      streetName,
      DEFAULT_IMAGE_DPI * scale,
      locale
    )
  }

  const updatePreview = async (): Promise<void> => {
    await updatePreviewImage(1)
    // Only set base dimensions when preview is generated at scale = 1.
    // The custom slider will update target dimensions by multiplying base * scale
    // which is faster than rendering the entire image and reading its dimensions.
    setBaseDimensions({
      width: imageCanvas.current?.width,
      height: imageCanvas.current?.height,
    })

    // The error in catch() is only likely to appear if a SecurityError is
    // thrown from reading the canvas, e.g. "tainted" with external images
    try {
      imageCanvas.current?.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob)
          setDownloadDataUrl(url)
          setErrorMessage(undefined)
        } else {
          throw new Error()
        }
      })
    } catch (e) {
      console.error(e)
      setErrorMessage(
        intl.formatMessage({
          id: 'dialogs.save.error-unavailable',
          defaultMessage: 'Saving to image is not available on this browser.',
        })
      )
    }
  }

  return (
    <Dialog>
      {() => (
        <div className="save-as-image-dialog">
          <header>
            <h1>
              <FormattedMessage
                id="dialogs.save.heading"
                defaultMessage="Save as image"
              />
            </h1>
          </header>
          <div className="dialog-content">
            <div className="save-as-image-options">
              <Checkbox onChange={toggleSegmentNames} checked={segmentNames}>
                <FormattedMessage
                  id="dialogs.save.option-labels"
                  defaultMessage="Segment names and widths"
                />
              </Checkbox>

              <Checkbox onChange={toggleStreetName} checked={streetName}>
                <FormattedMessage
                  id="dialogs.save.option-name"
                  defaultMessage="Street name"
                />
              </Checkbox>

              <Checkbox
                onChange={toggleTransparentSky}
                checked={transparentSky}
              >
                <FormattedMessage
                  id="dialogs.save.option-sky"
                  defaultMessage="Transparent sky"
                />
              </Checkbox>

            </div>
            {street.weather !== null && (
              <div className="save-as-image-weather-alert">
                <img src={alertIcon} alt="" draggable={false} />
                <FormattedMessage
                  id="dialogs.save.weather-not-exported"
                  defaultMessage="Weather effects will not be exported.&lrm;"
                />
              </div>
            )}
            <div className="save-as-image-preview">
              {errorMessage === undefined && (
                <div className="save-as-image-preview-image">
                  <div
                    className="save-as-image-preview-loading"
                    style={{ display: isLoading ? 'flex' : 'none' }}
                  >
                    <FormattedMessage
                      id="dialogs.save.loading"
                      defaultMessage="Loading…"
                    />
                  </div>
                  {/* Initial value of `downloadDataUrl` is undefined, rather
                      than an empty string. We get a warning that this could
                      cause a browser to re-download the page if `src` is set
                      to an empty string. */}
                  {downloadDataUrl !== undefined && (
                    <img
                      src={downloadDataUrl}
                      onLoad={handlePreviewLoaded}
                      onError={handlePreviewError}
                      alt={intl.formatMessage({
                        id: 'dialogs.save.preview-image-alt',
                        defaultMessage: 'Preview',
                      })}
                    />
                  )}
                </div>
              )}
              {errorMessage !== undefined && (
                <div className="save-as-image-preview-error">
                  {errorMessage}
                </div>
              )}
            </div>
            <CustomScale
              scale={scale}
              baseDimensions={baseDimensions}
              onChange={handleChangeScale}
            />
            <div className="save-as-image-download">
              {errorMessage2 && (
                <span className="save-as-image-too-large-error">
                  <FormattedMessage
                    id="dialogs.save.error-too-large"
                    defaultMessage="This image is too big and we were not able to create it. Please try a smaller custom size."
                  />
                </span>
              )}
              {errorMessage === undefined && !isSaving ? (
                <Button primary onClick={handleClickDownloadImage}>
                  <FormattedMessage
                    id="dialogs.save.save-button"
                    defaultMessage="Save to your computer…"
                  />
                </Button>
              ) : (
                // TODO: When saving, show busy cursor and "Please wait"
                <Button primary disabled>
                  <FormattedMessage
                    id="dialogs.save.save-button"
                    defaultMessage="Save to your computer…"
                  />
                </Button>
              )}
            </div>
          </div>
          <footer>
            <Terms locale={locale} />
          </footer>
        </div>
      )}
    </Dialog>
  )
}
