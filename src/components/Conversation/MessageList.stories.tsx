import { ComponentMeta } from '@storybook/react'
import React, { createRef, MutableRefObject } from 'react'
import useConversation from '../../hooks/useConversation'
import { bob } from '../../tests/wallets'
import MessagesList from './MessagesList'

export default {
  component: MessagesList,
} as ComponentMeta<typeof MessagesList>

export const Default = () => {
  const { messages, loading } = useConversation(bob.address)
  const ref = createRef()
  if (loading) return 'loading...'
  return (
    <MessagesList
      messages={messages}
      messagesEndRef={ref as MutableRefObject<null>}
    />
  )
}
