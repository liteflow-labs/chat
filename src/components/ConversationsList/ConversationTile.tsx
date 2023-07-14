import { Divider, Flex, LinkBox, LinkOverlay, Text } from '@chakra-ui/react'
import { useMessages } from '@xmtp/react-sdk'
import React, { JSX } from 'react'
import Emoji from 'react-emoji-render'
import { formatDate, truncate } from '../../helpers'
import Address from '../Address'
import Avatar from '../Avatar'

type ConversationTileProps = {
  conversation: any // TODO: fix this type
  isSelected: boolean
  onClick?: () => void
}

// TODO: add design for `isSelected`
const ConversationTile = ({
  conversation,
  isSelected,
  onClick,
}: ConversationTileProps): JSX.Element | null => {
  const { messages } = useMessages(conversation)
  const latestMessage = messages[messages.length - 1]
  return (
    <LinkBox key={conversation.topic}>
      <Flex width="full" paddingX={3} paddingY={4}>
        <Avatar peerAddress={conversation.peerAddress} />
        <Flex direction="column" width="full" marginLeft="2" gap={1}>
          <Flex justifyContent="space-between" alignItems="center" width="full">
            <LinkOverlay onClick={onClick} cursor="pointer">
              <Address address={conversation.peerAddress} />
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
