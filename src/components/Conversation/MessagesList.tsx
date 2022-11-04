import { Divider, Flex, Link, Text } from '@chakra-ui/react'
import type { Message } from '@xmtp/xmtp-js'
import React, { Fragment, MutableRefObject, PropsWithChildren } from 'react'
import Emoji from 'react-emoji-render'
import { formatDate, formatTime, isOnSameDay } from '../../helpers'
import useChat from '../../hooks/useChat'
import Address from '../Address'
import Avatar from '../Avatar'

export type MessageListProps = {
  messages: Message[]
  messagesEndRef: MutableRefObject<null>
}

type MessageTileProps = {
  message: Message
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
    <Flex direction="column" marginLeft="2">
      <Flex alignItems="center">
        <UserLink address={message.senderAddress}>
          <Address address={message.senderAddress as string} />
        </UserLink>
        <Text marginX="2">{formatTime(message.sent)}</Text>
      </Flex>
      <Text>
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
    <Text width="full" align="center">
      {formatDate(date, { year: 'numeric', month: 'long', day: 'numeric' })}
    </Text>
    <Divider />
  </Flex>
)

const ConversationBeginningNotice = (): JSX.Element => (
  <Flex justifyContent="center" marginY="4">
    <Text>This is the beginning of the conversation</Text>
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
      {messages && messages.length ? <ConversationBeginningNotice /> : null}
      {messages?.map((msg: Message) => {
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
