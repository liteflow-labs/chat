import { useCallback, useEffect, useState } from 'react'
import { getLatestMessage } from '../helpers'
import useChat from './useChat'

const useFetchConversations = () => {
  const [loading, setLoading] = useState(true)
  const { addMessages, client } = useChat()

  const fetchConversations = useCallback(async () => {
    if (!client) return

    setLoading(true)
    try {
      // TODO: Maybe improve this fetching
      const list = await client.conversations.list()
      const firstMessages = await Promise.all(list.map(getLatestMessage))
      for (const i in list) {
        const peerAddress = list[i].peerAddress
        const message = firstMessages[i]
        if (message) addMessages({ peerAddress, messages: [message] })
      }
    } finally {
      setLoading(false)
    }
  }, [client, addMessages])

  useEffect(() => {
    fetchConversations().catch(console.error)
  }, [fetchConversations])

  return {
    loading,
  }
}

export default useFetchConversations
