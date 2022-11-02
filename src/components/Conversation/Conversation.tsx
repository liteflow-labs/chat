import { Progress } from '@chakra-ui/react'
import React, { useCallback, useEffect, useRef } from 'react'
import useChat from '../../hooks/useChat'
import useFetchMessages from '../../hooks/useFetchMessages'
import useMessages from '../../hooks/useMessages'
import useSendMessage from '../../hooks/useSendMessage'
import MessageComposer from './MessageComposer'
import MessagesList from './MessagesList'

const Conversation = (): JSX.Element => {
  const { recipient } = useChat()
  const messagesEndRef = useRef(null)

  const scroll = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(messagesEndRef.current as any)?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const messages = useMessages(recipient)
  const { loading } = useFetchMessages(recipient, scroll)
  const { send, loading: sending } = useSendMessage(recipient)

  useEffect(scroll, [scroll, recipient, messages])

  if (!recipient) return <div />

  return (
    <>
      {loading && <Progress size="xs" isIndeterminate />}
      <MessagesList messagesEndRef={messagesEndRef} messages={messages} />
      <MessageComposer onSend={send} disabled={sending} />
    </>
  )
}

export default Conversation
