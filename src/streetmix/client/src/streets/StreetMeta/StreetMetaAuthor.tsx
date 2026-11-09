import { FormattedMessage } from 'react-intl'

import { useSelector, useDispatch } from '@/streetmix/client/src/store/hooks.js'
import { openGallery } from '@/streetmix/client/src/store/actions/gallery.js'
import { useGetUserQuery } from '@/streetmix/client/src/store/services/api.js'
import { Icon } from '@/streetmix/client/src/ui/Icon.js'
import { Avatar } from '@/streetmix/client/src/users/Avatar.js'
import { isOwnedByCurrentUser } from '../owner.js'
import { StreetMetaItem } from './StreetMetaItem.js'

export function StreetMetaAuthor() {
  const creatorId = useSelector((state) => state.street.creatorId)
  const signedIn = useSelector((state) => state.user.signedIn)
  const userId = useSelector((state) => state.user.signInData?.userId ?? '')
  const { data: creatorProfile } = useGetUserQuery(creatorId)
  const dispatch = useDispatch()

  function handleClickAuthor(event: React.MouseEvent): void {
    event.preventDefault()
    dispatch(openGallery({ userId: creatorId }))
  }

  let user
  if (creatorId !== null && (!signedIn || creatorId !== userId)) {
    user = (
      <>
        <Avatar userId={creatorId} />
        <a href={'/' + creatorId} onClick={handleClickAuthor}>
          {creatorProfile?.displayName ?? creatorId}
        </a>
      </>
    )
  } else if (creatorId === null && (signedIn || !isOwnedByCurrentUser())) {
    user = <FormattedMessage id="users.anonymous" defaultMessage="Anonymous" />
  }

  if (!user) return null

  return (
    <StreetMetaItem icon={<Icon name="user" />}>
      <FormattedMessage
        id="users.byline"
        defaultMessage="by {user}"
        values={{ user }}
      />
    </StreetMetaItem>
  )
}
