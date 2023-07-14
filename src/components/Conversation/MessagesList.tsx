import { Divider, Flex, Link, Text } from '@chakra-ui/react'
import type { DecodedMessage } from '@xmtp/xmtp-js'
import React, {
  Fragment,
  JSX,
  MutableRefObject,
  PropsWithChildren,
} from 'react'
import Emoji from 'react-emoji-render'
import { formatDate, formatTime, isOnSameDay } from '../../helpers'
import useChat from '../../hooks/useChat'
import Address from '../Address'
import Avatar from '../Avatar'

export type MessageListProps = {
  messages?: any[] // TODO: fix type
  messagesEndRef: MutableRefObject<null>
}

type MessageTileProps = {
  message: DecodedMessage
}

const UserLink = ({
  children,
  address,
}: PropsWithChildren<{ address?: string }>) => {
  const { onUserClick } = useChat()
  if (!onUserClick) return <>{children}</>
  if (!address) return <>{children}</>
  return <Link onClick={() => onUserClick(address)}>{children}</Link>
}

const MessageTile = ({ message }: MessageTileProps): JSX.Element => (
  <Flex marginY="2">
    <UserLink address={message.senderAddress}>
      <Avatar peerAddress={message.senderAddress as string} />
    </UserLink>
    <Flex direction="column" width="full" marginLeft="2" gap={1}>
      <Flex justifyContent="space-between" alignItems="center" width="full">
        <UserLink address={message.senderAddress}>
          <Address address={message.senderAddress as string} />
        </UserLink>
        <Text marginX="2" fontSize="sm" fontWeight="500">
          {formatTime(message.sent)}
        </Text>
      </Flex>
      <Text fontSize="sm" fontWeight="500">
        {message.error ? (
          `Error: ${message.error?.message}`
        ) : (
          <Emoji text={message.content || ''} />
        )}
      </Text>
    </Flex>
  </Flex>
)

const DateDivider = ({ date }: { date?: Date }): JSX.Element => (
  <Flex alignItems="center" justifyContent="center" marginY="2">
    <Divider />
    <Text width="full" align="center" fontSize="sm" fontWeight="500">
      {formatDate(date, { year: 'numeric', month: 'long', day: 'numeric' })}
    </Text>
    <Divider />
  </Flex>
)

const MessagesList = ({
  messages,
  messagesEndRef,
}: MessageListProps): JSX.Element => {
  let lastMessageDate: Date | undefined
  return (
    <Flex
      width="full"
      direction="column"
      alignSelf="end"
      px={3}
      py={4}
      grow={1}
      overflowY="auto"
    >
      {messages?.map((msg: DecodedMessage) => {
        const dateHasChanged = !isOnSameDay(lastMessageDate, msg.sent)
        lastMessageDate = msg.sent
        return (
          <Fragment key={msg.id}>
            {dateHasChanged ? <DateDivider date={msg.sent} /> : null}
            <MessageTile message={msg} />
          </Fragment>
        )
      })}
      <div ref={messagesEndRef} />
    </Flex>
  )
}

export default MessagesList
