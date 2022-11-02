import { useCallback, useState } from 'react'
import useChat from './useChat'

const useSendMessage = (peerAddress?: string) => {
  const { client } = useChat()
  const [loading, setLoading] = useState(false)

  const send = useCallback(
    async (message: string) => {
      if (!client) return
      if (!peerAddress) return
      try {
        setLoading(true)
        await client.sendMessage(peerAddress, message)
      } finally {
        setLoading(false)
      }
    },
    [client, peerAddress]
  )

  return {
    send,
    loading,
  }
}

export default useSendMessage
