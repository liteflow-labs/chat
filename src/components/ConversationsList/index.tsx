import { Progress } from '@chakra-ui/react'
import { useConversations } from '@xmtp/react-sdk'
import React, { JSX } from 'react'
import useChat from '../../hooks/useChat'
import ConversationTile from './ConversationTile'
import NoConversationsMessage from './NoConversationsMessage'

const ConversationsList = (): JSX.Element => {
  const { recipient, setRecipient } = useChat()
  const { conversations, isLoading } = useConversations()

  if (!isLoading && conversations.length == 0) return <NoConversationsMessage />
  return (
    <>
      {isLoading && <Progress size="xs" isIndeterminate />}
      <nav>
        {conversations.map((conversation) => (
          <ConversationTile
            key={conversation.peerAddress}
            conversation={conversation}
            isSelected={recipient == conversation.peerAddress}
            onClick={() => setRecipient(conversation.peerAddress)}
          />
        ))}
      </nav>
    </>
  )
}

export default ConversationsList
