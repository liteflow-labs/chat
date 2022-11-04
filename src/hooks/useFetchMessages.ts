import { useCallback, useEffect, useState } from 'react'
import useChat from './useChat'

type OnMessageCallback = () => void

const useFetchMessages = (
  peerAddress: string | undefined,
  onMessageCallback?: OnMessageCallback
) => {
  const { client, addMessages } = useChat()
  const [loading, setLoading] = useState(true)

  const fetchMessages = useCallback(async () => {
    if (!peerAddress) return

    setLoading(true)
    try {
      const list = await client?.listConversationMessages(peerAddress)
      if (list) addMessages({ peerAddress, messages: list || [] })
    } finally {
      setLoading(false)
      onMessageCallback && onMessageCallback()
    }
  }, [client, peerAddress, onMessageCallback, addMessages])

  useEffect(() => {
    fetchMessages().catch(console.error)
  }, [fetchMessages])

  return {
    loading,
  }
}

export default useFetchMessages
