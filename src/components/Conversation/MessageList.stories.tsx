import { ComponentMeta } from '@storybook/react'
import React, { createRef, MutableRefObject } from 'react'
import useFetchMessages from '../../hooks/useFetchMessages'
import useMessages from '../../hooks/useMessages'
import { bob } from '../../tests/wallets'
import MessagesList from './MessagesList'

export default {
  component: MessagesList,
} as ComponentMeta<typeof MessagesList>

export const Default = () => {
  const { loading } = useFetchMessages(bob.address)
  const messages = useMessages(bob.address)
  const ref = createRef()
  if (loading) return 'loading...'
  return (
    <MessagesList
      messages={messages}
      messagesEndRef={ref as MutableRefObject<null>}
    />
  )
}
