import React from 'react'
import Address from '../Address'
import type { Conversation } from '@xmtp/xmtp-js'
import { truncate, formatDate } from '../../helpers'
import useConversation from '../../hooks/useConversation'
import Avatar from '../Avatar'
import Emoji from 'react-emoji-render'
import { Divider, Flex, LinkBox, LinkOverlay, Text } from '@chakra-ui/react'

type ConversationTileProps = {
  conversation: Conversation
  isSelected: boolean
  onClick?: () => void
}

// TODO: add design for `isSelected`
const ConversationTile = ({
  conversation,
  isSelected,
  onClick,
}: ConversationTileProps): JSX.Element | null => {
  const { messages } = useConversation(conversation.peerAddress)

  const latestMessage = messages.length ? messages[messages.length - 1] : null

  return (
    <LinkBox key={conversation.peerAddress}>
      <Flex width="full" paddingX={2} paddingY={4}>
        <Avatar peerAddress={conversation.peerAddress} />
        <Flex direction="column" width="full" marginLeft="2">
          <Flex justifyContent="space-between" alignItems="center" width="full">
            <LinkOverlay onClick={onClick} cursor="pointer">
              <Address address={conversation.peerAddress} />
            </LinkOverlay>
            <Text>{latestMessage ? formatDate(latestMessage.sent) : '-'}</Text>
          </Flex>
          <Text>
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