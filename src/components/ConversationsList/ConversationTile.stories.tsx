import { ComponentMeta } from '@storybook/react'
import { Conversation } from '@xmtp/xmtp-js'
import React from 'react'
import useChat from '../../hooks/useChat'
import { bob } from '../../tests/wallets'
import ConversationTile from './ConversationTile'

export default {
  component: ConversationTile,
} as ComponentMeta<typeof ConversationTile>

export const Default = () => {
  const { client } = useChat()
  if (!client) return null
  return (
    <ConversationTile
      conversation={new Conversation(client, bob.address)}
      isSelected={false}
      onClick={() => alert('clicked')}
    />
  )
}

export const SelectedConversation = () => {
  const { client } = useChat()
  if (!client) return null
  return (
    <ConversationTile
      conversation={new Conversation(client, bob.address)}
      isSelected={true}
      onClick={() => alert('clicked')}
    />
  )
}
