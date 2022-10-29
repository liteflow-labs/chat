import { Progress } from '@chakra-ui/react'
import React from 'react'
import useChat from '../../hooks/useChat'
import useConversations from '../../hooks/useConversations'
import useFetchConversations from '../../hooks/useFetchConversations'
import ConversationTile from './ConversationTile'
import NoConversationsMessage from './NoConversationsMessage'

const ConversationsList = (): JSX.Element => {
  const { recipient, setRecipient } = useChat()
  const { loading } = useFetchConversations()
  const conversations = useConversations()

  if (!loading && conversations.length == 0) return <NoConversationsMessage />
  return (
    <>
      {loading && <Progress size="xs" isIndeterminate />}
      <nav>
        {conversations.map((peerAddress) => (
          <ConversationTile
            key={peerAddress}
            peerAddress={peerAddress}
            isSelected={recipient == peerAddress}
            onClick={() => setRecipient(peerAddress)}
          />
        ))}
      </nav>
    </>
  )
}

export default ConversationsList
