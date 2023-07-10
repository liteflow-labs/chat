import { Divider, Flex, LinkBox, LinkOverlay, Text } from '@chakra-ui/react'
import React, { JSX } from 'react'
import Emoji from 'react-emoji-render'
import { formatDate, truncate } from '../../helpers'
import useMessages from '../../hooks/useMessages'
import Address from '../Address'
import Avatar from '../Avatar'

type ConversationTileProps = {
  peerAddress: string
  isSelected: boolean
  onClick?: () => void
}

// TODO: add design for `isSelected`
const ConversationTile = ({
  peerAddress,
  isSelected,
  onClick,
}: ConversationTileProps): JSX.Element | null => {
  const messages = useMessages(peerAddress)
  const latestMessage = messages[messages.length - 1]
  return (
    <LinkBox key={peerAddress}>
      <Flex width="full" paddingX={3} paddingY={4}>
        <Avatar peerAddress={peerAddress} />
        <Flex direction="column" width="full" marginLeft="2" gap={1}>
          <Flex justifyContent="space-between" alignItems="center" width="full">
            <LinkOverlay onClick={onClick} cursor="pointer">
              <Address address={peerAddress} />
            </LinkOverlay>
            <Text fontSize="sm" fontWeight="500">
              {latestMessage ? formatDate(latestMessage.sent) : '-'}
            </Text>
          </Flex>
          <Text fontSize="sm" fontWeight="500">
            <Emoji
              text={
                latestMessage
                  ? truncate(latestMessage.content, 75)
                  : 'loading...'
              }
            />
          </Text>
        </Flex>
      </Flex>
      <Divider />
    </LinkBox>
  )
}

export default ConversationTile
