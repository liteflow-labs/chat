import React, { useContext } from 'react'
import { ChatIcon } from '@heroicons/react/outline'
import Address from './Address'
import type { Conversation, Message } from '@xmtp/xmtp-js'
import { classNames, truncate, formatDate } from '../helpers'
import useConversation from '../hooks/useConversation'
import Avatar from './Avatar'
import useMessageStore from '../hooks/useMessageStore'
import XmtpContext from '../contexts/xmtp'

type ConversationTileProps = {
  conversation: Conversation
  isSelected: boolean
  onClick?: () => void
}

const getLatestMessage = (messages: Message[]): Message | null =>
  messages?.length ? messages[messages.length - 1] : null

const ConversationTile = ({
  conversation,
  isSelected,
  onClick,
}: ConversationTileProps): JSX.Element | null => {
  const { messages, loading: isLoadingConversation } = useConversation(
    conversation.peerAddress
  )

  if (!messages.length) return null

  const latestMessage = getLatestMessage(messages)

  if (!latestMessage) return null

  return (
    <a onClick={onClick} key={conversation.peerAddress}>
      <div
        className={classNames(
          'h-20',
          'py-2',
          'px-4',
          'md:max-w-sm',
          'mx-auto',
          'bg-white',
          'space-y-2',
          'py-2',
          'flex',
          'items-center',
          'space-y-0',
          'space-x-4',
          'border-b-2',
          'border-gray-100',
          'hover:bg-bt-100',
          isLoadingConversation ? 'opacity-80' : 'opacity-100',
          isSelected ? 'bg-bt-200' : null
        )}
      >
        <Avatar peerAddress={conversation.peerAddress} />
        <div className="py-4 sm:text-left text w-full">
          <div className="grid-cols-2 grid">
            <Address
              address={conversation.peerAddress}
              className="text-black text-lg md:text-md font-bold place-self-start"
            />
            <span
              className={classNames(
                'text-lg md:text-sm font-normal place-self-end',
                isSelected ? 'text-n-500' : 'text-n-300',
                isLoadingConversation ? 'animate-pulse' : ''
              )}
            >
              {formatDate(latestMessage?.sent)}
            </span>
          </div>
          <p
            className={classNames(
              'text-[13px] md:text-sm font-normal text-ellipsis mt-0',
              isSelected ? 'text-n-500' : 'text-n-300',
              isLoadingConversation ? 'animate-pulse' : ''
            )}
          >
            {latestMessage && truncate(latestMessage.content, 75)}
          </p>
        </div>
      </div>
    </a>
  )
}

const ConversationsList = (): JSX.Element => {
  const { conversations, recipient, setRecipient } = useContext(XmtpContext)
  const { messageStore } = useMessageStore()

  const orderByLatestMessage = (
    convoA: Conversation,
    convoB: Conversation
  ): number => {
    const convoAMessages = messageStore[convoA.peerAddress]
    const convoBMessages = messageStore[convoB.peerAddress]
    const convoALastMessageDate =
      getLatestMessage(convoAMessages)?.sent || new Date()
    const convoBLastMessageDate =
      getLatestMessage(convoBMessages)?.sent || new Date()
    return convoALastMessageDate < convoBLastMessageDate ? 1 : -1
  }

  if (!conversations || conversations.size == 0) {
    return <NoConversationsMessage />
  }

  return (
    <>
      {conversations &&
        conversations.size > 0 &&
        Array.from(conversations.values())
          .sort(orderByLatestMessage)
          .map((convo) => {
            const isSelected = recipient == convo.peerAddress
            return (
              <ConversationTile
                key={convo.peerAddress}
                conversation={convo}
                isSelected={isSelected}
                onClick={() => setRecipient(convo.peerAddress)}
              />
            )
          })}
    </>
  )
}

const NoConversationsMessage = (): JSX.Element => {
  return (
    <div className="flex flex-col flex-grow justify-center h-[100%]">
      <div className="flex flex-col items-center px-4 text-center">
        <ChatIcon
          className="h-8 w-8 mb-1 stroke-n-200 md:stroke-n-300"
          aria-hidden="true"
        />
        <p className="text-xl md:text-lg text-n-200 md:text-n-300 font-bold">
          Your message list is empty
        </p>
        <p className="text-lx md:text-md text-n-200 font-normal">
          There are no messages for this address
        </p>
      </div>
    </div>
  )
}

export default React.memo(ConversationsList)
