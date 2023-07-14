import { Progress } from '@chakra-ui/react'
import { useMessages, useSendMessage } from '@xmtp/react-sdk'
import { Conversation } from '@xmtp/xmtp-js'
import React, { JSX, useCallback, useEffect, useRef, useState } from 'react'
import useChat from '../../hooks/useChat'
import MessageComposer from './MessageComposer'
import MessagesList from './MessagesList'

const Conversation = (conversation?: any /*TODO: fix type*/): JSX.Element => {
  const { recipient } = useChat()
  const messagesEndRef = useRef(null)

  const scroll = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(messagesEndRef.current as any)?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const { messages, isLoading } = useMessages(conversation)
  const [sending, setSending] = useState<boolean>(false)
  const _send = useSendMessage(conversation)

  const send = useCallback(
    async (message: string) => {
      setSending(true)
      try {
        await _send(message)
      } finally {
        setSending(false)
      }
    },
    [_send]
  )

  useEffect(scroll, [scroll, recipient, messages])

  if (!recipient) return <div />

  return (
    <>
      {isLoading && <Progress size="xs" isIndeterminate />}
      <MessagesList messagesEndRef={messagesEndRef} messages={messages} />
      <MessageComposer onSend={send} disabled={sending} />
    </>
  )
}

export default Conversation
